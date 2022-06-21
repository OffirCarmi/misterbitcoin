<template>
    <section class="statistics">
        <h1>Statistics</h1>
        <Chart v-if="user" :data="marketPrice" />
    </section>
</template>

<script>
import Chart from '@/components/Chart.vue'
import { bitcoinService } from '../services/bitcoin.service.js'

export default {
    data() {
        return {
            marketPrice: null,

        }
    },

    async created() {
        if (!this.user) this.$router.push('/')

        this.marketPrice = await bitcoinService.getMarketPrice()
    },

    computed: {
        user() {
            return this.$store.getters.loggedinUser
        }
    },

    components: {
        Chart
    }
}
</script>

<style>
</style>