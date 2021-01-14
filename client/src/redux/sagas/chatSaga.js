import { apply, call, put, take } from 'redux-saga/effects'

import { createLoginChannel, createUserJoinedChannel, createConnectChannel, createNewMessageChannel } from '../channels/chatChannel'
import { logInfo } from '../actions/actionsCreator';
import { socket } from '../../api/socketApi'
import Actions from '../actions/actionTypes'

const numUserPayloadCreate = (numUsers) => {
    return { message: `there are ${numUsers} ${numUsers === 1 ? 'participant' : 'participants'}`, otherType: true }
}

export function* connectSaga() {
    try {
        let channel = yield call(createConnectChannel, socket)
        while (true) {
            const payload = yield take(channel)
            if (payload.type === 'disconnect') {
                channel = yield call(createConnectChannel, socket)
            }
        }
    } catch (err) {
        console.error('socket error:', err)
    }
}
export function* addUserSaga(action) {
    try {
        
        const channel = yield call(createLoginChannel, socket);
        yield apply(socket, socket.emit, ['add user', action.data]) // username from UserForm component
        yield put({ type: Actions.ADD_USER_SUCCESS, data: action.data });

        const data = yield take(channel);
        const payload = numUserPayloadCreate(data.numUsers)
        yield put(logInfo(payload));
    } catch (err) {
        console.error('socket error:', err)
    }
}
export function* userJoinedSaga() {
    try {
        const channel = yield call(createUserJoinedChannel, socket);
        while (true) {
            try {
                const data = yield take(channel)
                const payload = { message: `${data.username} ${data.type}`, otherType: true }
                yield put(logInfo(payload));
                yield put(logInfo(numUserPayloadCreate(data.numUsers)));
            } catch (err) {
                console.error('socket error:', err)
            }

        }
    } catch (err) {
        console.error('socket error:', err)
    }
}
export function* newMessageSaga() {
    try {
        const channel = yield call(createNewMessageChannel, socket);
        while (true) {
            try {
                const payload = yield take(channel)
                yield put({ type: Actions.NEW_MESSAGE, data: payload }); // username, message
            } catch (err) {
                console.error('socket error:', err)
            }
        }
    } catch (err) {
        console.error('socket error:', err)
    }
}
export function* addMessageSaga(action) {
    try {
        yield apply(socket, socket.emit, ['new message', action.data])
        yield put({ type: Actions.ADD_MESSAGE_SUCCESS, data: action.data})
    } catch (err) {
        console.error('socket error:', err)
    }
}

