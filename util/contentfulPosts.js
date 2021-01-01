const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

const client = require('contentful').createClient({
    space: space,
    accessToken: accessToken,
})

let entriesFromCMS = [];

export async function fetchEntries() {
    try {
        if (!entriesFromCMS.length) {
            const cmsData = await client.getEntries();
            entriesFromCMS = (cmsData.items || []).map(item => (
                {
                    id: item.sys.id,
                    contentType: item.sys.contentType.sys.id,
                    ...item.fields
                }
            ))
            console.log('entriesFromCMS',entriesFromCMS)    
        }
        if (entriesFromCMS) return entriesFromCMS
        return `Warning! No content found ${e.message}`
    } catch (e) {
        console.log(`Error occurs getting content ${e.message}`)
        return `Error occurs getting content ${e.message}`
    }
}

export async function getAllPostIds() {
    const entries = await fetchEntries();
    return entries
    .filter(entry => entry.contentType === 'post')
    .map(entry => ({
        params: {
            'id': entry.id
        }
    }));
}

export async function getPostData(id) {
    const entries = await fetchEntries();

    return entries.find(entry => id === entry.id)
}

export default { fetchEntries }
