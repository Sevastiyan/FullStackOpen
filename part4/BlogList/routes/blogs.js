const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const {tokenExtractor, userExtractor} = require('../utils/middleware')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(blogs)
})

router.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', {
      name: 1,
      username: 1,
    })
  if (blog) {
    response.json(blog)
  } else { 
    response.status(404).end()
  }
})

  
router.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    response.status(400).end()
  }

  const user = await User.findById(request.user.id)
  console.log('🚀 ~ router.post ~ user', user);

  const blog = new Blog({
    author: user.name,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    title: body.title,
    user: request.user.id,
  })

  const savedBlog = await blog.save()
  console.log('🚀 ~ old User Blogs', user.blogs);
  user.blogs = user.blogs.concat(savedBlog._id)
  console.log('🚀 ~ old User Blogs', user.blogs);
  await user.save()

  response.status(201).json(savedBlog)
})

router.put('/:id', tokenExtractor, userExtractor, async (request, response) => {
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

//Extra ------------------------------------------------
router.delete('/all', async (request, response) => { 
  await Blog.deleteMany({})
  response.status(204).end()
})

router.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  console.log(blog);

  if (blog.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    // console.log('Match');
    response.status(204).end()
  } else { 
    response.status(401).json({
      error: 'Invalid User on Blog'
    })
  }
})


  
module.exports = router
