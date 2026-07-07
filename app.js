const content = window.profileContent;
const byId = (id) => document.getElementById(id);
const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const totalPublications = content.researchHistory.reduce(
  (total, entry) => total + entry.publications.length,
  0
);
const years = content.researchHistory.map((entry) => Number(entry.year)).filter(Number.isFinite);
const earliestYear = Math.min(...years);
const latestYear = Math.max(...years);

byId("profile-name").textContent = content.profile.name;
byId("profile-role").textContent = content.profile.role;
byId("profile-institution").textContent = content.profile.institution;
byId("profile-summary").textContent = content.profile.summary;
byId("profile-about").textContent = content.profile.about;
byId("collaboration-text").textContent = content.profile.collaboration;
byId("current-year").textContent = new Date().getFullYear();
byId("publication-summary").textContent = `${totalPublications} selected publications from ${earliestYear}–${latestYear}, based on the linked Google Scholar, Scopus, and IEEE Xplore records.`;

const profileDetails = [
  ["Academic Position", "Lecturer"],
  ["Study Program", "Informatics Engineering"],
  ["Institution", content.profile.institution],
  ["Location", content.profile.location],
  ["Email", "fiddin@staff.uns.ac.id"]
];

byId("profile-details").innerHTML = profileDetails.map(([label, value]) => `
  <div class="data-row">
    <dt>${escapeHtml(label)}</dt>
    <dd>${escapeHtml(value)}</dd>
  </div>
`).join("");

byId("expertise-list").innerHTML = content.profile.expertise
  .map((item) => `<li>${escapeHtml(item)}</li>`)
  .join("");

byId("research-list").innerHTML = content.researchAreas.map((item) => `
  <article class="research-item">
    <div class="research-label">${escapeHtml(item.title)}</div>
    <p>${escapeHtml(item.description)}</p>
  </article>
`).join("");

byId("publication-history").innerHTML = content.researchHistory.map((entry) => `
  <article class="year-group">
    <div class="year-label">${escapeHtml(entry.year)}</div>
    <div class="year-content">
      <h3>${escapeHtml(entry.theme)}</h3>
      <p>${escapeHtml(entry.description)}</p>
      <ul class="publication-list">
        ${entry.publications.map((publication) => `
          <li>
            <a href="${escapeHtml(publication.url)}" target="_blank" rel="noreferrer">${escapeHtml(publication.title)}</a>
            <span class="publication-venue">${escapeHtml(publication.venue)}</span>
          </li>
        `).join("")}
      </ul>
    </div>
  </article>
`).join("");

byId("academic-links").innerHTML = content.links.map((item) => `
  <div class="data-row">
    <dt>${escapeHtml(item.label)}</dt>
    <dd>
      <a href="${escapeHtml(item.url)}" ${item.url.startsWith("mailto:") ? "" : 'target="_blank" rel="noreferrer"'}>
        ${escapeHtml(item.url.replace("mailto:", ""))}
      </a>
    </dd>
  </div>
`).join("");
