const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const res = await fetch("./projects.json");
const projects = await res.json();

document.getElementById("grid").innerHTML = projects
  .map(
    (p) => `
  <a class="card" href="${esc(p.path)}index.html">
    <img src="${esc(p.path)}thumb.png" alt="" loading="lazy" />
    <p>${esc(p.id)}. ${esc(p.title)}</p>
  </a>
`,
  )
  .join("");
