export default {
    namespaced: true,
    state: {
        authUser:{},
        token: '',
        isAuthenticated: false,
    },
    mutations: {
        updateLoginStatus (state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        updateAuthUser (state, authUser) {
            state.authUser = authUser;
        },
        updateToken(state, token) {
          state.token = token
        }
    }
}