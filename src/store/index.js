import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    data: {},
        isLoading: false,
        isLoggedIn: localStorage.getItem("x-access-token") ? true : false,
        jwtToken: localStorage.getItem("x-access-token"),
        errors: [],
  },
  getters: {
    isLoading: state => state.isLoading,
    isLoggedIn: state => state.isLoggedIn,
    errors: state => state.errors,
    currentUser: state => state.data,
    jwtToken: state => state.jwtToken
},
  actions: {
    async trySignIn(context, credentials) {
      try {
          context.commit("updateIsLoading", true)
          const response = await axios.post(
            'http://localhost:3000/api/auth', credentials
            )
          context.commit("signInSuccess", response.data)
      } catch (err) {
          console.log('trySygnIn catch', err)
          context.commit("signError", err)
      }
    },
    async trySignUp(context, credentials) {
      try {
        context.commit("updateIsLoading", true)
        const response = await axios.post(
          'http://localhost:3000/api/register', credentials
        )
        context.commit("signUpSuccess", response.data)
      } catch (err) {
        console.log('try sign up', err)
        context.commit("signError", err)
      }
    }
  },
  mutations: {
    updateIsLoading(state, isLoading) {
        state.isLoading = isLoading
    },
    signUpSuccess(state) {
        state.isLoading = false
        state.errors = []
        state.isLoggedIn = true;
    },
    signError(state, errors) {
        state.isLoading = false
        state.errors = errors.response.data
        state.isLoggedIn = false;
        state.data = errors.response.user;
        state.jwtToken = errors.response.jwtToken;
        localStorage.removeItem("x-access-token");
    },
    signInSuccess(state, data) {
        state.isLoading = false;
        state.errors = [];
        state.isLoggedIn = true;
        state.data = data.user;
        state.jwtToken = data.jwtToken;
        localStorage.setItem("x-access-token", data.jwtToken);
    },
    signOut(state) {
        state.jwtToken = null
        state.data = null
        state.isLoggedIn = false
        localStorage.removeItem("x-access-token")
    },
    fetchCurrentUserSuccess(state, user) {
        state.data = user
        state.isLoading = false
        state.isLoggedIn = true
        state.errors = []
    }
  } 
})
