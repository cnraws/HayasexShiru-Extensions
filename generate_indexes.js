const fs = require("fs");

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

// Shiru index
const shiruIndex = {
  sources: sources.map((s) => ({
    id: s.id,
    name: s.name,
    version: s.version, 
    main: `./${s.id}/code.js`,
    type: s.type,
    nsfw: s.nsfw || false,
    description: `Shiru extension for ${s.name}`,
    icon: s.icon,
    update: "https://raw.githubusercontent.com/ReWelp/HayasexShiru-Extensions/main/shiru/index.json",
  })),
};

// Write to file
fs.writeFileSync("./shiru/index.json", JSON.stringify(shiruIndex, null, 2));
console.log("Shiru index generated successfully!");

// Hayase index
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
  update: "https://raw.githubusercontent.com/ReWelp/HayasexShiru-Extensions/main/hayase/index.json",
  code: `https://raw.githubusercontent.com/ReWelp/HayasexShiru-Extensions/main/hayase/${s.id}.js`,
}));

fs.writeFileSync("./hayase/index.json", JSON.stringify(hayaseIndex, null, 2));