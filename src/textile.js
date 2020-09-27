const { PrivateKey } = require('@textile/hub')
const { Client, ThreadID } = require('../textile')

class Textile {
	constructor() {
		this.client = null
	}

	async init(keyInfo, privateKey) {
		this.client = await Client.withKeyInfo(keyInfo)
		const identity = PrivateKey.fromString(privateKey)
		await this.client.getToken(identity)
		console.log(`authenticate as ${identity.public.toString()}`)
	}

	async createDB(dbName) {
		try {
			const threadID = await this.client.newDB(undefined, dbName)
			return threadID
		} catch (err) {
			console.log(err)
		}
	}

	async parseThreadID(threadID) {
		return ThreadID.fromString(threadID)
	}
}

module.exports = Textile
