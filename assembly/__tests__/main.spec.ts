import { Memento, Img, Post, Content } from '../model'
import { createPost, createMemento, init, balanceOf, piecePost } from '../main'
import { u128 } from 'near-sdk-as'

var memento: Memento

describe('Memento ', () => {
  beforeEach(() => {
    const name = 'Hello World'
    const category = 'art'
    const img = new Img()
    const desc = 'Memento test'
    const type = 'personal'
    memento = createMemento(name, category, img, desc, type)

    init('bob')

    for (let i = 0; i < 5; i++) {
      const contentList: Content[] = []
      const mementoId = memento.id
      createPost(contentList, mementoId)
    }
  })
  afterEach(() => {

  })

  it('should create published post', () => {
    const contentList: Content[] = []
    const mementoId = memento.id
    const p = createPost(contentList, mementoId)
    expect(p instanceof Post).toBeTruthy()
  })

  it('should get balance', () => {
    const balance = balanceOf('bob')
    log(balance.toString())
  })

  it('should piecePost', () => {
    const contentList: Content[] = []
    const mementoId = memento.id
    const p = createPost(contentList, mementoId)
    if (p) {
      piecePost(p.id, "10")
    }
  })
})
