import Actions from '../actions/actionTypes'
// import mTypes from '../constants/messageType'

const initialState = {
    currentUserName: '',
    messageHistory: [
        { message: "Welcome to Socket.IO Chat – ", otherType: true },
    ],
    isLogin: false,
}

export default function chatReducer(state = initialState, action) {
    switch (action.type) {
        case Actions.ADD_USER_SUCCESS:
            return { ...state, isLogin: true, currentUserName: action.data }
        case Actions.ADD_MESSAGE_SUCCESS:
            return {
                ...state,
                messageHistory: [
                    ...state.messageHistory,
                    { message: action.data, username: state.currentUserName, isOwn: true }
                ]
            }
        case Actions.LOG_MESSAGE:
            console.log('LOG_MESSAGE action.data:', action.data);
            return { ...state, messageHistory: [...state.messageHistory, action.data] }
        case Actions.NEW_MESSAGE:
            console.log('NEW_MESSAGE action.data:', action.data);
            return { ...state, messageHistory: [...state.messageHistory, action.data] }
        default:
            return state
    }
}