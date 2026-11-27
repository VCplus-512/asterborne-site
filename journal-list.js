const categories=["全部","美术","风格","关卡","机制","设定","UI","影音","性能","制作"];
const $=id=>document.getElementById(id);
let active="全部";
let filteredNotes = [];
const initialEntryCount = 5;
function render(){
  $("filters").replaceChildren();
  categories.forEach(tag=>{
    const matches=n=>tag==="全部"||n.tags.includes(tag);
    const b=document.createElement("button");
    b.append(tag); const count=document.createElement("small");count.textContent=notes.filter(matches).length;b.append(count);
    b.setAttribute("aria-pressed",String(active===tag));b.onclick=()=>{active=tag;render();$("filters").querySelector('[aria-pressed="true"]').focus({preventScroll:true})};$("filters").append(b);
  });
  $("listTitle").textContent=active==="全部"?"全部进度":active+"进度";
  filteredNotes=notes.filter(n=>active==="全部"||n.tags.includes(active)).sort((a,b)=> $("order").value==="new"?b.date.localeCompare(a.date):a.date.localeCompare(b.date));
  $("entries").replaceChildren();
  appendEntries(initialEntryCount);
}
function appendEntries(count) {
  const list = $("entries");
  const start = list.childElementCount;
  for (const note of filteredNotes.slice(start, start + count)) {
    const button = document.createElement("button");
    button.className = "entry";
    const date = document.createElement("time");
    date.dateTime = note.date;
    date.textContent = note.date.replaceAll("-", ".");
    const description = document.createElement("span");
    const title = renderNoteTitle(document.createElement("b"), note);
    const tags = document.createElement("small");
    tags.textContent = note.tags.join("　/　");
    description.append(title, tags);
    const plus = document.createElement("i");
    plus.textContent = "＋";
    plus.setAttribute("aria-hidden", "true");
    button.append(date, description, plus);
    button.onclick = () => openNote(note);
    list.append(button);
  }
  $("moreEntries").hidden = list.childElementCount >= filteredNotes.length;
}
$("moreEntries").onclick = () => {
  const list = $("entries");
  const start = list.childElementCount;
  appendEntries(10);
  list.children[start]?.focus({preventScroll:true});
};
let lastListScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const y = Math.max(0, window.scrollY);
  const movingUp = y < lastListScrollY;
  lastListScrollY = y;
  const list = $("entries");
  if (!movingUp || list.childElementCount <= initialEntryCount) return;
  // Read row positions before removing any, so layout is measured only once.
  let keep = list.childElementCount;
  while (keep > initialEntryCount && (y === 0 || list.children[keep - 1].getBoundingClientRect().top >= window.innerHeight)) {
    keep--;
  }
  if (keep === list.childElementCount) return;
  while (list.childElementCount > keep) list.lastElementChild.remove();
  $("moreEntries").hidden = false;
}, {passive:true});

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
document.querySelectorAll("dialog").forEach(d=>{d.querySelector(".close").onclick=()=>d.close();d.addEventListener("click",e=>{if(e.target===d&&!(e.clientX>=d.getBoundingClientRect().left&&e.clientX<=d.getBoundingClientRect().right&&e.clientY>=d.getBoundingClientRect().top&&e.clientY<=d.getBoundingClientRect().bottom))d.close()})});
render();
