<template>
    <h1>Statistics</h1>
    <Chart :data="marketPrice" />
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
        this.marketPrice = await bitcoinService.getMarketPrice()
        // this.marketPrice = bitcoinService.getMarketPrice()
    },
    components: {
        Chart
    }
}
</script>

<style>
</style>