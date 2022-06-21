<template>
    <section class="contact-details">
        <h1>Contact Details</h1>
        <div v-if="contact" class="contact-data">
            <button class="btn-back" @click="goBack">Back</button>
            <hr>
            <h2>{{ contact.name }}</h2>
            <h3>{{ contact.phone }}</h3>
            <h3 class="last">{{ contact.email }}</h3>
            <hr>
            <aside class="actions">
                <button class="btn-edit" @click="editContact(contact._id)">Edit</button>
                <button class="btn-remove" @click="removeContact(contact._id)">Remove</button>
            </aside>
            <hr>
            <div class="transfers">
                <h3>Transfer coins to {{ contact.name }}</h3>
                <form @submit.prevent="onTransfer()">
                    <input v-model="amount" type="number" />
                    <button>Transfer</button>
                </form>
                <div v-if="transactions?.length">
                    <hr>
                    <div class="transfers-history">
                        <article v-for="transaction in transactions" :key="transaction.date"
                            class="transaction-preview">
                            <TransactionPreview :transaction="transaction" />
                        </article>
                    </div>
                </div>
            </div>

        </div>
        <p v-else>Loading...</p>
    </section>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
import TransactionPreview from '@/components/transactions/TransactionPreview.vue'

export default {
    data() {
        return {
            // contact: null,
            transactions: [],
            amount: null
        }
    },

    async created() {
        if (!this.user) this.$router.push('/')
        if (this.user?.moves.length) this.transactions = this.user.moves.filter(move => move.to._id === this.contact._id)

        //Get contact from service
        // const _id = this.$route.params._id
        // this.contact = await contactService.get(_id)

        //Get contact as getter
        if (!this.contacts?.length) this.$store.dispatch({ type: 'loadContacts' })

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

        async onTransfer() {
            const transfer = {
                from: this.user,
                to: this.contact,
                amount: this.amount
            }
            await this.$store.dispatch({ type: 'transfer', transfer })
            this.$router.push(`/contacts/${this.contact._id}`)
        }

    },
    computed: {
        user() {
            return this.$store.getters.loggedinUser
        },
        contacts() {
            return this.$store.getters.contacts
        },
        //Smart getter
        contact() {
            const contactId = this.$route.params._id
            //TODO: add error handeling
            if (contactId) return this.$store.getters.contactById(contactId)
            else return null
        }
    },
    components: {
        TransactionPreview
    }
}
</script>

<style lang="scss">
</style>