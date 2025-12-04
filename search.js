function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || "";
}

function normalize(str) {
  return (str || "").toLowerCase();
}

async function loadRecords() {
  const response = await fetch("data/demo-records.json");
  if (!response.ok) {
    throw new Error("Failed to load records");
  }
  return response.json();
}

function recordMatches(record, query, sourceFilter) {
  const q = normalize(query);
  const source = normalize(sourceFilter);

  // If a source filter is specified, enforce it
  if (source && normalize(record.source) !== source) {
    return false;
  }

  if (!q) {
    return true; // show all records for this source if no query
  }

  const haystack = [
    record.title,
    record.snippet,
    (record.topics || []).join(" "),
    record.source,
  ]
    .map(normalize)
    .join(" ");

  return haystack.includes(q);
}

function formatDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function renderResults(records, query, sourceFilter) {
  const container = document.getElementById("search-results");
  const meta = document.getElementById("search-meta");
  container.innerHTML = "";

  const trimmedQuery = query.trim();
  const trimmedSource = sourceFilter.trim();

  if (!records.length) {
    if (trimmedQuery && trimmedSource) {
      meta.textContent = `No results found for “${trimmedQuery}” from source “${trimmedSource}”.`;
    } else if (trimmedQuery) {
      meta.textContent = `No results found for “${trimmedQuery}”.`;
    } else if (trimmedSource) {
      meta.textContent = `No results found from source “${trimmedSource}”.`;
    } else {
      meta.textContent = "No records available in this demo dataset.";
    }
    return;
  }

  let metaText = `${records.length} result(s)`;
  if (trimmedQuery) {
    metaText += ` for “${trimmedQuery}”`;
  }
  if (trimmedSource) {
    metaText += trimmedQuery ? ` from “${trimmedSource}”` : ` from source “${trimmedSource}”`;
  }
  metaText += ".";
  meta.textContent = metaText;

  for (const rec of records) {
    const card = document.createElement("article");
    card.className = "ha-result-card";

    const titleLink = document.createElement("a");
    titleLink.href = rec.archived_url || "#";
    titleLink.className = "ha-result-title";
    titleLink.textContent = rec.title || "(Untitled)";

    const metaLine = document.createElement("p");
    metaLine.className = "ha-result-meta";
    const dateText = rec.crawl_date ? formatDate(rec.crawl_date) : "Unknown date";
    metaLine.textContent = `${rec.source || "Unknown source"} · archived ${dateText}`;

    const snippet = document.createElement("p");
    snippet.className = "ha-result-snippet";
    snippet.textContent = rec.snippet || "";

    const url = document.createElement("p");
    url.className = "ha-result-url";
    url.textContent = rec.url || "";

    const tags = document.createElement("div");
    tags.className = "ha-result-tags";
    (rec.topics || []).forEach((topic) => {
      const tag = document.createElement("span");
      tag.className = "ha-tag";
      tag.textContent = topic;
      tags.appendChild(tag);
    });

    card.appendChild(titleLink);
    card.appendChild(metaLine);
    card.appendChild(snippet);
    card.appendChild(url);
    if (rec.topics && rec.topics.length) {
      card.appendChild(tags);
    }

    container.appendChild(card);
  }
}

async function runSearch() {
  const query = getQueryParam("q");
  const sourceFilter = getQueryParam("source");
  const input = document.getElementById("search-input");
  if (input) input.value = query;

  let records = [];
  try {
    records = await loadRecords();
  } catch (e) {
    console.error(e);
    const meta = document.getElementById("search-meta");
    if (meta) meta.textContent = "Error loading demo data.";
    return;
  }

  const filtered = records.filter((rec) => recordMatches(rec, query, sourceFilter));
  renderResults(filtered, query, sourceFilter);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const input = document.getElementById("search-input");
      const q = input ? input.value.trim() : "";
      const params = new URLSearchParams(window.location.search);
      params.set("q", q);
      // Preserve source filter if present
      const sourceFilter = getQueryParam("source");
      if (sourceFilter) {
        params.set("source", sourceFilter);
      }
      const newUrl = window.location.pathname + "?" + params.toString();
      window.history.replaceState({}, "", newUrl);
      runSearch();
    });
  }

  runSearch();
});

