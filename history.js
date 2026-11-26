const chapters = [
  [
    "ground",
    "2026-10-21",
    "地面原型与第一次交火",
    "从一间能跑、能蹲的测试房开始，先确定方向键、疾跑和低姿动作如何衔接。射击加入以后，一次输入何时算起跳、哪只手还在换弹、低顶下能不能翻滚，才变成可以在同一个角色身上验证的问题。",
    "移动设计早于这份报告。现存核心规格追溯到移动状态机 V0.4–V0.8、战斗控制器 V0.5 和 Mod 概念；各版原始对话没有完整的逐日记录。以下从能确定日期的 M1.1 写起。"
  ],
  [
    "loop",
    "2026-10-22",
    "从测试房到一局能带走战利品的任务",
    "一天的多个里程碑改变了游戏的骨架。先从基地出击，击杀后撤离，再把装备、Mod、战利品和存档接回基地。最后，地图从固定试验场变成可以按种子重试的任务空间。",
    "最能说明这条线的是一次重试。房间布局应当相同，当前任务重开，而已经确认的长期构筑应当还在。操作、地图和存档从此有了各自的生命周期。"
  ],
  [
    "rig",
    "2026-10-24",
    "敌人有了岗位，角色有了身体",
    "敌人开始按目击、警戒和路径响应。与此同时，玩家的灰盒从一个控制器变成由多个部件组成的角色。此前能过的移动检查，无法回答角色翻身时枪是否挡脸、手臂是否脱节。",
    "制作顺序在这里改了：先用真实输入看翻身节奏，再用临时纹理验证正反面，随后尽早试绑现有美术。作者接收的是当时灰盒半翻的具体表现。"
  ],
  [
    "weapons",
    "2026-10-28",
    "从一套骨架到每把武器自己的动作",
    "先把枪口、近远层序和手掌位置统一，再分别做步枪、霰弹枪、手枪与狙击枪的散布、后坐和换弹。左跳与右跳、前扑与后仰组成同一张对照表，修一帧不能毁掉另一帧。",
    "这个阶段也形成了制作判断：后臂消失要查到最终像素；一支枪总体得到肯定，装匣缺少重量仍可以单独返修。界面在月底先有能操作的占位版本。"
  ],
  [
    "identity",
    "2026-11-01",
    "多角色、界面与第一地区的尺度",
    "第二、第三名角色加入后，身形、腰胯、发片和武器绑定暴露出不同问题。同期的界面要在放大后仍能容纳卡片、角色和长枪；场景则开始用一跳的高度给外船坞定尺。",
    "这段历史包含明确的停止决定。第一名角色最终版本留下，胸腰胯的多轮返修方法被判定失败。第一地区的分层海岸船坞还是主题提案；关卡和动作已经有可运行的样本。"
  ],
  [
    "dock",
    "2026-11-07",
    "工坊第一次交付一座能出击的船坞",
    "固定布局先跑通基地、战斗与撤离，再打开每局随机。远景、钢架、平台和房间端口逐一进入同一套游戏流程。跌出边界、持续下穿、高低差交战都有了可以重复的场景。",
    "这里也出现一次有价值的撤回：隐藏画外房间大幅减少可见节点，却没有改变绘制次数。另一条线上，声音开始由实际动作触发，选段与最终听感分开检查。"
  ],
  [
    "base",
    "2026-11-10",
    "《回曜》定名，基地从入口长成场所",
    "名称、海岸启动页、双语字标和签名给游戏一个统一入口。基地依次经历可站立的驾驶室、动态远景、带人偶的靶场。玩家可以从同一艘船出发、练习、再回来。",
    "此时视觉和声音都跨越了场景切换的问题：海岸要循环，标题无需每次重演；枪械只在靶场开放；撤离声音可以在回基地时自然收尾。"
  ],
  [
    "load",
    "2026-11-14",
    "高清场景、交战负载与军械库",
    "当场景换上更清晰的图，房间加载、光照与大量敌人的动作开始争用一帧的时间。团队把预取、脚底拟合、遮挡几何和敌人调度拆开实测，也逐步把特效、菜单和军械库接入真实任务。",
    "同时要照顾很小的可见问题。头盔与肩之间漏一发、敌人倒地后枪口仍亮、基地连接门缺一条门身，各自都有不同的原因，不能用一次全局性能调整代替。"
  ],
  [
    "combat",
    "2026-11-17",
    "让基地、角色技能与正式任务用同一套规则",
    "基地照明和整船镜头、红发三项主动技能、试用军械库、两种任务入口同时汇合。工业设施退役后，外船坞承担现行歼灭和竞速；旧章节的历史日期仍然保留。",
    "从试玩返回某个场景，也开始成为设计本身：越界回到上个稳定位置，常规回位不再显示提示；更换角色和装备后，试用与正式存档要各自回到正确位置。"
  ],
  [
    "current",
    "2026-11-19",
    "复现具体的一局，再做下一间房",
    "这两天，试玩反馈可以追到具体房间、具体视点和具体一帧。换弹与投掷争用手臂、换角色漏受光、后段房间重复报错，分别有能复现的输入和局部修复。",
    "并行的制作也留下了不同停点：固定交战样板可比较，长剑新版转向在审查室通过，飞船检修室已可在工坊编辑；新的正式游戏观感和整局体验仍要实际试玩。"
  ],
  [
    "character-motion",
    "2026-11-24",
    "从一张侧身站姿，到跑动中回身射击",
    "在军械库选出双马尾，转身就能看新版发束如何绕过肩膀。红发走了另一条路：旧的跑跳试验撤下，重新从原画里找头、颈、肩的位置，再把确认的站姿带进专用测试室。",
    "把准星从身后扫到脚下，是这间房最能说明问题的一个动作。枪口、眼睛和双脚要各自跟对方向，还得在同一帧看起来像一个人。"
  ]
];
const contents = document.getElementById("contents");
const container = document.getElementById("chapters");
function textElement(tag, value) {
  const node = document.createElement(tag);
  node.textContent = value;
  return node;
}
function noteDetails(note) {
  const item = document.createElement("details");
  const heading = document.createElement("summary");
  const date = textElement("time", note.date.slice(5).replace("-", "."));
  date.dateTime = note.date;
  heading.append(date, renderNoteTitle(document.createElement("strong"), note), textElement("small", note.tags.join(" / ")));
  item.append(heading);
  for (const paragraph of note.body) item.append(textElement("p", paragraph));
  if (noteFigures(note).length) {
    function showFigures() {
      if (!item.open) return;
      appendNoteFigures(item, note);
      item.removeEventListener("toggle", showFigures);
    }
    item.addEventListener("toggle", showFigures);
  }
  return item;
}
let previous = "";
for (const [id, end, title, introduction, turningPoint] of chapters) {
  const entries = notes.filter(note => note.date > previous && note.date <= end);
  const section = document.createElement("section");
  section.id = id;
  const first = entries[0].date.slice(5).replace("-", ".");
  const last = end.slice(5).replace("-", ".");
  const dates = first === last ? first : first + " — " + last;
  const link = document.createElement("a");
  link.href = "#" + id;
  link.append(textElement("small", dates), textElement("span", title));
  contents.append(link);
  section.append(textElement("small", dates), textElement("h2", title), textElement("p", introduction), textElement("p", turningPoint));
  const events = document.createElement("div");
  events.className = "history-events";
  for (const entry of entries) events.append(noteDetails(entry));
  section.append(events);
  container.append(section);
  previous = end;
}
if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
