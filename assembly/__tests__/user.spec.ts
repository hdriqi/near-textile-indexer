// import { createUser, getUserList, getUserById, getUserByUsername, updateUserById, getPostListByUserFollowing } from '../main'
// import { Img, User, userCollection } from '../model'

// let newUser: User = <User>{}

// describe('User ', () => {
//   beforeEach(() => {
//     const imgAvatar = new Img()
//     imgAvatar.url = 'asdf'
//     imgAvatar.type = 'ipfs'
//     const bio = 'test'
//     const bioRaw = 'test'

//     newUser = createUser(imgAvatar, bio, bioRaw)
//   })
//   afterEach(() => {
//     userCollection.delete('list')
//   })

//   it('should create new user', () => {
//     userCollection.delete('list')
    
//     const imgAvatar = new Img()
//     imgAvatar.url = 'asdf'
//     imgAvatar.type = 'ipfs'
//     const bio = 'test'
//     const bioRaw = 'test'

//     const newUser = createUser(imgAvatar, bio, bioRaw)
//     expect(newUser instanceof User).toBeTruthy()
//     const userList = userCollection.get('list')
//     if(userList) {
//       expect(userList.data.length).toBe(1)
//     }
//   })

//   it('should get all users', () => {
//     const userList = getUserList()
//     expect(userList.length).toBe(1)
//   })

//   it('should get users by id', () => {
//     const userList = getUserList(['id:='.concat(newUser.id)])
//     expect(userList.length).toBe(1)
//   })

//   it('should get users by username', () => {
//     const userList = getUserList(['username:=bo'])
//     expect(userList.length).toBe(0)
//   })

//   it('should get users by username_like', () => {
//     const userList = getUserList(['username_like:=bo'])
//     expect(userList.length).toBe(1)
//   })

//   it('should get user by id', () => {
//     const user = getUserById(newUser.id)
//     if(user) expect(user.id).toBe(newUser.id)
//   })

//   it('should get user by username', () => {
//     const user = getUserByUsername(newUser.username)
//     if(user) expect(user.username).toBe(newUser.username)
//   })

//   it('should update user', () => {
//     const newImgAvatar = new Img()
//     newImgAvatar.url = 'new avatar'
//     newImgAvatar.type = 'ipfs'
//     const newBio = 'new bio'
//     const newBioRaw = 'new bio'
//     const nUser = updateUserById(newUser.id, newImgAvatar, newBio, newBioRaw)
//     if(nUser) {
//       expect(nUser.imgAvatar.url).toBe(newImgAvatar.url)
//       expect(nUser.bio).toBe(newBio)
//       expect(nUser.bioRaw).toBe(newBioRaw)
//     }
//   })

//   it('should get postlist by user following', () => {
//     const postList = getPostListByUserFollowing('bob')
//     expect(postList.length).toBe(0)
//   })
// })
