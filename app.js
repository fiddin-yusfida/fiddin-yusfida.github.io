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
  ["Institution", content.profile.institution],
  ["Location", content.profile.location],
  ["Email", "fiddin@staff.uns.ac.id"]
];

byId("profile-facts").innerHTML = facts
  .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
  .join("");

const stats = [
  `${totalPublications}+ selected publications`,
  `${earliestYear}-${latestYear} research record`,
  `${content.researchAreas.length} core research areas`
];

byId("profile-stats").innerHTML = stats
  .map((item) => `<div class="stat-card"><strong>${item}</strong></div>`)
  .join("");

byId("expertise-list").innerHTML = content.profile.expertise.map((item) => `<span>${item}</span>`).join("");

byId("research-list").innerHTML = content.researchAreas.map((item) => `
  <article class="content-card">
    <p class="card-meta">${item.meta}</p>
    <div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  </article>
`).join("");

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
  "ORCID": "Persistent researcher identifier.",
  "Scopus": "Indexed author profile and publication record.",
  "IEEE Xplore": "Engineering and conference publication record.",
  "LinkedIn": "Professional profile and network.",
  "Department Website": "Institutional profile and department context."
};

const academicLabels = new Set(Object.keys(profileDescriptions));
byId("academic-links").innerHTML = content.links
  .filter((item) => academicLabels.has(item.label))
  .map((item) => `
    <a class="profile-link" href="${item.url}" target="_blank" rel="noreferrer">
      <strong>${item.label}</strong>
      <p>${profileDescriptions[item.label]}</p>
      <span>Open</span>
    </a>
  `)
  .join("");

byId("sidebar-links").innerHTML = content.links
  .filter((item) => ["Email", "GitHub"].includes(item.label))
  .map((item) => `<a class="sidebar-link" href="${item.url}" ${item.url.startsWith("mailto:") ? "" : 'target="_blank" rel="noreferrer"'}>${item.label}</a>`)
  .join("");

byId("contact-links").innerHTML = content.links
  .filter((item) => ["Email", "Google Scholar", "GitHub"].includes(item.label))
  .map((item) => `<a class="button" href="${item.url}" ${item.url.startsWith("mailto:") ? "" : 'target="_blank" rel="noreferrer"'}>${item.label}</a>`)
  .join("");
