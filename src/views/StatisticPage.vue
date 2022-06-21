<template>
    <section class="statistics">
        <h1>Statistics</h1>
        <div class="charts-container">
            <div class="chart">
                <h2>Market Price</h2>
                <Chart v-if="marketPrice" :labels="marketPrice[0]" :data="marketPrice[1]" />
            </div>
            <div class="chart">
                <h2>Confirmed Transactions</h2>
                <Chart v-if="confirmedTransactions" :labels="confirmedTransactions[0]"
                    :data="confirmedTransactions[1]" />
            </div>
        </div>
    </section>
</template>

<script>
import Chart from '@/components/Chart.vue'
import { bitcoinService } from '../services/bitcoin.service.js'

export default {
    data() {
        return {
            marketPrice: null,
            confirmedTransactions: null

        }
    },

    async created() {
        if (!this.user) this.$router.push('/')
        this.marketPrice = await bitcoinService.getMarketPrice()
        this.confirmedTransactions = await bitcoinService.getConfirmedTransactions()
        console.log('this.confirmedTransactions', this.confirmedTransactions);
    },

    mounted() {
        // console.log('Object.values(marketPrice)', Object.values(marketPrice));
        // console.log('Object.keys(marketPrice)', Object.keys(marketPrice));
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