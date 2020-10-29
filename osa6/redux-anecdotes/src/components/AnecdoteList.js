import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anectode = ({ anecdote, handleClick }) => {

    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleClick(anecdote)}>vote</button>
            </div>
        </div>
    )
}


const AnecdoteList = (props) => {
    // const dispatch = useDispatch()
    // const anecdotes = useSelector(({filter, anecdote}) => {
    //     if(!filter) {
    //         return anecdote.sort((a,b) => b.votes - a.votes)
    //     } else {
    //         const filteredAnec = anecdote.filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    //         return filteredAnec.sort((a,b) => b.votes - a.votes)
    //     }
    // })


    const handleClick = (anecdote) => {
        props.vote(anecdote)
        props.setNotification(`you voted '${anecdote.content}'`, 5)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <Anectode
                    key={anecdote.id === undefined ? 1 : anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => handleClick(anecdote)}
                />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    if (!state.filter) {
        const sortedAnec = state.anecdote.sort((a, b) => b.votes - a.votes)
        return { anecdotes : sortedAnec }
    } else {
        const filteredAnec = state.anecdote.filter(a => a.content.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1)
        const sortFilteredAnec = filteredAnec.sort((a, b) => b.votes - a.votes)
        return {
            anecdotes : sortFilteredAnec
        }
    }
}

const mapDispatchToProps = {
    setNotification, vote
}

// export default AnecdoteList
const connectedAnectodes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default connectedAnectodes