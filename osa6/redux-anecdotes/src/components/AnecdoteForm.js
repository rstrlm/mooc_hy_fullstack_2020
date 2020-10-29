import React from 'react'
import {  connect } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
    // const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnec(content)
        props.setNotification(`new anecdote '${content}'`, 5)
    }
    return (
        <div>
        <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        createAnec : (value) => {
            dispatch(createAnec(value))
        },
        setNotification : (value, time) => {
            dispatch(setNotification(value, time))
        }
    }
}
// export default NewAnecdote
export default connect(null, mapDispatchToProps)(NewAnecdote)