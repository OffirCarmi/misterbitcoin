<template>
    <section class="contact-details">
        <h1>Contact Details</h1>
        <div v-if="contact" class="contact-data">
            <div class="actions">
                <button class="btn-back" @click="goBack">Back</button>
                <button class="btn-edit" @click="editContact(contact._id)">Edit</button>
            </div>
            <hr>
            <h2>{{ contact.name }}</h2>
            <h3>{{ contact.phone }}</h3>
            <h3 class="last">{{ contact.email }}</h3>
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
                            <TransactionPreview :transaction="transaction" :isHome="false" />
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
            // transactions: [],
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
            this.amount = null
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
        },
        transactions() {
            const moves = this.$store.getters.loggedinUser.moves
            if (!moves) return
            return moves.filter(move => move.to._id === this.contact._id)
        }
    },
    components: {
        TransactionPreview
    }
}
</script>

<style lang="scss">
</style>