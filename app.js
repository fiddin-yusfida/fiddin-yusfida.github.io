const content = window.profileContent;
const byId = (id) => document.getElementById(id);

byId("hero-name").textContent = content.profile.name;
byId("hero-role").textContent = content.profile.role;
byId("hero-summary").textContent = content.profile.summary;
byId("about-text").textContent = content.profile.about;
byId("collaboration-text").textContent = content.profile.collaboration;
byId("current-year").textContent = new Date().getFullYear();

const facts = [
  ["Position", content.profile.role],
  ["Institution", content.profile.institution],
  ["Location", content.profile.location]
];
byId("profile-facts").innerHTML = facts.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");
byId("expertise-list").innerHTML = content.profile.expertise.map((item) => `<span>${item}</span>`).join("");

const card = (item) => `<article class="content-card"><p class="card-meta">${item.meta}</p><h3>${item.title}</h3><p>${item.description}</p></article>`;
byId("research-list").innerHTML = content.researchAreas.map(card).join("");

byId("research-history").innerHTML = content.researchHistory.map((entry) => `
  <article class="history-entry">
    <div class="history-year">${entry.year}</div>
    <div class="history-content">
      <h3>${entry.theme}</h3>
      <p>${entry.description}</p>
      <ul>${entry.publications.map((publication) => `<li><a href="${publication.url}" target="_blank" rel="noreferrer">${publication.title}</a><span>${publication.venue}</span></li>`).join("")}</ul>
    </div>
  </article>
`).join("");

const academicLabels = new Set(["Google Scholar", "SINTA", "ORCID", "Scopus", "LinkedIn", "Department Website"]);
const academicLinks = content.links.filter((item) => academicLabels.has(item.label));
byId("academic-links").innerHTML = academicLinks.map((item) => `<a class="profile-link" href="${item.url}" target="_blank" rel="noreferrer"><span>${item.label}</span><span aria-hidden="true">↗</span></a>`).join("");

const primaryLabels = new Set(["GitHub", "Email"]);
const primaryLinks = content.links.filter((item) => primaryLabels.has(item.label));
byId("contact-links").innerHTML = primaryLinks.map((item, index) => `<a class="button ${index === 0 ? "button-primary" : "button-secondary"}" href="${item.url}">${item.label}</a>`).join("");

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
