import { Formik } from 'formik'
import classes from './ChatPage.module.css'

export default function ChatPage({ handleSubmit, ...props }) {

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