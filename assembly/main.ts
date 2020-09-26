import { PersistentMap, PersistentVector } from 'near-sdk-as'

const events = new PersistentVector<Event>('events')
const mappedPerson = new PersistentMap<string, Person>('m::person')

@nearBindgen
class Event {
	collection: string
	action: string
	params: string[]

	constructor(collection: string, action: string, params: string[]) {
		this.collection = collection
		this.action = action
		this.params = params
	}
}

@nearBindgen
class Person {
	name: string
	bio: string

	constructor(name: string, bio: string) {
		this.name = name
		this.bio = bio
	}
}

export function getEvent(index: number): Event {
	return events[index]
}

export function getEventHeight(): number {
	return events.length
}

export function addPerson(name: string, bio: string) {
	const person = new Person(name, bio)
	mappedPerson.set(person.name, person)

	const event = new Event('person', 'create', [person.name, person.bio])
	events.push(event)
}

export function updatePerson(name: string, bio: string) {
	const person = mappedPerson.get(name)

	if (person) {
		const updatedPerson = new Person(name, bio)
		mappedPerson.set(person.name, updatedPerson)

		const event = new Event('person', 'update', [updatedPerson.name, updatedPerson.bio])
		events.push(event)
	}
}

export function deletePerson(name: string) {
	const person = mappedPerson.get(name)

	if (person) {
		mappedPerson.delete(person.name)

		const event = new Event('person', 'delete', [person.name])
		events.push(event)
	}
}
