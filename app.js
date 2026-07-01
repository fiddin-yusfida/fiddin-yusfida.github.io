const content = window.profileContent;
const byId = (id) => document.getElementById(id);

const totalPublications = content.researchHistory.reduce((sum, entry) => sum + entry.publications.length, 0);
const years = content.researchHistory.map((entry) => Number(entry.year)).filter(Number.isFinite);
const earliestYear = Math.min(...years);
const latestYear = Math.max(...years);

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

byId("profile-facts").innerHTML = facts
  .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
  .join("");

const stats = [
  { value: `${totalPublications}+`, label: "selected publications" },
  { value: `${earliestYear}-${latestYear}`, label: "research record span" },
  { value: `${content.researchAreas.length}`, label: "core research areas" }
];

byId("profile-stats").innerHTML = stats
  .map((item) => `<article class="stat-card"><strong>${item.value}</strong><span>${item.label}</span></article>`)
  .join("");

byId("expertise-list").innerHTML = content.profile.expertise.map((item) => `<span>${item}</span>`).join("");

const card = (item) => `
  <article class="content-card">
    <p class="card-meta">${item.meta}</p>
    <h3>${item.title}</h3>
    <p>${item.description}</p>
  </article>
`;

byId("research-list").innerHTML = content.researchAreas.map(card).join("");

byId("research-history").innerHTML = content.researchHistory.map((entry) => `
  <article class="history-entry">
    <div class="history-year">${entry.year}</div>
    <div class="history-content">
      <h3>${entry.theme}</h3>
      <p>${entry.description}</p>
      <details ${entry.year === String(latestYear) ? "open" : ""}>
        <summary>${entry.publications.length} selected publication${entry.publications.length === 1 ? "" : "s"}</summary>
        <ul>
          ${entry.publications.map((publication) => `
            <li>
              <a href="${publication.url}" target="_blank" rel="noreferrer">${publication.title}</a>
              <span>${publication.venue}</span>
            </li>
          `).join("")}
        </ul>
      </details>
    </div>
  </article>
`).join("");

const profileDescriptions = {
  "Google Scholar": "Citation profile and indexed scholarly outputs.",
  "SINTA": "Indonesian research identity and national indexing record.",
  "ORCID": "Persistent researcher identifier for academic interoperability.",
  "Scopus": "Author profile with indexed publications and metrics.",
  "IEEE Xplore": "Conference and journal publications in engineering venues.",
  "LinkedIn": "Professional profile and broader academic network.",
  "Department Website": "Institutional page and departmental context."
};

const academicLabels = new Set(Object.keys(profileDescriptions));
const academicLinks = content.links.filter((item) => academicLabels.has(item.label));
byId("academic-links").innerHTML = academicLinks.map((item) => `
  <a class="profile-link" href="${item.url}" target="_blank" rel="noreferrer">
    <strong>${item.label}</strong>
    <p>${profileDescriptions[item.label]}</p>
    <span>Open profile</span>
  </a>
`).join("");

const sidebarLabels = new Set(["Email", "GitHub"]);
const sidebarLinks = content.links.filter((item) => sidebarLabels.has(item.label));
byId("sidebar-links").innerHTML = sidebarLinks
  .map((item) => `<a class="sidebar-link" href="${item.url}" ${item.url.startsWith("mailto:") ? "" : 'target="_blank" rel="noreferrer"'}>${item.label}</a>`)
  .join("");

const primaryLabels = new Set(["Email", "Google Scholar", "GitHub"]);
const primaryLinks = content.links.filter((item) => primaryLabels.has(item.label));
byId("contact-links").innerHTML = primaryLinks.map((item, index) => `
  <a class="button ${index === 0 ? "button-primary" : "button-secondary"}" href="${item.url}" ${item.url.startsWith("mailto:") ? "" : 'target="_blank" rel="noreferrer"'}>
    ${item.label}
  </a>
`).join("");
