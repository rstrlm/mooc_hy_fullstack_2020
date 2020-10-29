var timeoutId
const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'NOTIFY':
            return state = `${action.data}`
        case 'CLEAR':
            return state = null
        default:
            return state
    }
}

export const setNotification = (msg, time) => {
    return async dispatch => {
        clearTimeout(timeoutId)
        const timer = time === isNaN(time) || null ? 5000 : (time*1000) 
        timeoutId = setTimeout(() => {
            console.log(timer);
            dispatch(clearNotification())
    }, timer)
    dispatch ({
        type: 'NOTIFY',
        data: msg
    })
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR'
    }
}

export default notificationReducer

