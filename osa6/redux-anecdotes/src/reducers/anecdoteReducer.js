import blogService from '../services/anectodes'

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecToVote = state.find(a => a.id === id)
      const votedAnec = {
        ...anecToVote,
        votes: anecToVote.votes+1
      } 
      
    return state.map(a => a.id !== id ? a : votedAnec)
    case 'NEW':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default: return state 
  }
}
export const initialize = () => {
  return async dispatch => {
  const blogs = await blogService.getAll()
  dispatch({
    type: 'INIT',
    data: blogs
  })
  }
}

export const createAnec = (content) => {
  return async dispatch => {
    const newBlog = await blogService.createNew(content)
    dispatch({
    type: 'NEW',
    data: newBlog
    })
  }
}

export const vote = (data) => {
  return async dispatch => {
    const voted = await blogService.voteAnec(data)
    dispatch({
        type: 'VOTE',
        data: voted
    })
  }
}

export default anecdoteReducer