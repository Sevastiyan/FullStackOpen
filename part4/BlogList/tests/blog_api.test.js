const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('./test_helper')
const blogsData = helper.blogsData

let token = ""

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of blogsData) {
        let object = new Blog(blog)
        await object.save()
    }
})

describe('when there are blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('all notes are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(blogsData.length)
    })

    test('there are identifiers for each post', async () => {
        const response = await api.get('/api/blogs')
        for (let obj of response.body) {
            expect(obj.id).toBeDefined()
        }
    })
})

// ------------------------------------------------------
describe('addition of new blogs', () => {
    beforeEach(async () => { 
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
        const response = await api.post('/api/login').send({
            username: user.username,
            password: 'secret'
        })
        token = response.body.token
    })

    test('create a new blogpost', async () => {
        const blogPost = helper.oneBlog
        blogPost.token = token

        await api
            .post('/api/blogs')
            .send(blogPost)
            .expect(201)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(blogsData.length + 1)

        const blogs = response.body.map((item) => {
            return item.title
        })
        expect(blogs).toContain(blogPost.title)
    })

    test('likes have a value at least 0', async () => {
        const blogPost = helper.oneBlog
        blogPost.token = token
        await api
            .post('/api/blogs')
            .send(blogPost)
            .expect(201)

        const response = await api.get('/api/blogs')
        for (let obj of response.body) {
            expect(obj.likes >= 0).toBeTruthy()
        }
    })

    test('if title or url are missing return 400', async () => {
        const blogPost = {
            _id: '5a422aa71b54a676234d17f9',
            author: 'Sevi',
            token: token,
            __v: 0,
        }
        await api.post('/api/blogs').send(blogPost).expect(400)
    })
})

// ------------------------------------------------------
describe('viewing specific blogs', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('fails with 404 if blog does not exist', async () => {
        const validBlogId = await helper.nonExistingId()
        await api.get(`/api/blogs/${validBlogId}`).expect(404)
    })
})

// ------------------------------------------------------
describe('update and delete blogs', () => {
    test('delete success with 204 if id is valid', async () => {
        const passwordHash = await bcrypt.hash('another2', 10)
        const user = new User({ username: 'another', passwordHash })
        await user.save()
        const response = await api.post('/api/login').send({
            username: user.username,
            password: 'another2'
        })
        token = response.body.token


        const oneBlog = helper.oneBlog
        oneBlog.token = token
        const blogToDelete = await api.post('/api/blogs')
            .send(oneBlog).expect(201)
        
        const blogsAtStart = await helper.blogsInDb()
        await api
            .delete(`/api/blogs/${blogToDelete.body.id}`)
            .send({token: token})
            .expect(204)

        const blogsAfterDelete = await helper.blogsInDb()
        expect(blogsAfterDelete).toHaveLength(blogsAtStart.length - 1)

        const contents = blogsAfterDelete.map((blog) => blog.url)
        expect(contents).not.toContain(blogToDelete.url)
    })

    test('update success with 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({
                ...blogToUpdate,
                author: 'Updated Author',
                likes: blogToUpdate.likes + 1,
                token: token
            })
            .expect(200)
        const blogsAfterUpdate = await helper.blogsInDb()
        const updatedBlog = blogsAfterUpdate.filter(
            (element) => element.id === blogToUpdate.id
        )[0]
        expect(updatedBlog.author).toEqual('Updated Author')
        expect(updatedBlog.likes).toEqual(blogToUpdate.likes + 1)
    })
})

// ------------------------------------------------------
describe('user creation', () => { 
    beforeEach(async () => { 
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })
    
    test('creation success with a fresh username', async () => { 
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'someUsername',
            name: 'My Name',
            password: 'aPassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect (usernames).toContain(newUser.username)

    })

    test('fails if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'root',
            name: 'My Name',
            password: 'secret'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('username must be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('fails if username has less than 3 characters', async () => { 
        const newUser = {
            username: 'use',
            name: 'My Name',
            password: 'password'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('username must be at least 3 characters long')
    })

    test('fails if password has less than 3 characters', async () => { 
        const newUser = {
            username: 'username',
            name: 'My Name',
            password: 'pas'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('password must be at least 3 characters long')
    })
})

// ------------------------------------------------------
afterAll(() => {
    mongoose.connection.close()
})
