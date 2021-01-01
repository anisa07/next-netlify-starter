const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
})

export async function fetchEntries() {
  try {
    const entries = await client.getEntries()
    if (entries.items) return entries.items
    return `Warning! No content found ${e.message}`
  } catch (e) {
    console.log(`Error occurs getting content ${e.message}`)
    return `Error occurs getting content ${e.message}`
  }
}

export default { fetchEntries }
