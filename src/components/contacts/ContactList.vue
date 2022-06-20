<template>
    <section class="contact-list">
        <TransitionGroup name="list">
            <button @click="addContact">Add new contact</button>
            <article v-for="contact in contacts" :key="contact._id" class="contact-preview">
                <ContactPreview :contact="contact" />
            </article>
        </TransitionGroup>
    </section>
</template>

<script>
import ContactPreview from '../contacts/ContactPreview.vue'

export default {
    props: {
        contacts: {
            type: Array,
            required: true,
            // default: []  <-- default value for props
        }
    },
    methods: {
        showDetails(id) {
            this.$router.push(`/contacts/${id}`)
        },
        addContact() {
            this.$router.push('/contacts/edit/')
        },
    },
    components: {
        ContactPreview
    }
}
</script>

<style lang="scss">
</style>