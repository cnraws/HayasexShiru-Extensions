export default {
  id: "nyaa",
  name: "Nyaa",
  type: "torrent",

  // IMPORTANT: Shiru expects validate as a VALUE, not a function
  validate: Promise.resolve(true),

  async single({ titles, episode }) {
    if (!titles?.length) return []
    return this._search(titles[0], episode)
  },

  batch(options) {
    return this.single(options)
  },

  movie(options) {
    return this.single(options)
  },

  async _search(title, episode) {
    let query = title.replace(/[^\w\s-]/g, " ").trim()
    if (episode) query += ` ${episode.toString().padStart(2, "0")}`

    const url =
      "https://torrent-search-api-livid.vercel.app/api/nyaasi/" +
      encodeURIComponent(query)

    const res = await fetch(url)
    if (!res.ok) return []

    const data = await res.json()
    if (!Array.isArray(data)) return []

    return data.map(item => ({
      title: item.Name,
      link: item.Magnet,
      hash: item.Magnet?.match(/btih:([A-Fa-f0-9]+)/)?.[1] || "",
      seeders: Number(item.Seeders || 0),
      leechers: Number(item.Leechers || 0),
      downloads: Number(item.Downloads || 0),
      size: 0,
      date: new Date(item.DateUploaded),
      accuracy: "medium",
      type: "alt"
    }))
  }
}