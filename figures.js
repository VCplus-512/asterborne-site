function noteFigures(note) {
  return (note.figures || []).filter(figure => figure && typeof figure.image === "string" && figure.image.trim());
}

function renderNoteTitle(element, note) {
  element.textContent = note.title;
  const count = noteFigures(note).length;
  if (count) {
    const icon = document.createElement("span");
    icon.className = "note-image-icon";
    icon.title = `含 ${count} 张配图`;
    icon.setAttribute("role", "img");
    icon.setAttribute("aria-label", icon.title);
    icon.innerHTML = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="16" height="14" rx="2"/><circle cx="7" cy="7.5" r="1.3"/><path d="m3 15 4-4 3 2.5 3.5-5 4 5"/></svg>';
    element.append(icon);
  }
  return element;
}

function appendNoteFigures(container, note) {
  for (const { image, caption } of noteFigures(note)) {
    const figure = document.createElement("figure");
    const link = document.createElement("a");
    link.href = "media/" + image;
    link.target = "_blank";
    link.rel = "noopener";
    link.title = "打开大图";
    const photo = new Image();
    photo.alt = caption;
    photo.src = link.href;
    link.append(photo);
    const legend = document.createElement("figcaption");
    legend.textContent = caption;
    figure.append(link, legend);
    container.append(figure);
  }
}
