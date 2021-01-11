import Actions from '../actions/actionTypes'
// import mTypes from '../constants/messageType'

const initialState = {
    messageHistory: [
        {message: "Welcome to Socket.IO Chat – ", prepend: true },
    ],
    isLogin: false,
}

export default function chatReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.ADD_USER_SUCCESS:
            return { ...state, isLogin: true }
        case Actions.LOG_MESSAGE:
            console.log('LOG_MESSAGE action.data:',action.data);
            return { ...state, messageHistory: [...state.messageHistory, action.data] }
        case Actions.NEW_MESSAGE:
            console.log('NEW_MESSAGE action.data:',action.data);
            return { ...state, messageHistory: [...state.messageHistory, action.data]}
        default:
            return state
    }
}