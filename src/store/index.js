import { createStore } from 'vuex'
import car from './modules/car.js'
import contact from './modules/contact.js'
import user from './modules/user.js'

// Create a new store instance.
const storeOptions = {
    strict: true,
    state: {
        count: 10,
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setCount(state, { val }) {
            console.log('val: ', val)
            state.count = val
        },
    },
    getters:{
        count(state) { return state.count }
    },
    modules:{
        car,
        contact,
        user
    }
}
const store = createStore(storeOptions)
export default store