import { apply, call, put, take } from 'redux-saga/effects'

import { createLoginChannel, createUserJoinedChannel, createConnectChannel, createNewMessageChannel } from '../channels/chatChannel'
import { logInfo } from '../actions/actionsCreator';
import { socket } from '../../api/socketApi'
import Actions from '../actions/actionTypes'

// const socket = createSocketConnection()
const numUserPayloadCreate = (numUsers) => {
    return { message: `there are ${numUsers} ${numUsers === 1 ? 'participant' : 'participants'}`, otherType: true }
}

export function* connectSaga() {
    // const socket = yield call(createSocketConnection)
    try {
        let channel = yield call(createConnectChannel, socket)
        while (true) {
            const payload = yield take(channel)
            console.log('Connection saga:', payload)
            if (payload.type === 'disconnect') {
                channel = yield call(createConnectChannel, socket)
            }
        }
    } catch (err) {
        console.error('socket error:', err)
    }
}
export function* addUserSaga(action) {
    // const socket = yield call(createSocketConnection)
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
        // const socket = yield call(createSocketConnection)
        const channel = yield call(createUserJoinedChannel, socket);
        while (true) {
            try {
                const data = yield take(channel)
                console.log(data);
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
        // const socket = yield call(createSocketConnection)
        const channel = yield call(createNewMessageChannel, socket);
        while (true) {
            try {
                const payload = yield take(channel)
                console.log('new Message', payload);
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
        // const socket = yield call(createSocketConnection)
        const res = yield apply(socket, socket.emit, ['new message', action.data])
        console.log(res);
        yield put({ type: Actions.ADD_MESSAGE_SUCCESS, data: action.data})
    } catch (err) {
        console.error('socket error:', err)
    }
}

