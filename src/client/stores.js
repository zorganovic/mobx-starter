import Common from '../stores/common'
import Todos from '../stores/todos'
import Account from '../stores/account'

// All our actions are listed here
export const stores = (state = {}) => {
  return {
    common: new Common(state.common),
    todos: new Todos(state.todos),
    account: new Account(state.account)
  }
}

// Initialize actions and state
export default process.env.BROWSER ? stores(window.__STATE) : {}
