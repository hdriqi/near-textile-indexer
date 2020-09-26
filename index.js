const dotenv = require('dotenv')
const indexer = require('./src/index')
const { Where } = require('@textile/hub')

dotenv.config()

const config = {
	networkId: process.env.NETWORK_ID,
	nodeUrl: process.env.NODE_URL,
	contractName: process.env.CONTRACT_NAME,
	keyInfo: {
		key: process.env.TEXTILE_API_KEY,
	},
	collections: [
		{
			name: 'person',
			schema: {
				title: 'Person',
				type: 'object',
				properties: {
					_id: { type: 'string' },
					name: { type: 'string' },
					bio: { type: 'string' },
				},
			},
		},
	],
	async processEvent(ctx, event, textileClient) {
		if (event.collection === 'person') {
			if (event.action === 'create') {
				console.log('create')
				const newPerson = {
					_id: '',
					name: event.params[0],
					bio: event.params[1],
				}
				await textileClient.create(ctx.threadID, event.collection, [newPerson])
			}
			if (event.action === 'update') {
				console.log('update')
				const query = new Where('name').eq(event.params[0])
				const result = await textileClient.find(
					ctx.threadID,
					event.collection,
					query
				)

				if (result.length > 0) {
					const person = result[0]
					person.bio = event.params[1]

					await textileClient.save(ctx.threadID, event.collection, [person])
				}
			}
			if (event.action === 'delete') {
				console.log('delete')
				const query = new Where('name').eq(event.params[0])
				const result = await textileClient.find(
					ctx.threadID,
					event.collection,
					query
				)

				if (result.length > 0) {
					const ids = await result.map((instance) => instance._id)
					await textileClient.delete(ctx.threadID, event.collection, ids)
				}
			}
		}
	},
}

indexer(config)
