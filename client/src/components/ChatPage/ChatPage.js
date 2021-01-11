import { useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Formik } from 'formik'


import classes from './ChatPage.module.css'
import { addNewMessage } from '../../redux/actions/actionsCreator'

function ChatPage({ isLogin, handleSubmit, messages, ...props }) {

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        if (messagesEndRef.current !== null) messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);
    if (!isLogin) return (<Redirect to='/' />)

    return (
        <div className={classes.root}>
            <div className={classes.messageArea}>
                <Messages messages={messages} />
                <div ref={messagesEndRef} />
            </div>
            <InputForm handleSubmit={handleSubmit} />

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

function InputForm({ handleSubmit }) {
    return (
        <div className={classes.inputForm}>
            <Formik
                initialValues={{ message: '' }}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values.message)
                    resetForm({ message: '' })
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
                                onBlur={handleBlur}
                            />
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