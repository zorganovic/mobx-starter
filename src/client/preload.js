import matchPath from '../../core/helpers/matchPath'
import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
import Logout from '../pages/Logout'

// All your server side prefetching is done here
// When a route is matched, the static function is executed
const routes = [
  {
    pattern: '/',
    execute: Home.onEnter
  },
  {
    pattern: '/page/about',
    execute: About.onEnter
  },
  {
    pattern: '/page/login',
    execute: Login.onEnter
  },
  {
    pattern: '/page/logout',
    execute: Logout.onEnter
  }
]

// Execute server-side async methods to refetch data
export default (stores, url) => {
  for (let i in routes) {
    const route = routes[i]
    const match = matchPath(route.pattern, url)
    if (match) {
      return Promise.resolve(route.execute(stores, match.params))
    }
  }
  return Promise.resolve()
}
