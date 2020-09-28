# near-textile-indexer

Event indexer for smart contract on [NEAR](https://near.org) using [Textile](https://textile.io) as storage and query engine.

## Problem

Doing intensive computation (sorting, etc) for get request is not possible on blockchain due to it's nature for decentralization.

Developers at NEAR create their own indexer (Flux Protocol, Mintbase, Paras). 
They need to setup a centralized database for the indexing layer. 

What if we also have a decentralized database for the indexing layer? 
This is where Textile's ThreadDB shine. A decentralized indexing layer.

Ethereum developers has Graph Protocol and they expect NEAR to have something similar. 
This repo is the proof of concept for NEAR indexing layer using decentralized database by Textile.

## TL;DR

Read the implementation via [example](https://github.com/hdriqi/near-textile-indexer-example).

or

[Watch the example demo](https://www.loom.com/share/4d2382fa6e634569b51e467ede03d69e)

## Installation

`npm install near-textile-indexer`

or

`yarn add near-textile-indexer`

## How to use

Unlike Ethereum, NEAR does not have built-in Event. This indexer requires your smart contract to have the Event store.

### Smart Contract

You can find the smart contract on code on [example here](https://github.com/hdriqi/near-textile-indexer-example).

You must create a `PersistentVector` that holds all the `Event` on smart contract with `getEvent` and `getEventHeight` public methods for querying the event.

#### PersistentVector

```ts
const events = new PersistentVector<Event>('events')
```

#### getEvent

```ts
export function getEvent(index: i32): Event {
	return events[index]
}
```

#### getEventHeight

```ts
export function getEventHeight(): i32 {
	return events.length
}
```

#### Event type

```ts
Event {
  collection: string
  action: string
  params: string[]
}
```

### Indexer

If your smart contract is ready with all the requirement above, you can setup the indexer.

The indexer will generate `setup.json` that contains `threadID` and `eventHeight`.

```js
const indexer = require('near-textile-indexer')

const config = {
  ...
}

indexer(config)
```

#### Config

```js
const config = {
  // NEAR network ID
  networkId: string,
  // NEAR node url
  nodeUrl: string,
  // NEAR contract name
  contractName: string,
  // key generated via https://docs.textile.io/hub/apis/
	keyInfo: {
		key: process.env.TEXTILE_API_KEY
  },
  // admin private key generated via https://textileio.github.io/js-hub/docs/hub.privatekey
  privateKey: process.env.ADMIN_PRIVATE_KEY,
  // see https://textileio.github.io/js-hub/docs/hub.collectionconfig
	collections: CollectionConfig[],
	// callback called when new event found
	async processEvent(ctx, event, textileClient) {
		// see example for more information
	}
}
```

### Query

You can easily query the data using `@textile/hub` on client or server side.

Here's the example code

```js
const { Client, ThreadID, PrivateKey } = require('@textile/hub')

const keyInfo = {
	key: 'xxx',
}
const threadID = 'yyy'

const client = await Client.withKeyInfo(keyInfo)
const identity = PrivateKey.fromRandom()
await client.getToken(identity)
const tID = ThreadID.fromString(threadID)
const x = await client.find(tID, 'person', {})
```

## License

MIT License
