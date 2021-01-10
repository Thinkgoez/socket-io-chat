import { Switch, Route, useHistory } from 'react-router-dom'

import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import UserFormPage from './components/UserForm/UserForm'
import ChatPage from './components/ChatPage/ChatPage'


function App() {
    let history = useHistory()

    const setUsername = (values) => {
        history.push('/chat')
        console.log(values.username);
    }
    const addNewMessage = (values) => {
        console.log(values.message);
    }
    return (
        <Switch>
            <Route exact path='/chat'><ChatPage handleSubmit={addNewMessage} /></Route>
            <Route exact path='/'><UserFormPage handleSubmit={setUsername} /></Route>
            <Route component={NotFoundPage} />

        </Switch>
    )
}

export default App
