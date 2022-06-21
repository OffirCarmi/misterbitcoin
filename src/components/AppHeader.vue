<template>
    <header class="app-header full">
        <h1 @click="goHome">Mister BIT-Coin</h1>
        <nav>
            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/contacts">Contacts</RouterLink>
            <RouterLink to="/statistics">Dashboard</RouterLink>
            <p v-if="user" @click="logout">Logout</p>
        </nav>
    </header>
</template>

<script>
export default {
    methods: {
        goHome() {
            this.$router.push('/home')
        },

        logout() {
            this.$store.dispatch({ type: 'logout' })
            this.$router.push('/')
        }
    },
    computed: {
        user() {
            return this.$store.getters.loggedinUser
        }
    }
}
</script>

<style lang="scss">
</style>