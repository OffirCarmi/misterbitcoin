<template>
    <h1>Contacts</h1>
    <ContactFilter @set-filter="onFilter" />
    <ContactList :contacts="contactsToShow" />
</template>

<script>
// import { contactService } from '../services/contact.service.js'
import ContactList from '../components/contacts/ContactList.vue'
import ContactFilter from '../components/contacts/ContactFilter.vue'

export default {
    data() {
        return {
            // contacts: [],
            filterBy: { txt: '' }
        }
    },

    async created() {
        // this.contacts = await contactService.query()
        this.$store.dispatch({ type: 'loadContacts' })

    },
    methods: {
        onFilter(filterBy) {
            this.filterBy = filterBy
        },

    },
    computed: {
        contacts() {
            return this.$store.getters.contacts
        },
        contactsToShow() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.contacts.filter(contact => regex.test(contact.name) || regex.test(contact.phone))
        }
    },

    components: {
        ContactList,
        ContactFilter

    }
}
</script>

<style lang="scss">
</style>