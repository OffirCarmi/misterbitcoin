<template>
    <section class="signup">
        <div class="teaser">
            <h1>Signup</h1>
            <h2>and get 100 coins!</h2>
        </div>
        <form @submit.prevent="onSignup()">
            <input v-model="credential" type="text" placeholder="Enter your full name" />
            <button>Join</button>
        </form>
    </section>
</template>

<script>

export default {
    data() {
        return {
            credential: null,
        }
    },

    created() {
        // if (user) this.$router.push('/home')
    },

    methods: {
        async onSignup() {
            const credential = this.credential
            await this.$store.dispatch({ type: 'signup', credential })
            this.$router.push('/home')
        }
    },

    computed: {
        user() {
            return this.$store.getters.loggedinUser
        },
    }
}
</script>

<style>
</style>