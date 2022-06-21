<template>
    <div class="contact-app">
        <h1>Contacts</h1>
        <ContactFilter @set-filter="onFilter" />
        <ContactList :contacts="contactsToShow" />
    </div>
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
        if (!this.user) this.$router.push('/')
        // this.contacts = await contactService.query()
        this.$store.dispatch({ type: 'loadContacts' })
    },

    methods: {
        onFilter(filterBy) {
            this.filterBy = filterBy
        },

    },
    computed: {
        user() {
            return this.$store.getters.loggedinUser
        },
        contacts() {
            return this.$store.getters.contacts
        },
        contactsToShow() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            // const regexPhone = /^[\+][0-9]{1,3}?[-\s\.][(]?[0-9]{2}[)][-\s\.]?[0-9]{4}[-][0-9]{3}$/g
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