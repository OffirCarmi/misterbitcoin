import { userService } from '@/services/user.service.js'
import { storageService } from '../../services/storage.service.js'

export default {
    state: {
        loggedinUser: storageService.load('loggedinUser'),
    },

    mutations: {
        signup(state, { user }) {
            state.loggedinUser = user
        },
        logout(state) {
            state.loggedinUser = null
        },
        updateUser(state, { user }) {
            state.loggedinUser = user
            // console.log('state.loggedinUser', state.loggedinUser);
        }
    },

    actions: {
        async signup({ commit }, { credential }) {
            try {
                const user = await userService.signup(credential)
                storageService.save('loggedinUser', user)
                commit({ type: 'signup', user })
            } catch (err) {
                console.log('Signup failed', err)
                throw err
            }
        },

        logout({ commit }) {
            commit({ type: 'logout' })
        },

        async transfer({ commit }, { transfer }) {
            try {
                const user = await userService.doTransfer(transfer)
                storageService.save('loggedinUser', user)
                commit({ type: 'updateUser', user })
            } catch (err) {
                console.log('Transfer failed', err)
                throw err
            }
        },

    },

    getters: {
        loggedinUser(state) {
            return state.loggedinUser
        },

    }
}