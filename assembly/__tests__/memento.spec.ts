import { createMemento, updateMemento } from '../main'
import { Memento, mementoCollection, Img } from '../model'

describe('Memento ', () => {
  afterEach( () => {
    mementoCollection.delete('list')
  })

  it('should create memento', () => {
    const name = 'Hello World'
    const category = 'tech'
    const img: Img = {
      url: 'test',
      type: 'ipfs'
    }
    const desc = 'Memento test'
    const type = 'public'
    const m = createMemento(name, category, img, desc, type)

    const newM = mementoCollection.getSome(m.id)
    expect(m.id).toBe(newM.id)
  })

  it('should update memento', () => {
    const name = 'Hello World'
    const category = 'tech'
    const img: Img = {
      url: 'test',
      type: 'ipfs'
    }
    const desc = 'Memento test'
    const type = 'public'
    const m = createMemento(name, category, img, desc, type)

    const newDesc = 'Hello world'
    updateMemento(m.id, m.img, newDesc)

    const newM = mementoCollection.get(m.id)
    if(newM) {
      expect(newM.desc).toBe(newDesc)  
    }
  })

  // itThrows('should throw error Memento type', () => {
  //   const name = 'Hello World'
  //   const desc = 'Memento test'
  //   const descRaw = 'Memento test raw'
  //   const type = 'random'
  //   createMemento(name, desc, descRaw, type)
  // })

  // it('should get all memento list', () => {
  //   const len = 10
  //   for (let i = 0; i < len; i++) {
  //     const name = 'Hello World'
  //     const desc = 'Memento test'
  //     const descRaw = 'Memento test raw'
  //     const type = 'public'
  //     createMemento(name, desc, descRaw, type)
  //   }
  //   const result = getMementoList()
  //   expect(result.length).toBe(len)
  // })

  // it('should get memento list by name', () => {
  //   for (let i = 0; i < 3; i++) {
  //     const name = 'Hello World'
  //     const desc = 'Memento test'
  //     const descRaw = 'Memento test raw'
  //     const type = 'public'
  //     createMemento(name, desc, descRaw, type)
  //   }
  //   for (let i = 0; i < 5; i++) {
  //     const name = 'Another World'
  //     const desc = 'Memento test'
  //     const descRaw = 'Memento test raw'
  //     const type = 'public'
  //     createMemento(name, desc, descRaw, type)
  //   }
  //   const result = getMementoList(['name:=Hello World'])
  //   expect(result.length).toBe(3)
  // })

  // it('should get memento list by name like', () => {
  //   for (let i = 0; i < 3; i++) {
  //     const name = 'Hello World'
  //     const desc = 'Memento test'
  //     const descRaw = 'Memento test raw'
  //     const type = 'public'
  //     createMemento(name, desc, descRaw, type)
  //   }
  //   for (let i = 0; i < 3; i++) {
  //     const name = 'Another World'
  //     const desc = 'Memento test'
  //     const descRaw = 'Memento test raw'
  //     const type = 'public'
  //     createMemento(name, desc, descRaw, type)
  //   }
  //   const result = getMementoList(['name_like:=worl'])
  //   expect(result.length).toBe(6)
  // })

  // it('should get memento list by owner', () => {
  //   for (let i = 0; i < 3; i++) {
  //     const name = 'Hello World'
  //     const desc = 'Memento test'
  //     const descRaw = 'Memento test raw'
  //     const type = 'public'
  //     createMemento(name, desc, descRaw, type)
  //   }
  //   const result = getMementoList(['owner:='.concat(context.sender)])
  //   expect(result.length).toBe(3)
  // })

  // it('should get memento list with sort by desc', () => {
  //   for (let i = 0; i < 3; i++) {
  //     const name = 'Hello World'
  //     const desc = 'Memento test'
  //     const descRaw = 'Memento test raw'
  //     const type = 'public'
  //     createMemento(name, desc, descRaw, type)
  //   }
  //   const result = getMementoList([], {
  //     _embed: true,
  //     _order: 'createdAt',
  //     _sort: 'desc',
  //     _limit: 10
  //   })
  //   expect(result[0].createdAt).toBeGreaterThanOrEqual(result[1].createdAt)
  // })

  // it('should get memento list with limit', () => {
  //   for (let i = 0; i < 10; i++) {
  //     const name = 'Hello World'
  //     const desc = 'Memento test'
  //     const descRaw = 'Memento test raw'
  //     const type = 'public'
  //     createMemento(name, desc, descRaw, type)
  //   }
  //   const result = getMementoList([], {
  //     _embed: true,
  //     _order: 'createdAt',
  //     _sort: 'desc',
  //     _limit: 3
  //   })
  //   expect(result.length).toBe(3)
  // })

  // it('should get memento by id', () => {
  //   const name = 'Hello World'
  //   const desc = 'Memento test'
  //   const descRaw = 'Memento test raw'
  //   const type = 'public'
  //   const m = createMemento(name, desc, descRaw, type)
  //   const result = getMementoById(m.id)
  //   if(result) {
  //     expect(result.name).toBe(m.name)
  //   }
  //   else {
  //     expect(result).toBe(null)
  //   }
  // })

  // it('should delete memento by id', () => {
  //   const name = 'Hello World'
  //   const desc = 'Memento test'
  //   const descRaw = 'Memento test raw'
  //   const type = 'public'
  //   createMemento(name, desc, descRaw, type)

  //   const list = mementoCollection.get('list')
  //   if(list) {
  //     const id = list.data[0].id
  //     deleteMementoById(id)
  //     const mementoList = getMementoList()
  //     expect(mementoList.length).toBe(0)
  //   }
  // })
})
