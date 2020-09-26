const { Client, ThreadID } = require('@textile/hub')

const keyInfo = {
	key: 'bxlflunozpu2t56cuny4tptz3xm',
}
const threadID = 'bafky4styzhndw7x6qbjs5bebsliplv3hljrxqvefrosu6qcci6hphxa'

async function find() {
	const client = await Client.withKeyInfo(keyInfo)
	const tID = ThreadID.fromString(threadID)
	const x = await client.find(tID, 'person', {})
	console.log(x)
}

find()
