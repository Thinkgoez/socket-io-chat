import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { sagaWatcher } from './sagas/rootSaga'
import chatReducer from './reducers/chatReducer'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    chat: chatReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(sagaWatcher)

export default store