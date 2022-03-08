import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    //state contains user object.
    state: {
        user: {
            //loggedin default false, determine whether user is authenticated.
            loggedIn: false,
            data: null,
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
    },
    // To make changes to state.
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        },
    },
    //Actions commit to mutations
    actions: {
        fetchUser({ commit }, user) {
            commit('SET_LOGGED_IN', user !== null);
            if (user) {
                commit('SET_USER', {
                    displayName: user.displayName,
                    email: user.email,
                });
            } else {
                commit('SET_USER', null);
            }
        },
    },
});
