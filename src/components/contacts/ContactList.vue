<template>
    <section class="contact-list">
        <TransitionGroup name="list">
            <article v-for="contact in contacts" :key="contact._id" class="contact-preview">
                <ContactPreview :contact="contact" />
            </article>
        </TransitionGroup>
        <button @click="addContact"><span>+</span> Add new contact</button>
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

<style>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.6s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(100px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
</style>