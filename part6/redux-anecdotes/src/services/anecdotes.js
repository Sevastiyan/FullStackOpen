import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const response = await axios.post(baseUrl, {
    content,
    votes: 0,
  })
  return response.data
}

const update = (id, newObject) => {
    console.log("Service update: ", id, newObject);
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

export default { getAll, createAnecdote, update }
