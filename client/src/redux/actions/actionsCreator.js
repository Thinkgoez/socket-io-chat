import Actions from './actionTypes'

export const logInfo = (data) => ({ type: Actions.LOG_MESSAGE, data })
export const setUsername = () => ({ type: Actions.SET_USERNAME_ACTION })
export const addNewMessage = () => ({ type: Actions.ADD_NEW_MESSAGE_ACTION })