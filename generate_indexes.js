import { writeFileSync } from 'fs';

const sources = [
  {
    id: "nyaa",
    name: "Nyaa",
    icon: "https://nyaa.si/static/favicon.png",
    type: "torrent",
    version: "1.0.1"
  },
  {
    id: "sukebei",
    name: "Sukebei",
    icon: "https://sukebei.nyaa.si/static/favicon.png",
    type: "torrent",
    nsfw: true,
    version: "1.0.1"
  },
];

const REPO_BASE = "https://raw.githubusercontent.com/ReWelp/HayasexShiru-Extensions/main";

// Shiru index - FIXED: Use absolute URLs
const shiruIndex = {
  sources: sources.map((s) => ({
    id: s.id,
    name: s.name,
    version: s.version,
    main: `${REPO_BASE}/shiru/${s.id}/code.js`, // Changed to absolute URL
    type: s.type,
    nsfw: s.nsfw || false,
    description: `Shiru extension for ${s.name}`,
    icon: s.icon,
    update: `${REPO_BASE}/shiru/index.json`,
  })),
};

writeFileSync("./shiru/index.json", JSON.stringify(shiruIndex, null, 2));

// Hayase index (already correct)
const hayaseIndex = sources.map((s) => ({
  id: `hayase.extension.${s.id}`,
  name: s.name,
  version: "1.0.2",
  type: s.type,
  accuracy: "medium",
  ratio: 0,
  media: s.id === "sukebei" ? "both" : "sub",
  languages: ["all"],
  nsfw: s.nsfw || false,
  icon: s.icon,
  update: `${REPO_BASE}/hayase/index.json`,
  code: `${REPO_BASE}/hayase/${s.id}.js`,
}));

writeFileSync("./hayase/index.json", JSON.stringify(hayaseIndex, null, 2));

// Root index for gh: shortcut
const rootIndex = [
  {
    "main": "shiru/index.json"
  }
];

writeFileSync("./index.json", JSON.stringify(rootIndex, null, 2));

console.log("All indexes generated successfully!");