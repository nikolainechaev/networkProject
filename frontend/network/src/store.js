import { createStore } from 'vuex'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth' // Import signInWithEmailAndPassword
import { firebaseConfig } from '../../../api-key'

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value
    },
    SET_USER(state, data) {
      state.user.data = data
    }
  },
  actions: {
    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        context.commit('SET_USER', response.user)
      } else {
        throw new Error('login failed')
      }
    },
    async fetchUser(context, user) {
      context.commit('SET_LOGGED_IN', user !== null)
      if (user) {
        context.commit('SET_USER', {
          displayName: user.displayName,
          email: user.email
        })
      } else {
        context.commit('SET_USER', null)
      }
    }
  }
})

export default store
