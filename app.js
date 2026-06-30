const content = window.profileContent;
const byId = (id) => document.getElementById(id);

byId("hero-name").textContent = content.profile.name;
byId("hero-role").textContent = content.profile.role;
byId("hero-summary").textContent = content.profile.summary;
byId("about-text").textContent = content.profile.about;
byId("collaboration-text").textContent = content.profile.collaboration;
byId("current-year").textContent = new Date().getFullYear();

const facts = [
  ["Peran", content.profile.role],
  ["Institusi", content.profile.institution],
  ["Lokasi", content.profile.location]
];
byId("profile-facts").innerHTML = facts.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");
byId("expertise-list").innerHTML = content.profile.expertise.map((item) => `<span>${item}</span>`).join("");

const card = (item) => `<article class="content-card"><p class="card-meta">${item.meta}</p><h3>${item.title}</h3><p>${item.description}</p><a href="${item.url}">Lihat selengkapnya <span aria-hidden="true">→</span></a></article>`;
byId("project-list").innerHTML = content.projects.map(card).join("");
byId("teaching-list").innerHTML = content.teaching.map(card).join("");
byId("publication-list").innerHTML = content.publications.map((item) => `<article class="publication"><span>${item.year}</span><div><h3><a href="${item.url}">${item.title}</a></h3><p>${item.venue}</p></div></article>`).join("");
byId("contact-links").innerHTML = content.links.map((item, index) => `<a class="button ${index === 0 ? "button-primary" : "button-secondary"}" href="${item.url}">${item.label}</a>`).join("");

const toggle = document.querySelector(".nav-toggle");
const nav = byId("site-nav");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
});
nav.addEventListener("click", () => {
  toggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
});
