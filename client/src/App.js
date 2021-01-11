import { Switch, Route } from 'react-router-dom'

import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import UserFormPage from './components/UserForm/UserForm'
import ChatPage from './components/ChatPage/ChatPage'

function App(props) {
    return (
        <Switch>
            <Route exact path='/chat'><ChatPage /></Route>
            <Route exact path='/'><UserFormPage /></Route>
            <Route component={NotFoundPage} />

        </Switch>
    )
}

export default App
