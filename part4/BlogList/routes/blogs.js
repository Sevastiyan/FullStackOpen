const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        console.log("Blogs info: ", blogs)
        response.json(blogs)
      })
  })
  
router.post('/', (request, response) => {
    console.log("Body: ", request.body)
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  
module.exports = router
