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
const featuredNote = notes.find(n => n.title === "基地门框的竖缝");
renderNoteTitle($("featuredTitle"), featuredNote);
$("readDoor").onclick = () => openNote(featuredNote);
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
