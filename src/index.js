import ReactDOM from 'react-dom'
import App from './App'
import './assets/styles/index.scss'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root')
)
