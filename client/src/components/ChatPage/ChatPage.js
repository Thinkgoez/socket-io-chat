import { Redirect } from 'react-router-dom'
import { Formik } from 'formik'
import { connect } from 'react-redux'

import classes from './ChatPage.module.css'
import { addNewMessage } from '../../redux/actions/actionsCreator'

function ChatPage({ isLogin, handleSubmit, messages, ...props }) {

    if (!isLogin) return (<Redirect to='/' />)
    // console.log(messages);

    return (
        <div className={classes.root}>
            <div className={classes.messageArea}>
                <ul className={classes.messages}>
                    <li className={classes.message}>
                        <span className={classes.username}>name</span>
                        <span className={classes.message}>stogn</span>
                    </li>
                    <li className={classes.log}>log</li>
                </ul>
            </div>
            <InputForm handleSubmit={handleSubmit} />

        </div>
    )
}

function InputForm({ handleSubmit }) {
    return (
        <div className={classes.inputForm}>
            <Formik
                initialValues={{ message: '' }}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values)
                    resetForm({ username: '' })
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
})

export default connect(mapStateToProps, { handleSubmit: addNewMessage })(ChatPage)