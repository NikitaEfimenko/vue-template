import { authenticate, restoreSession } from '@/controls'

const session = {
    namespaced: true,
    state: {
        user: {
            login: null,
            roles: []
        },
        token: null
    },
    mutations: {
        setUser: (state, payload) => state.user = payload,
        setToken: (state, payload) => state.token = payload
    },
    getters: {},
    actions: {
        auth: ({ commit }, {login, password}) => {
            return authenticate({ login, password }).then(res => {
                localStorage.setItem('token', res.data.token)
                commit('setToken', res.data.token)
                commit('setUser', res.data.user)
                return res.status
            })
        },
        restoreSession: ({ commit }) => {
            return restoreSession().then(res => {
                const user = res.data.user
                commit('setToken', localStorage.getItem('token'))
                commit('setUser', user)
            })
            
        },
        resetSession: ({ commit }) => {
            localStorage.removeItem('token', null)
            commit('setUser', {
                login: null,
                roles: []
            })
            commit('setToken', {})
        }
    }
}

export default session;