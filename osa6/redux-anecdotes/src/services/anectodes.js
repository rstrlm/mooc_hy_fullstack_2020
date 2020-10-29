import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async ( content, votes ) => {
    votes = !votes ? 0 : votes 
    const object = { content, votes }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const voteAnec = async (data) => {
    const voted = { ...data, votes: data.votes+1}
    const response = await axios.put(`${baseUrl}/${data.id}`, voted)
    return response.data
}
 
export default { getAll, createNew, voteAnec }