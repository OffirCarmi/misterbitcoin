import { contactService } from '@/services/contact.service.js'

export default {
    state: {
        contacts: [],
    },

    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(contact => contact._id === contactId)
            state.contacts.splice(idx, 1)
        },
        saveContact(state, { contact }) {
            const contactId = contact._id
            const idx = state.contacts.findIndex(contact => contact._id === contactId)
            if (idx === -1) {
                state.contacts.unshift(contact)
            } else {
                state.contacts.splice(idx, 1, contact)
            }
        }
    },
    actions: {
        async loadContacts(context) {
            const contacts = await contactService.query()
            context.commit({ type: 'setContacts', contacts })
        },

        async removeContact({ commit }, { contactId }) {
            try {
                await contactService.remove(contactId)
                commit({ type: 'removeContact', contactId })
            } catch (err) {
                console.log('Cannot remove contact', err)
                throw err
            }
        },

        async saveContact({ commit }, { contact }) {
            try {
                await contactService.save(contact)
                commit({ type: 'saveContact', contact })
            } catch (error) {
                console.log('Cannot save contact', err)
                throw error
            }
        }
    },
    getters: {
        contacts(state) {
            return state.contacts
        },
        contactById(state) {
            return (contactId) => state.contacts.find(({ _id }) => _id === contactId)
        },


    }
}