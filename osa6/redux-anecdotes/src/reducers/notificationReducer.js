const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'VOTE':
            return state = `You voted '${action.data.data.content}'`
        case 'NEW':
            return state = `You added anecdote '${action.data.content}'`
        case 'CLEAR':
            return state = null
        default:
            return state
    }
}

export const notify = (msg) => {
    return {
        type: 'NOTIFY',
        data: {msg}
    }
}

export const clear = () => {
    return {
        type: 'CLEAR'
    }
}

export default notificationReducer

