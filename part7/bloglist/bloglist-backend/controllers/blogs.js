const router = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const logger = require('../utils/logger')

router.get('/', async (request, response) => {
  const notes = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })

  response.json(notes)
})

router.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user
  const blog = new Blog({
    ...request.body,
    user: user,
    likes: request.body.likes ? request.body.likes : 0,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)

  if (!blogToDelete) {
    return response.status(204).end()
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
    console.log('No access to Blog', blogToDelete.user)
    return response.status(401).json({
      error: 'only the creator can delete a blog',
    })
  }

  if (blogToDelete.comments) {
    blogToDelete.comments.forEach(async (element) => {
      await Comment.findByIdAndRemove(element._id)
    })
  }

  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const body = request.body

  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }
  
  logger.info('Blog to update', blog)
  
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  .populate('user', { username: 1, name: 1 })
  .populate('comments', { content: 1 })
  
  logger.info('Updated Blog', updatedBlog)
  response.json(updatedBlog)
})

module.exports = router
