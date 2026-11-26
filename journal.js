const categories=["全部","美术","风格","关卡","机制","设定","UI","影音","性能","制作"];
const $=id=>document.getElementById(id);
let active="全部";
function render(){
  $("filters").replaceChildren();
  categories.forEach(tag=>{
    const matches=n=>tag==="全部"||n.tags.includes(tag);
    const b=document.createElement("button");
    b.append(tag); const count=document.createElement("small");count.textContent=notes.filter(matches).length;b.append(count);
    b.setAttribute("aria-pressed",String(active===tag));b.onclick=()=>{active=tag;render();$("filters").querySelector('[aria-pressed="true"]').focus({preventScroll:true})};$("filters").append(b);
  });
  $("listTitle").textContent=active==="全部"?"全部进度":active+"进度";
  const rows=notes.filter(n=>active==="全部"||n.tags.includes(active)).sort((a,b)=> $("order").value==="new"?b.date.localeCompare(a.date):a.date.localeCompare(b.date));
  $("entries").replaceChildren();
  rows.forEach(n=>{const b=document.createElement("button");b.className="entry";const t=document.createElement("time");t.dateTime=n.date;t.textContent=n.date.replaceAll("-",".");const desc=document.createElement("span");const title=document.createElement("b");renderNoteTitle(title,n);const tags=document.createElement("small");tags.textContent=n.tags.join("　/　");desc.append(title,tags);const plus=document.createElement("i");plus.textContent="＋";plus.setAttribute("aria-hidden","true");b.append(t,desc,plus);b.onclick=()=>openNote(n);$("entries").append(b)});
}
function openNote(note) {
  $("articleMeta").textContent = note.date + "　/　" + note.tags.join(" · ");
  renderNoteTitle($("articleTitle"), note);
  const body = $("articleBody");
  body.replaceChildren();
  const attempt = appendStory(body, note.story);
  appendNoteFigures(attempt, note);
  $("article").showModal();
  $("article").scrollTop = 0;
}
$("order").onchange=render;
function startJournalDeck(deck, entries) {
  if (!entries.length) return;
  let bag = [];
  const visible = [];
  function draw() {
    if (!bag.length) {
      bag = entries.slice();
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
    }
    const eligible = bag.findIndex(note => !visible.some(card => card.note === note));
    return bag.splice(eligible < 0 ? 0 : eligible, 1)[0];
  }
  function createCard(note) {
    const el = document.createElement("article");
    el.className = "feature";
    const figures = noteFigures(note);
    if (figures.length) {
      const figure = figures[Math.floor(Math.random() * figures.length)];
      const frame = document.createElement("div");
      frame.className = "featureImg";
      const img = new Image();
      img.alt = figure.caption;
      const url = new URL("media/" + figure.image, document.baseURI);
      img.style.visibility = "hidden";
      img.onload = () => { img.style.visibility = ""; };
      let retried = false;
      img.onerror = () => {
        if (!retried) {
          retried = true;
          url.searchParams.set("retry", "1");
          img.src = url.href;
          return;
        }
        frame.remove();
        el.classList.add("text-only");
      };
      img.src = url.href;
      frame.append(img);
      el.append(frame);
    } else {
      el.classList.add("text-only");
    }
    const copy = document.createElement("div");
    const meta = document.createElement("small");
    meta.textContent = note.tags.join(" / ") + "　／　" + note.date.replaceAll("-", ".");
    const title = renderNoteTitle(document.createElement("h3"), note);
    const excerpt = document.createElement("p");
    excerpt.textContent = note.story.goal;
    const read = document.createElement("button");
    read.textContent = "阅读手记　＋";
    read.onclick = () => openNote(note);
    copy.append(meta, title, excerpt, read);
    el.append(copy);
    const select = document.createElement("button");
    select.className = "select-card";
    select.type = "button";
    select.onclick = () => advanceTo(el, select.matches(":focus-visible"));
    el.append(select);
    deck.append(el);
    return {note, el, select};
  }
  function positionCards() {
    visible.forEach(({el, select, note}, index) => {
      el.dataset.slot = index;
      el.inert = false;
      select.hidden = index === 0;
      select.setAttribute("aria-label", "切换到第" + (index + 1) + "张日志：" + note.title);
    });
  }
  while (visible.length < Math.min(3, entries.length)) visible.push(createCard(draw()));
  positionCards();
  if (entries.length < 2) return;
  async function rotate() {
    const next = draw();
    const leaving = visible.shift().el;
    leaving.inert = true;
    leaving.dataset.slot = "leaving";
    const incoming = createCard(next);
    incoming.el.dataset.slot = "incoming";
    incoming.el.inert = true;
    visible.push(incoming);
    incoming.el.getBoundingClientRect();
    positionCards();
    await Promise.allSettled(leaving.getAnimations().map(animation => animation.finished));
    leaving.remove();
  }
  const clock = deck.querySelector(".deck-clock");
  const ring = clock.querySelector(".clock-ring");
  const digits = clock.querySelector("text");
  const period = 20000;
  let elapsed = 0;
  let previous = performance.now();
  let moving = false;
  clock.removeAttribute("hidden");

  function paintClock(remaining) {
    const seconds = String(Math.ceil(remaining / 1000));
    if (digits.textContent !== seconds) digits.textContent = seconds;
    ring.style.strokeDashoffset = String(100 * (1 - remaining / period));
  }

  async function advanceTo(target, restoreFocus = false) {
    if (moving || !visible.some(card => card.el === target)) return;
    moving = true;
    paintClock(0);
    try {
      while (visible[0].el !== target) await rotate();
      if (restoreFocus) target.querySelector("button:not(.select-card)").focus({preventScroll:true});
    } finally {
      elapsed = 0;
      previous = performance.now();
      paintClock(period);
      moving = false;
    }
  }

  function tick() {
    const now = performance.now();
    const delta = now - previous;
    previous = now;
    if (moving || document.hidden || document.querySelector("dialog[open]") || deck.querySelector(":focus-visible")) return;
    elapsed += delta;
    if (elapsed >= period) advanceTo(visible[1].el);
    else paintClock(period - elapsed);
  }
  document.addEventListener("visibilitychange", () => { previous = performance.now(); });
  window.setInterval(tick, 100);
}
startJournalDeck($("journalDeck"), notes);
render();
const sea=$("sea"),film=$("cinema").querySelector("video");
const updateMotion=()=>{$("motion").textContent=sea.paused?"播放背景":"暂停背景"};sea.onplay=updateMotion;sea.onpause=updateMotion;
if(!matchMedia("(prefers-reduced-motion: reduce)").matches)sea.play().catch(updateMotion);
$("motion").onclick=()=>sea.paused?sea.play().catch(updateMotion):sea.pause();
let resume=false;
$("play").onclick=()=>{resume=!sea.paused;sea.pause();$("cinema").showModal();film.play().catch(()=>{})};
$("cinema").onclose=()=>{film.pause();if(resume)sea.play().catch(updateMotion)};
document.querySelectorAll("dialog").forEach(d=>{d.querySelector(".close").onclick=()=>d.close();d.addEventListener("click",e=>{if(e.target===d&&!(e.clientX>=d.getBoundingClientRect().left&&e.clientX<=d.getBoundingClientRect().right&&e.clientY>=d.getBoundingClientRect().top&&e.clientY<=d.getBoundingClientRect().bottom))d.close()})});

const hero = document.querySelector(".hero");
const navBar = document.querySelector("header");
const journal = $("journal");
let coverFrame = 0;
function updateCover() {
  coverFrame = 0;
  const distance = hero.offsetHeight - navBar.offsetHeight;
  const top = journal.getBoundingClientRect().top;
  const progress = Math.max(0, Math.min(1, (hero.offsetHeight - top) / Math.max(1, distance)));
  hero.style.setProperty("--cover-blur", (progress * 12).toFixed(2) + "px");
  hero.inert = top <= navBar.offsetHeight;
}
function scheduleCover() {
  if (!coverFrame) coverFrame = requestAnimationFrame(updateCover);
}
const layoutObserver = new ResizeObserver(() => {
  document.documentElement.style.setProperty("--nav-height", navBar.offsetHeight + "px");
  scheduleCover();
});
layoutObserver.observe(hero);
layoutObserver.observe(navBar);
window.addEventListener("scroll", scheduleCover, {passive:true});
updateCover();
