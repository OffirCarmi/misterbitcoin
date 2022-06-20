<template>
    <section class="home" v-if="user">
        <h2>Hello <span>{{ user.name }}</span></h2>
        <h3>Coins: <span>{{ user.coins }}</span></h3>
        <h3>Rate: <span>{{ rate }}</span></h3>
    </section>
</template>

<script>
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'

export default {
    data() {
        return {
            user: null,
            rate: null
        }
    },
    async created() {
        this.user = userService.getUser()
        this.rate = await bitcoinService.getRate(this.user.coins)
    }
}
</script>

<style>
</style>