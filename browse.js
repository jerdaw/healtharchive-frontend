async function loadRecords() {
  const response = await fetch("data/demo-records.json");
  if (!response.ok) {
    throw new Error("Failed to load records");
  }
  return response.json();
}

function groupBySource(records) {
  const groups = new Map();

  for (const rec of records) {
    const source = rec.source || "Unknown source";
    if (!groups.has(source)) {
      groups.set(source, {
        source,
        count: 0,
        earliest: null,
        latest: null,
        topics: new Set(),
      });
    }
    const group = groups.get(source);
    group.count += 1;

    if (rec.crawl_date) {
      const d = new Date(rec.crawl_date);
      if (!Number.isNaN(d.getTime())) {
        if (!group.earliest || d < group.earliest) group.earliest = d;
        if (!group.latest || d > group.latest) group.latest = d;
      }
    }

    (rec.topics || []).forEach((t) => group.topics.add(t));
  }

  return Array.from(groups.values());
}

function formatDate(d) {
  if (!d) return "Unknown date";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function renderSourceCards(groups) {
  const container = document.getElementById("source-cards");
  if (!container) return;
  container.innerHTML = "";

  if (!groups.length) {
    const p = document.createElement("p");
    p.className = "ha-muted";
    p.textContent = "No sources available in this demo dataset.";
    container.appendChild(p);
    return;
  }

  // Sort alphabetically by source name
  groups.sort((a, b) => a.source.localeCompare(b.source));

  for (const group of groups) {
    const card = document.createElement("article");
    card.className = "ha-source-card";

    const title = document.createElement("h2");
    title.className = "ha-source-title";
    title.textContent = group.source;

    const meta = document.createElement("p");
    meta.className = "ha-source-meta";
    const rangeText =
      group.earliest && group.latest
        ? `${formatDate(group.earliest)} – ${formatDate(group.latest)}`
        : "Date range: unknown";
    meta.textContent = `${group.count} demo record(s) · ${rangeText}`;

    const topics = Array.from(group.topics);
    if (topics.length) {
      const topicsEl = document.createElement("p");
      topicsEl.className = "ha-source-topics";
      topicsEl.textContent = `Example topics: ${topics.slice(0, 4).join(", ")}`;
      card.appendChild(topicsEl);
    }

    const actions = document.createElement("div");
    actions.className = "ha-source-actions";

    const browseLink = document.createElement("a");
    browseLink.className = "ha-button-secondary ha-button-compact";
    browseLink.href =
      "search.html?" + new URLSearchParams({ source: group.source }).toString();
    browseLink.textContent = "View records";

    actions.appendChild(browseLink);

    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(actions);

    container.appendChild(card);
  }
}

async function initBrowse() {
  let records = [];
  try {
    records = await loadRecords();
  } catch (e) {
    console.error(e);
    const container = document.getElementById("source-cards");
    if (container) {
      container.innerHTML = "";
      const p = document.createElement("p");
      p.className = "ha-muted";
      p.textContent = "Error loading demo data.";
      container.appendChild(p);
    }
    return;
  }

  const groups = groupBySource(records);
  renderSourceCards(groups);
}

document.addEventListener("DOMContentLoaded", initBrowse);

