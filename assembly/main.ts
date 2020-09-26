import { PersistentMap } from 'near-sdk-as'
import { _getEvent, _getEventHeight, Event, pushEvent } from './event'

const mappedPerson = new PersistentMap<string, Person>('m::person')

@nearBindgen
class Person {
	name: string
	bio: string

	constructor(name: string, bio: string) {
		this.name = name
		this.bio = bio
	}
}

export function getEvent(index: i32): Event {
	return _getEvent(index)
}

export function getEventHeight(): i32 {
	return _getEventHeight()
}

export function addPerson(name: string, bio: string): Person {
	const person = mappedPerson.get(name)

	assert(!person, 'Person name already exist')
	const newPerson = new Person(name, bio)
	mappedPerson.set(newPerson.name, newPerson)

	pushEvent('person', 'create', [newPerson.name, newPerson.bio])

	return newPerson
}

export function updatePerson(name: string, bio: string): Person | null {
	const person = mappedPerson.get(name)

	if (person) {
		const updatedPerson = new Person(name, bio)
		mappedPerson.set(person.name, updatedPerson)

		pushEvent('person', 'update', [updatedPerson.name, updatedPerson.bio])

		return updatedPerson
	}
	return null
}

export function deletePerson(name: string): void {
	const person = mappedPerson.get(name)

	if (person) {
		mappedPerson.delete(person.name)

		pushEvent('person', 'delete', [person.name])
	}
}
