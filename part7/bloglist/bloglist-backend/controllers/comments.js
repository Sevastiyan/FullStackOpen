const router = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

router.post('/:id/comments', async (request, response) => {
  const body = request.body
  
  const { blog: id, comment: content } = body
  logger.info(id)
  logger.info(content)

  const blog = await Blog.findById(id)
  
  const comment = new Comment({
    content: content
  })
  
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  const savedBlog = await blog.save()
  logger.info(savedBlog)

  response.status(201).json(savedComment.toJSON())
})


module.exports = router
