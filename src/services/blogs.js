import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const config = {
  headers: { Authorization: token },
}


const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateLikes = async (blog) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/likes`, blog, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAll, create, setToken, updateLikes, deleteBlog }
