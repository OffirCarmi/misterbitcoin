<template>
    <router-link :to="`/contacts/${contactId}`">
        <h4 v-if="isHome">{{ contactName }}</h4>
    </router-link>
    <h4>Transfer of <span>{{ transaction.amount }}</span> coins</h4>
    <h5> {{ date }}</h5>
</template>

<script>
export default {
    props: {
        transaction: {
            type: Object,
            required: true,
        },
        isHome: {
            type: Boolean,
            default: true
        }
    },

    // mounted() {
    //     console.log(this.transaction);
    // },

    computed: {
        date() {
            let diff = (Date.now() - this.transaction.date) / 1000
            if (diff < 10) return ' just now'
            if (diff <= 60) return ` ${Math.floor(diff)} seconds ago `
            diff = diff / 60
            if (diff <= 60) return ` ${Math.floor(diff)} ${diff < 1 ? 'minute ago' : 'minutes ago'} `
            diff = diff / 60
            if (diff <= 24) return ` ${Math.floor(diff)} ${diff < 1 ? 'hour ago' : 'hours ago'}`
            const date = new Date(this.transaction.date)
            return ` at ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `
        },
        contactName() {
            return this.transaction.to.name
        },
        contactId() {
            return this.transaction.to._id
        }
    }

}
</script>

<style lang="scss">
</style>