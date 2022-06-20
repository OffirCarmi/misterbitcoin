<template>
    <h1>Contact Details</h1>
    <section v-if="contact" class="contact-details">
        <button @click="goBack">Back</button>
        <h2>{{ contact.name }}</h2>
        <h3>{{ contact.phone }}</h3>
        <h3>{{ contact.email }}</h3>
        <aside class="actions">
            <button @click="editContact(contact._id)">Edit</button>
            <button @click="removeContact(contact._id)">Remove</button>
        </aside>
    </section>
    <p v-else>Loading...</p>
</template>

<script>
import { contactService } from '@/services/contact.service.js'

export default {
    data() {
        return {
            contact: null,
        }
    },
    methods: {
        goBack() {
            this.$router.push('/contacts')
        },

        async removeContact(contactId) {
            //     await contactService.remove(contactId)
            await this.$store.dispatch({ type: 'removeContact', contactId })
            this.$router.push('/contacts')

            // eventBus.emit('user-msg', {
            //     txt: `Car ${carId} Deleted`,
            //     type: 'success',
            //     timeout: 4500,
            // })
        },

        editContact(contactId) {
            this.$router.push(`/contacts/edit/${contactId}`)
        },
    },
    async created() {
        const _id = this.$route.params._id
        this.contact = await contactService.get(_id)
    }
}
</script>

<style lang="scss">
</style>