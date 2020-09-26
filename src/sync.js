const nearAPI = require('near-api-js')
const path = require('path')
const { UnencryptedFileSystemKeyStore } = require('near-api-js/lib/key_stores')
const { homedir } = require('os')
const { writeFileSync } = require('fs')

const CREDENTIALS_DIR = '.near-credentials'
const credentialsPath = path.join(homedir(), CREDENTIALS_DIR)

const processEvent = async (ctx, newEvent, textileClient, config) => {
	console.log('processing event')
	config.processEvent(ctx, newEvent, textileClient, config)
}

const fetchEvent = async (ctx, account, textileClient, config) => {
	const eventHeight = await account.viewFunction(
		config.contractName,
		'getEventHeight',
		''
	)
	const curEventHeight = ctx.setup.eventHeight
	if (eventHeight > curEventHeight) {
		console.log(`sync event height ${curEventHeight}`)
		const newEvent = await account.viewFunction(
			config.contractName,
			'getEvent',
			{
				index: curEventHeight,
			}
		)
		try {
			await processEvent(ctx, newEvent, textileClient, config)
			ctx.setup.eventHeight += 1
			writeFileSync(ctx.setupPath, JSON.stringify(ctx.setup))
		} catch (err) {
			console.log(err)
		}
	}
	console.log(`syncing ${(curEventHeight * 100) / eventHeight}%`)
	setTimeout(() => {
		fetchEvent(ctx, account, textileClient, config)
	}, 500)
}

const main = async (ctx, textileClient, config) => {
	const nearConfig = {
		networkId: config.networkId,
		nodeUrl: config.nodeUrl,
		contractName: config.contractName,
	}
	const near = await nearAPI.connect({
		deps: {
			keyStore: new UnencryptedFileSystemKeyStore(credentialsPath),
		},
		...nearConfig,
	})
	const account = await near.account(config.contractName)
	fetchEvent(ctx, account, textileClient, config)
}

module.exports = main
