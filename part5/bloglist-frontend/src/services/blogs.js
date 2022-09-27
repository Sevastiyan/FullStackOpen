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

export default { getAll, setToken }