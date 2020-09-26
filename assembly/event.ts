import { PersistentVector } from 'near-sdk-as'

const events = new PersistentVector<Event>('events')

@nearBindgen
export class Event {
	collection: string
	action: string
	params: string[]

	constructor(collection: string, action: string, params: string[]) {
		this.collection = collection
		this.action = action
		this.params = params
	}
}

export function _getEvent(index: i32): Event {
	return events[index]
}

export function _getEventHeight(): i32 {
	return events.length
}

export function pushEvent(
	collection: string,
	action: string,
	params: string[]
): void {
	const event = new Event(collection, action, params)
	events.push(event)
}
