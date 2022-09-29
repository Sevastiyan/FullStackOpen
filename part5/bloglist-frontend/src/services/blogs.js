import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = ''

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const postBlog = async (components) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, components, config)
  return response.data
}

const updateBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(blogObject)

  const userId = blogObject.user.id
  delete blogObject.user

  const likedBlog = {
    ...blogObject,
    user: userId,
  }

  const response = await axios.put(
    `${baseUrl}/${likedBlog.id}`,
    likedBlog,
    config
  )
  return response.data
}

const deleteBlog = async (blogToDelete) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blogToDelete.id}`, config)
  return response.data
}

export default { getAll, setToken, postBlog, updateBlog, deleteBlog }
