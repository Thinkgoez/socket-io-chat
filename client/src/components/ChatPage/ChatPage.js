import { useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import SendIcon from '@material-ui/icons/Send';

import useWindowDimensions from '../../hooks/useWindowDimensions'
import classes from './ChatPage.module.css'
import { addNewMessage } from '../../redux/actions/actionsCreator'

function ChatPage({ isLogin, handleSubmit, messages, ...props }) {
    const { height } = useWindowDimensions();
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        if (messagesEndRef.current !== null) messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages,height]);
    if (!isLogin) return (<Redirect to='/' />)

    const messageAreaHeight = height / 100 * 88 // 100 - %, 88 - custom vh
    const inputFormHeight = height / 100 * 12 // 100 - %, 88 - custom vh
    return (
        <div className={classes.root}>
            <div className={classes.messageArea} style={{ height: messageAreaHeight }}>
                <Messages messages={messages} />
                <div ref={messagesEndRef} style={{ height: '10px' }} />
            </div>
            <InputForm handleSubmit={handleSubmit} height={inputFormHeight} />

        </div>
    )
}

function Messages({ messages, ...props }) {
    return (
        <ul className={classes.messages}>
            {messages.map(
                ({ username = '', isOwn, ...message }, id) => {
                    if (message.otherType) return (<li key={id} className={classes.log}>{message.message}</li>)
                    else return (<li key={id} className={classes.message}>
                        <span className={classes.username + ' ' + (isOwn ? classes.currentUser : '')}>
                            {username + (isOwn ? ' (you)' : '')}:
                    </span>
                        <span className={classes.message}>{message.message}</span>
                    </li>)
                }
            )}
        </ul>
    )
}

function InputForm({ handleSubmit, height }) {
    const inputFocusRef = useRef(null)
    return (
        <div className={classes.inputForm} style={{ height: height }}>
            <Formik
                initialValues={{ message: '' }}
                onSubmit={(values, { resetForm }) => {
                    if (values.message.trim()) {
                        handleSubmit(values.message)
                        resetForm({ message: '' })
                    }
                    inputFocusRef.current.focus()
                }}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={classes.inputWrapper}>
                            <input
                                className={classes.inputField}
                                autoComplete='off'
                                autoFocus
                                placeholder='Type here...'
                                name="message"
                                onChange={handleChange}
                                value={values.message}
                                onBlur={(handleBlur)}
                                ref={inputFocusRef}
                            />
                            <button className={classes.submitButton} type="submit"><SendIcon /></button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isLogin: state.chat.isLogin,
    messages: state.chat.messageHistory,
    currentUserName: state.chat.currentUserName
})

export default connect(mapStateToProps, { handleSubmit: addNewMessage })(ChatPage)