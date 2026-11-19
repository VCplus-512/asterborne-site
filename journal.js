const notes = [
  {date:"2026-10-21",title:"滑铲应该在哪一刻结束？",tags:["机制"],body:["早期原型给滑铲留了一个参考时长。可同一段时间里，角色可能已经慢得该站起来了，也可能还带着冲出去的速度。于是结束条件改为看速度：先加速，再减速，降到接近步行速度时退出。","两种滑铲共用这条曲线，出口各有去处。一种接蹲走，另一种接疾跑，剩余速度带入下一步。这一天已在移动原型里跑通，曲线的具体数值留给试玩调整。"]},
  {date:"2026-10-27",title:"一段换弹，双手要在哪里重新接上？",tags:["美术","机制"],body:["手枪的换弹被拆成七段，整段约 1.15 秒。最容易看出破绽的是装匣之后：副手要重新握回枪底，再跟主手一起回到当时的持枪姿势。","这一版把双手的动作放在角色胸部的局部坐标里衔接，同时给手枪保留独立的后坐动作。已经逐帧核过手和枪的位置，运动看起来是否自然仍留给试玩判断。"]},
  {date:"2026-10-28",title:"一次试玩，留下两个关于重量的问题",tags:["美术","风格"],body:["狙击枪接进游戏后，试玩反馈认可了整体表现，又单独点出了两个瞬间：射击后抬枪的动作，以及弹匣推到位时枪身的反应。","第二个问题尤其细。弹匣已经碰到枪，枪身却没有随接触产生相应的惯性，两个动作看着各走各的。这次保留已经接好的枪和持握姿势，把返修范围收在这两处。"]},
  {date:"2026-10-30",title:"海岸之上，船坞为什么要分层？",tags:["设定","关卡"],body:["第一地区的主题提案把船坞沿海面和崖面展开。低处靠泊，高处装卸、检修，让玩家从建筑的位置就能读出货物怎样从海上转向空中。","这个想法也给关卡提出了一个问题：如果同一处港口有上下两套动线，角色赶路、交战和撤离时会选择哪一层？这是当时的地区构思，地名和具体节点仍留有调整空间。"]},
  {date:"2026-10-31",title:"跑过地板接缝，不该花掉一次跳跃",tags:["机制","关卡"],body:["角色已经在地上奔跑，一点错台却能让动作突然停住。处理办法是在确实被矮障碍挡住时，检查头顶、前方和落脚处，空间足够就踏上去。","这一步保留原来的水平速度，跳跃次数和能量也照旧。边缘外没有支撑时仍然会落下。自动上阶已接入，整张地图跑起来是否顺畅，仍需逐段体验。"]},
  {date:"2026-11-03",title:"按住下穿，还是每一层都按一下？",tags:["机制","UI"],body:["连续几层单向平台摆在一起，有人想一路按住向下穿，有人想准确停在中间一层。操作设置里保留了两种方式，默认是按住持续下穿，选择会保存。","松手只阻止下一次下穿。如果角色已经穿进当前平台，就等身体完全离开，再恢复这块平台的碰撞，避免松手的一瞬间被卡在里面。"]},
  {date:"2026-11-07",title:"击中头部，数字前面多了什么？",tags:["机制","UI"],body:["敌人转身或改变姿势时，头部的有效区域也要随动作一起走。每颗弹丸按实际接触顺序判断，挡在前面的身体或地形会先接住这一击。","命中头部后，伤害数字前会出现同色的小图标。爆头和暴击可以同时发生，图标负责说明命中部位，颜色继续沿用暴击提示。局部判定已经检查，交战时能否一眼读清还要看实玩。"]},
  {date:"2026-11-10",title:"放进一个人偶，基地就多了一间靶场",tags:["关卡","机制"],body:["基地需要一个随手试武器的地方。第三版布局里，房间放有训练人偶，就被识别为靶场。角色走进去可以用已装备的武器，离开就收起开火权限。","门口最值得检查：人物挨着房间边缘时，不能在安全区误开枪。定点检查覆盖了斜边、重叠区域和离场停火，也验证了枪弹与近战能实际命中人偶。"]},
  {date:"2026-11-15",title:"滚轮拉远之后，怎样看清整艘船？",tags:["关卡","UI"],body:["基地近景用来看角色和设施，拉远则想看整船。两种距离之间，圆形窗口怎样收拢、什么时候关闭，以及切回军械库时画面对不对得上，都影响人能否记住自己刚才站在哪里。","这次返修核对了窗口收拢与关闭的画面，也对照了最近视角和军械库的位置。定点画面已经检查，滚轮推拉的节奏仍待实际体验。"]},
  {date:"2026-11-18",title:"换弹到一半投掷，谁接管左手？",tags:["美术","机制"],body:["实玩中，红发角色刚装进一发霰弹就投掷，左肘短暂分离。逐帧回看后发现，换弹和投掷在同一帧分别改写手臂，两套动作参考的肩肘位置已经不同。","现在投掷真正占手时才交接，已装入的弹药保留。胸部、手臂和手持物随同一次交接更新，腿部还可以继续移动。这次修复已通过定向检查，实玩观感留待复核。"]},
  {date:"2026-11-19", title:"给实机片留下枪声的位置", tags:["影音"], body:["把飞船、军械库、平台转移和枪战剪进同一段实机片后，原录屏里密集的音效容易盖过配乐。混音时把原声降低了 9 dB，开枪的起音仍然保留。","带徽标的 Vincent 签名先出现，随后音乐随第一段射击渐入。首页的播放按钮可以看到这版约 30 秒的剪辑。"]},
  {date:"2026-11-17",title:"越过关卡边界，应该回到哪里？",tags:["机制","关卡"],body:["角色脱离有效区域时，画面先淡出一秒，再传回上一个稳定位置。回退有自己的处理流程，避免连带重置角色资源。","这次核对了连接处的边界和回退时序。不同地图上的实际通行手感仍待试玩。"]},
  {date:"2026-11-16",title:"把细玻璃边带进设置界面",tags:["UI","风格","美术"],body:["给深色菜单加上一层细玻璃边，同时接入颜色设置。军械库卡片、按钮和属性框也要能沿用这套处理。","生命、护盾与弹药的颜色承担提示作用，因此这次处理集中在菜单框体。"]},
  {date:"2026-11-14",title:"基地门框的竖缝",tags:["关卡","美术","机制"],image:"door.png",body:["基地的两处连接门露出细长的底色。回到工坊核对后，门头和门身图都在。问题出现在两个房间连通的那一刻。","原先，门身绘制和封门碰撞听从同一个开关。通路打开，碰撞解除，门身也一起消失。把两个条件拆开后，两处连接门各补回了两块门身。","同一机位的前后对照里，两道竖缝都消失了。这一轮记录的是这两处画面，其他缩放和人工通行体验仍待验证。"]},
  {date:"2026-11-08",title:"《回曜》的两种写法",tags:["风格","美术"],body:["中文「回曜」和英文 ASTERBORNE 各自保留一张透明字标。细笔画、几何留白和局部暖金连接起两套字形。","分别收存原图，海岸画面上的中英文标题就可以独立调整大小和间距。"]},
  {date:"2026-11-08",title:"启动画面里的海岸",tags:["设定","美术"],body:["三名角色停在海岸高处，远处的港口和海平面占据了画面的大半。这里先以场景图志的形式，记录玩家打开游戏时看到的世界。","这一天的启动页接入记录采用六秒海岸影像循环。首页沿用这段画面，可自行暂停，观察人物与港口的关系。"],image:"shore.jpg"}
];
const categories=["全部","美术","风格","关卡","机制","设定","UI","影音"];
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
  rows.forEach(n=>{const b=document.createElement("button");b.className="entry";const t=document.createElement("time");t.dateTime=n.date;t.textContent=n.date.replaceAll("-",".");const desc=document.createElement("span");const title=document.createElement("b");title.textContent=n.title;const tags=document.createElement("small");tags.textContent=n.tags.join("　/　");desc.append(title,tags);const plus=document.createElement("i");plus.textContent="＋";plus.setAttribute("aria-hidden","true");b.append(t,desc,plus);b.onclick=()=>openNote(n);$("entries").append(b)});
}
function openNote(n){$("articleMeta").textContent=n.date+"　/　"+n.tags.join(" · ");$("articleTitle").textContent=n.title;$("articleBody").replaceChildren();for(const line of n.body){const p=document.createElement("p");p.textContent=line;$("articleBody").append(p)}if(n.image){const img=document.createElement("img");img.src="media/"+n.image;img.alt=n.image==="door.png"?"两处门框的修复前后对照":"启动页海岸原画面";$("articleBody").append(img)}$("article").showModal()}
$("order").onchange=render;$("readDoor").onclick=()=>openNote(notes.find(n=>n.image==="door.png"));render();
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
