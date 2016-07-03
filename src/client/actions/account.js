import fp from 'lodash/fp'

export default (state, store) => {
    /**
     * @name account
     * @class account
     */
    return class account {

        isLoggedIn() {
            return !!state.account
        }

        find(username) {
            return fp.find(state.users, { username })
        }

        login(params) {
            return this.request('api/account/login', params)
                       .then(result => {
                           state.account = result
                           //window.location.href = '/'
                       })
        }

        logout() {
            return this.request('api/account/logout')
                       .then(() => {
                           state.account._id = null
                           window.location.href = '/'
                       })
        }

        register(params)
        {
            return this.request('api/account/register', params)
                       .then(result => fp.assign(state.account, result))
        }
    }
}

