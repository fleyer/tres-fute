import { render } from 'preact'
import './style/index.css'
import App from './components/app'
import store from './app/store'

render(<App store={store} />, document.getElementById('app-root'))
