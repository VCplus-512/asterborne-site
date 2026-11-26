const chapters = [
  [
    "ground",
    "2026-10-21",
    "地面原型与第一次交火",
    {
      "goal": "一间平地测试房，怎样同时验证移动和交火？",
      "attempt": "先试方向键起步、反向制动和低顶下的碰撞，再在同一间房加入静态靶与敌人。开过枪再翻滚、从平台边缘滑落再起跳，让相邻动作开始争用同一具身体。",
      "result": "地面机动、第一次交火有了可复查的记录。更早的移动规格有版本留存，逐日对话并不完整，时间线从能定日的 M1.1 起算。"
    }
  ],
  [
    "loop",
    "2026-10-22",
    "从测试房到一局能带走战利品的任务",
    {
      "goal": "怎样把一次试射接成能出发、撤离、带回装备的一局？",
      "attempt": "先从基地终端出击，达到击杀目标后撤离；再让换枪、Mod 草案、战利品和存档分别接回基地。地图改按种子生成，用重试来检验路线和构筑各自该保留什么。",
      "result": "重试可回到同一布局，确认过的长期构筑留在本地。"
    }
  ],
  [
    "rig",
    "2026-10-24",
    "敌人有了岗位，角色有了身体",
    {
      "goal": "敌人何时追来？玩家翻身时，枪和手臂该挡住什么？",
      "attempt": "敌人从岗位出发，依目击、警戒和可达路线响应。角色先用灰盒看半翻节奏，再用临时纹理试正反面，最后把现有美术接上动作找接缝。",
      "result": "灰盒半翻的节奏得到认可，真实贴图进入下一轮试绑。"
    }
  ],
  [
    "weapons",
    "2026-10-28",
    "从一套骨架到每把武器自己的动作",
    {
      "goal": "共用同一套骨架，怎样让每把武器握得住、打起来也有区别？",
      "attempt": "先查枪口、手掌和近远层序，用左右跳与前扑后仰的同帧对照找漏项；再分别处理三种枪的散布、手枪与霰弹枪的换弹，以及狙击枪装匣时的惯性。",
      "result": "后臂消失追到了审图底色，狙击枪留下局部补丁。菜单同期有了可操作的占位版。"
    }
  ],
  [
    "identity",
    "2026-11-01",
    "多角色、界面与第一地区的尺度",
    {
      "goal": "换一名角色、放大界面、把人放进船坞，各自该保留什么尺度？",
      "attempt": "把不同身形接回同一套动作，把界面放大到 150% 看名称、卡片和长枪是否争位置。外船坞另以一次跳跃的高度为尺，重新换算门、坡和平台。",
      "result": "第一名角色保留当前版本，反复改胸腰胯的方法停用。分层货运港仍是地区构思。"
    }
  ],
  [
    "dock",
    "2026-11-07",
    "工坊第一次交付一座能出击的船坞",
    {
      "goal": "工坊能拼出房间，怎样让玩家从基地进去打完一局？",
      "attempt": "先固定房间布局，逐项接上显示、碰撞、战斗和撤离，再让新出击取新种子、重试保留旧路线。平台下穿、高低差追击和动作发声也有了可重复的场景。",
      "result": "固定与随机出击先后接通。隐藏画外房间未减少绘制次数，候选撤下。"
    }
  ],
  [
    "base",
    "2026-11-10",
    "《回曜》定名，基地从入口长成场所",
    {
      "goal": "从标题进入基地后，玩家在哪里落脚、听见什么、哪里能试枪？",
      "attempt": "给游戏定名并分别保存双语字标，安排签名、海岸和音乐的出现顺序。基地先围绕导航台校准落脚点，再接动态远景，最后用人偶标出靶场。",
      "result": "角色能从同一艘船出发、练习和返回；撤离声音可跨场景渐弱。"
    }
  ],
  [
    "load",
    "2026-11-14",
    "高清场景、交战负载与军械库",
    {
      "goal": "场景换上高清图之后，怎样找出卡顿与画面缺口各自的原因？",
      "attempt": "对照预取圈数、脚底拟合与敌人调度；对能固定位置的问题单独复现，从头盔下的一发漏判、死亡后的枪口火光，一直查到基地连接门的两道竖缝。",
      "result": "局部漏判、火光和门身各有修复。增加预取也增加了启动开销，整局卡顿继续保留。"
    }
  ],
  [
    "combat",
    "2026-11-17",
    "让基地、角色技能与正式任务用同一套规则",
    {
      "goal": "基地里的换装、试用和技能，怎样走进正式任务并正确返回？",
      "attempt": "从正常导航出击，让红发技能随角色进入任务；再查整船镜头、试用返回和越界回位。旧工业设施移除时，沿外船坞的歼灭、竞速入口核对往返。",
      "result": "基地和正式任务各自恢复对应规则，歼灭保留兵员身份；常规回位保留淡出，撤下提示文字。"
    }
  ],
  [
    "current",
    "2026-11-19",
    "复现具体的一局，再做下一间房",
    {
      "goal": "能否把试玩里的“这一局不对”追到具体房间、视点和动作帧？",
      "attempt": "固定交战样板用同一批敌人比较手感；换弹中投掷则停在刚装进一发的那一帧。船坞沿原种子回到第 11 房复现报错，再回正式任务复查预建和首段交火。",
      "result": "遮挡、动作交接和房间构建各有局部结果。飞船检修室可在工坊编辑，稳定 60 帧和整局体验仍待验证。"
    }
  ],
  [
    "character-motion",
    "2026-11-24",
    "从一张侧身站姿，到跑动中回身射击",
    {
      "goal": "从静止侧身到跑动中回身射击，头、枪和脚能否各自跟对方向？",
      "attempt": "双马尾先从军械库进入关卡核对发束层序。红发撤下旧跑跳试验，从全身原画重新定头位、颈长和肩窝，再在专用测试室依次检查近身瞄准、移动持枪和回身下射。",
      "result": "双马尾新版已接入正式游戏。红发的静态比例得到确认，测试室的动作修复仍待试玩。"
    }
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
  const attempt = appendStory(item, note.story);
  if (noteFigures(note).length) {
    function showFigures() {
      if (!item.open) return;
      appendNoteFigures(attempt, note);
      item.removeEventListener("toggle", showFigures);
    }
    item.addEventListener("toggle", showFigures);
  }
  return item;
}
let previous = "";
for (const [id, end, title, story] of chapters) {
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
  section.append(textElement("small", dates), textElement("h2", title));
  appendStory(section, story);
  const events = document.createElement("div");
  events.className = "history-events";
  for (const entry of entries) events.append(noteDetails(entry));
  section.append(events);
  container.append(section);
  previous = end;
}
if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
