const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})

router.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else { 
    response.status(404).end()
  }
})

  
router.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    response.status(400).end()
  }

  const blog = new Blog({
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    title: body.title
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

router.put('/:id', async (request, response) => {
  const body = request.body
  await Blog.findByIdAndUpdate(
    request.params.id,
    {
      author: body.author,
      url: body.url,
      likes: body.likes,
      title: body.title
    },
  )
  response.status(200).end()
})

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
  
module.exports = router
