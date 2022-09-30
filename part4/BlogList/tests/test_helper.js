const Blog = require('../models/blog')
const User = require('../models/user')

const blogsData = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0,
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0,
    },
]

const blogsInDb = async () => { 
    // const initialBlogs = new Blog({
    //     author: body.author,
    //     url: body.url,
    //     likes: body.likes,
    //     title: body.title
    // })

    const initialBlogs = await Blog.find({})
    return initialBlogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => { 
    const blog = new Blog({ title: "Something", url: "anothersomething", author: "Something" })
    await blog.save() 
    await blog.remove() 

    return blog._id.toString()
}

const oneBlog = {
        title: "A title",
        author: "Sevi",
        url: "http://blog.sevi.com/Sevi.html",
        // likes: 0,
}

const usersInDb = async () => { 
    const initialUsers = await User.find({})
    return initialUsers.map(user => user.toJSON())
}


module.exports = {
    blogsData,
    oneBlog,
    blogsInDb,
    usersInDb,
    nonExistingId
}
