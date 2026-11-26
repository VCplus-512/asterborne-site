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
      img.src = "media/" + figure.image;
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
    deck.append(el);
    return {note, el};
  }
  function positionCards() {
    visible.forEach(({el}, index) => {
      el.dataset.slot = index;
      el.inert = index !== 0;
    });
  }
  while (visible.length < Math.min(3, entries.length)) visible.push(createCard(draw()));
  positionCards();
  if (entries.length < 2) return;
  function rotate() {
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
    window.setTimeout(() => leaving.remove(), 850);
  }
  const clock = deck.querySelector(".deck-clock");
  const ring = clock.querySelector(".clock-ring");
  const digits = clock.querySelector("text");
  const period = 20000;
  let elapsed = 0;
  let previous = performance.now();
  let transitioning = false;
  clock.removeAttribute("hidden");

  function tick() {
    const now = performance.now();
    const delta = now - previous;
    previous = now;
    if (document.hidden || document.querySelector("dialog[open]") || deck.querySelector(":focus-visible")) return;
    elapsed += delta;
    if (elapsed >= period) {
      elapsed %= period;
      rotate();
      transitioning = true;
    }
    if (elapsed >= 720) transitioning = false;
    const remaining = transitioning ? 0 : period - elapsed;
    // The incoming card starts at 20 after the outgoing card has faded.
    const seconds = transitioning ? 0 : Math.ceil(remaining / 1000);
    if (digits.textContent !== String(seconds)) digits.textContent = String(seconds);
    ring.style.strokeDashoffset = String(100 * (1 - remaining / period));
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
