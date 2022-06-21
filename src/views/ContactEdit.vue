<template>
    <section class="contact-edit">
        <h1>Contact Edit</h1>
        <form v-if="contact" @submit.prevent="save(contact)">
            <label> Name </label>
            <input v-model="contact.name" type="text" placeholder="Enter name" />
            <label> Email </label>
            <input v-model="contact.email" type="text" placeholder="Enter email" />
            <label> Phone </label>
            <input v-model="contact.phone" type="text" placeholder="Enter phone" />
            <button>Save</button>
        </form>
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
        async save(contact) {
            console.log('saving', contact);
            // console.log('this.contact', this.contact);
            // await contactService.save(this.contact)
            await this.$store.dispatch({ type: 'saveContact', contact })
            // await this.$store.dispatch({ type: 'saveContact', contact: JSON.parse(JSON.stringify(this.contact)) })
            this.$router.push('/contacts')
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