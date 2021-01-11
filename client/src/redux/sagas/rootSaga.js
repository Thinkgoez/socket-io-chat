import { takeEvery, takeLatest, fork } from 'redux-saga/effects'

import Actions from '../actions/actionTypes'
import { addUserSaga, userJoinedSaga, addMessageSaga, newMessageSaga, connectSaga } from './chatSaga'

export function* sagaWatcher() {
    yield fork(connectSaga)
    yield fork(userJoinedSaga)
    yield fork(newMessageSaga)
    yield takeLatest(Actions.SET_USERNAME_ACTION, addUserSaga)
    yield takeEvery(Actions.ADD_NEW_MESSAGE_ACTION, addMessageSaga)
}