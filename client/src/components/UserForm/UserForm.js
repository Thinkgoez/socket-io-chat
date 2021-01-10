import { Formik } from 'formik'
import classes from './UserForm.module.css'

export default function UserForm({ handleSubmit, ...props }) {
    return (
        <div className={classes.root}>
            <h1>Hello, what's is your name?</h1>
            <Formik
                initialValues={{ username: '' }}
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