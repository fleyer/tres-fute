import './style';
import App from './components/app';

import store from './app/store'

export default () => (
    <App store={store}></App>
)
