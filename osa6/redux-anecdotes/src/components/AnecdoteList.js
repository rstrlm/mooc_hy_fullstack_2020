import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { clear } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdote}) => {
        if(!filter) {
            return anecdote.sort((a,b) => b.votes - a.votes)
        } else {
            const filteredAnec = anecdote.filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
            return filteredAnec.sort((a,b) => b.votes - a.votes)
        }
       
    })
  

    const handleClick = (anecdote) => {
        dispatch(vote(anecdote))
        setTimeout(() => {
            dispatch(clear())
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleClick(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList