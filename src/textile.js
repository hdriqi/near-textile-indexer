const { Client, ThreadID } = require('../textile')

class Textile {
	constructor() {
		this.client = null
	}

	async init(keyInfo) {
		this.client = await Client.withKeyInfo(keyInfo)
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
