const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const helper = require('./test_helper')
const blogsData = helper.blogsData

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
    test('create a new blogpost', async () => {
        const blogPost = helper.oneBlog
        await api.post('/api/blogs').send(blogPost).expect(201)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(blogsData.length + 1)

        const blogs = response.body.map((item) => {
            return item.title
        })
        expect(blogs).toContain(blogPost.title)
    })

    test('likes have a value at least 0', async () => {
        const blogPost = helper.oneBlog
        await api.post('/api/blogs').send(blogPost).expect(201)

        const response = await api.get('/api/blogs')
        for (let obj of response.body) {
            expect(obj.likes >= 0).toBeTruthy()
        }
    })

    test('if title or url are missing return 400', async () => {
        const blogPost = {
            _id: '5a422aa71b54a676234d17f9',
            author: 'Sevi',
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
        console.log(validBlogId)

        await api.get(`/api/blogs/${validBlogId}`).expect(404)
    })
})

// ------------------------------------------------------
describe('deleting notes', () => {
    test('success with 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

        const blogsAfterDelete = await helper.blogsInDb()
        expect(blogsAfterDelete).toHaveLength(blogsAtStart.length - 1)

        const contents = blogsAfterDelete.map((blog) => blog.url)
        expect(contents).not.toContain(blogToDelete.url)
    })
})

describe('update specific blogs', () => {
    test('success with 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({
                ...blogToUpdate,
                author: 'Updated Author',
                likes: blogToUpdate.likes + 1,
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
afterAll(() => {
    mongoose.connection.close()
})
