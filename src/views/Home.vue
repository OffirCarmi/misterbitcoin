<template>
    <section class="home-page">
        <div v-if="user" class="user-profile">
            <h1>Hello <span>{{ user.name }}</span></h1>
            <div class="info">
                <h3><span>{{ user.coins }}</span> Coins</h3>
                <h3><span>{{ rate }}</span> Rate</h3>
            </div>
        </div>
        <div v-if="user?.moves.length" class="user-transactions">
            <h2>Your last activities</h2>
            <article v-for="transaction in transactions" :key="transaction.date" class="transaction-preview">
                <TransactionPreview :transaction="transaction" :isHome="true" />
            </article>
        </div>
    </section>
</template>

<script>
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'

import TransactionPreview from '@/components/transactions/TransactionPreview.vue'

export default {
    data() {
        return {
            // user: null,
            rate: null,
            credential: null,
        }
    },

    async created() {
        // this.user = userService.getUser()
        // this.rate = await bitcoinService.getRate(this.user.coins)


    },

    async mounted() {
        if (!this.user) this.$router.push('/')
        this.rate = await bitcoinService.getRate(this.user?.coins || 100)
    },

    methods: {
        async onSignup() {
            const credential = this.credential
            await this.$store.dispatch({ type: 'signup', credential })
        }
    },

    computed: {
        user() {
            return this.$store.getters.loggedinUser
        },
        transactions() {
            const transactions = [...this.user.moves]
            return transactions.splice(0, 3)
        }
    },
    components: {
        TransactionPreview
    }
}
</script>

<style>
</style>