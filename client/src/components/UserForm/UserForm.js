import { Formik } from 'formik'
import { connect } from 'react-redux'

import classes from './UserForm.module.css'
import { setUsername } from '../../redux/actions/actionsCreator'
// import { Redirect } from 'react-router-dom'
import ChatPage from '../ChatPage/ChatPage'

function UserForm({ handleSubmit, isLogin, ...props }) {
    if (isLogin) return (<ChatPage />)
    return (
        <div className={classes.root}>
            <h1>Hello, what's is your name?</h1>
            <Formik
                initialValues={{ username: '' }}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values.username)
                    // resetForm({ username: '' })
                }}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={classes.inputField}>
                            <input
                                autoComplete='off'
                                autoFocus
                                name="username"
                                onChange={handleChange}
                                value={values.username}
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
})

export default connect(mapStateToProps, { handleSubmit: setUsername })(UserForm)