<template>
    <section class="contact-edit">
        <h1>Contact Edit</h1>
        <div class="form">
            <form v-if="contact" @submit.prevent="saveContact(contact)">
                <label> Name </label>
                <input v-model="contact.name" type="text" placeholder="Enter name" />
                <label> Email </label>
                <input v-model="contact.email" type="text" placeholder="Enter email" />
                <label> Phone </label>
                <input v-model="contact.phone" type="text" placeholder="Enter phone" />
            </form>
            <hr>
            <div class="actions">
                <button @click="removeContact(contact._id)" class="btn-delete">Delete</button>
                <button @click="saveContact(contact)" class="btn-save">Save</button>
                <button class="btn-back" @click="goBack">Cancel</button>
            </div>
        </div>
    </section>
</template>

<script>
import { contactService } from '../services/contact.service.js'

export default {
    data() {
        return {
            contact: null,
        }
    },

    methods: {
        async saveContact(contact) {
            console.log('saving', contact);
            // console.log('this.contact', this.contact);
            // await contactService.save(this.contact)
            await this.$store.dispatch({ type: 'saveContact', contact })
            // await this.$store.dispatch({ type: 'saveContact', contact: JSON.parse(JSON.stringify(this.contact)) })
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

        goBack() {
            return this.$router.push(`/contacts/${this.contact._id}`)

        }
    },

    async created() {
        const _id = this.$route.params._id
        if (_id) {
            this.contact = await contactService.get(_id)
        } else {
            this.contact = await contactService.getEmptyContact()
        }
    }
}
</script>

<style lang="scss">
</style>