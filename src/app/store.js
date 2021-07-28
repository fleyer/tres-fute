import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

function createStore(){
    const store = configureStore({
        reducer: rootReducer
    })

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers/index').default;
            store.replaceReducer(nextReducer);
        });
    }

    return store
} 

export default createStore()