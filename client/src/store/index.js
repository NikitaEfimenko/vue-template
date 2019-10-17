import Vue from 'vue'
import Vuex from 'vuex'

import session from './modules/session'
import users from './modules/users'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    modules: {
        session,
        users
    }
})
console.log(store)

export default store