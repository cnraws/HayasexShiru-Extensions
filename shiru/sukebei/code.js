export default async function search(query) {
  const url =
    'https://torrent-search-api-livid.vercel.app/api/sukebei/' +
    encodeURIComponent(query)

  const res = await fetch(url)
  const data = await res.json()

  if (!Array.isArray(data)) return []

  return data.map(item => ({
    title: item.Name || '',
    link: item.Magnet || ''
  }))
}