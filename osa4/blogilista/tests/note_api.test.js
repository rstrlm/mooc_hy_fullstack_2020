const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Blog = require('../models/blog')


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      //const passwordHash = await bcrypt.hash('salasana', 10)
      const user = new User(helper.initialUser)

      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'test',
        name: 'Test Person',
        password: 'salasana',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
    test('creation with same user name fails', async () => {
  
        const newUser = {
          username: 'root',
          password: 'salasana',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    

    })
    test('login returns token', async () => {
        const user = {
            username: 'root',
            password: 'salasana',
          }
        const response = await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.token).toBeDefined()
        })
  })
describe('when there is some blogs in database', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        console.log('cleared')

        const blogObjects = helper.initialBlogs
            .map(note => new Blog(note))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)

    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('there are five blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    describe('when adding blogs', () => {
        test('if one is added, the list grows', async () => {
            const user = {
                username: 'root',
                password: 'salasana',
              }  
            const response = await api
                .post('/api/login')
                .send(user)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            const token = `bearer ${response.body.token}`

            const newBlog = {
                author: "Some Random Dude",
                title: "Just Added One",
                url: "https://thisdoesntwork.com/",
                likes: 17,
            }


            await api
                .post('/api/blogs')
                .set('Authorization', token)
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

            expect(blogsAtEnd[blogsAtEnd.length - 1]).toMatchObject(newBlog)
        })

        test('if no likes on blog, default is 0', async () => {
            const user = {
                username: 'root',
                password: 'salasana',
              }  
            const response = await api
                .post('/api/login')
                .send(user)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            const token = `bearer ${response.body.token}`

            const newBlog = {
                author: "Some Random Dude",
                title: "Just Added Second One",
                url: "https://thisstilldoesntwork.com/",
            }
            

            await api
                .post('/api/blogs')
                .set('Authorization', token)
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            const index = blogsAtEnd.findIndex(x => x.title === newBlog.title)
            expect(blogsAtEnd[index].likes).toBeDefined()
            expect(blogsAtEnd[index].likes).toBe(0)

        })

        test('if no title or url', async () => {
            const user = {
                username: 'root',
                password: 'salasana',
              }  
            const response = await api
                .post('/api/login')
                .send(user)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            const token = `bearer ${response.body.token}`

            const noUrl = {
                title: "Just Added Second One",
                author: "Some Random Dude",
            }

            const noTitle = {
                author: "Some Random Dude",
                url: "https://thisstilldoesntwork.com/",
            }

            await api
                .post('/api/blogs')
                .set('Authorization', token)
                .send(noUrl)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            await api
                .post('/api/blogs')
                .set('Authorization', token)
                .send(noTitle)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
    })
    describe('viewing a specific blog', () => {
        test('id field is defined as id', async () => {
            const response = await api
                .get(`/api/blogs`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body[0].id).toBeDefined();
        })
        test('succeeds with a valid id', async () => {
            const blogsAtStart = await helper.blogsInDb()

            const blog = blogsAtStart[1]

            const resultBlog = await api
                .get(`/api/blogs/${blog.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(resultBlog.body).toEqual(blog)
        })
        test('fails with statuscode 404 if blog removed', async () => {
            const removedID = await helper.nonExistingId()
      
            console.log(removedID)
      
            await api
              .get(`/api/notes/${removedID}`)
              .expect(404)
          })
              test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
    })
    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
          const blogsAtStart = await helper.blogsInDb()
          const blogToDelete = blogsAtStart[0]

          const user = {
            username: 'root',
            password: 'salasana',
          }  
        const response = await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const token = `bearer ${response.body.token}`
    
          await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', token)
            .expect(204)
    
          const blogsAtEnd = await helper.blogsInDb()
    
          expect(blogsAtEnd.length).toBe(
            helper.initialBlogs.length - 1
          )
    
          const contents = blogsAtEnd.map(b => b.url)
    
          expect(contents).not.toContain(blogToDelete.url)
        })
        test('fails with status code 401 with out token', async () => {
          const blogsAtStart = await helper.blogsInDb()
          const blogToDelete = blogsAtStart[0]
   
          await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        })
      })
})

afterAll(() => {
    mongoose.connection.close()
})
