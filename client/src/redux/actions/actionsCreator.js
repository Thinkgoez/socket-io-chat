import Actions from './actionTypes'

export const logInfo = (data) => ({ type: Actions.LOG_MESSAGE, data })
export const setUsername = (data) => ({ type: Actions.SET_USERNAME_ACTION, data })
export const addNewMessage = (data) => ({ type: Actions.ADD_NEW_MESSAGE_ACTION, data })