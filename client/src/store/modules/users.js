import Vue from 'vue'
import { fetchUsers, fetchDepartaments } from '@/controls'

const users = {
    namespaced: true,
    state: {
        users: [],
        departaments: []
    },
    mutations: {
        setUsers: (state, items) => Vue.set(state, 'users', [...items]),
        setDepartaments: (state, items) => Vue.set(state, 'departaments', [...items])
    },
    getters: {},
    actions: {
        downloadUsers: ({ commit }) => fetchUsers().then(res => {
            commit('setUsers', res.data.users)
        }),
        downloadDepartaments: ({ commit }) => fetchDepartaments().then(res => {
            commit('setDepartaments', res.data.departaments)
        }),
    }
}

export default users;