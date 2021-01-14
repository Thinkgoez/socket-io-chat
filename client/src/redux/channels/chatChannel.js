import { eventChannel, END } from 'redux-saga'

import { SocketEvents } from '../constants/socketEvents'

export function createLoginChannel(socket) {
    return eventChannel( emitter => {
        const loginHandler = (event) => {
            // console.log(event);
            emitter(event)
        }

        const errorHandler = (errorEvent) => {
            emitter(new Error(errorEvent.reason))
        }

        socket.on(SocketEvents.login, loginHandler)
        socket.on('error', errorHandler)


        const unsubscribe = () => {
            socket.off(SocketEvents.login, loginHandler)
            // emitter(END);
        }

        return unsubscribe
    })
}

export function createUserJoinedChannel(socket) {
    return eventChannel( emitter => {

        const userJoinedHandler = (event) => {
            // console.log(event)
            emitter({...event, type: 'joined'})
        }
        const userLeftHandler = (event) => {
            // console.log(event)
            emitter({...event, type: 'left'})
        }

        const errorHandler = (errorEvent) => {
            emitter(new Error(errorEvent.reason))
        }

        socket.on(SocketEvents.userJoined, userJoinedHandler)
        socket.on(SocketEvents.userLeft, userLeftHandler)
        socket.on('error', errorHandler)

        const unsubscribe = () => {
            socket.off(SocketEvents.userJoined, userJoinedHandler)
            socket.off(SocketEvents.userLeft, userLeftHandler)
            // emitter(END);
        }
        return unsubscribe
    })
}
export function createNewMessageChannel(socket) {
    return eventChannel( emitter => {

        const newMessageHandler = (event) => {
            // console.log('message',event)
            emitter(event)
        }

        const errorHandler = (errorEvent) => {
            emitter(new Error(errorEvent.reason))
        }

        socket.on('new message', newMessageHandler)
        socket.on('error', errorHandler)

        const unsubscribe = () => {
            socket.off(SocketEvents.newMessage, newMessageHandler)
            // emitter(END);
        }
        return unsubscribe
    })
}
export function createConnectChannel(socket) {
    return eventChannel( emitter => {

        const connectHandler = (event) => {
            // console.log(event)
            emitter({type: 'connect'})
        }
        const disconnectHandler = (event) => {
            // console.log(event)
            emitter({type: 'disconnect'})
        }

        const errorHandler = (errorEvent) => {
            emitter(new Error(errorEvent.reason))
        }

        socket.on('connect', connectHandler)
        socket.on('disconnect', disconnectHandler)
        // socket.on('reconnect', connectHandler)
        // socket.on('reconnect_error', connectHandler)
        socket.on('error', errorHandler)

        const unsubscribe = () => {
            socket.off('connect', connectHandler)
            socket.off('disconnect', disconnectHandler)
            emitter(END);
        }
        return unsubscribe
    })
}