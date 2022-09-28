import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = ''

const setToken = newToken => { 
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async (components) => { 
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, components, config)
  return response.data
}

export default { getAll, setToken, postBlog }
