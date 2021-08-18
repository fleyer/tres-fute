import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import debounce from 'lodash/debounce';

function loadState() {
    try {
        if (typeof window === 'undefined') return

        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

function saveState(state) {
    console.log('save state')
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log(e)
    }
}

function createStore() {
    const store = configureStore({
        reducer: rootReducer, preloadedState: loadState()
    })

    store.subscribe(debounce(() => {
        saveState(store.getState());
    }, 1000));

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers/index').default;
            store.replaceReducer(nextReducer);
        });
    }

    return store
}

export default createStore()