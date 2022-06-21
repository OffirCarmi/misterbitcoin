<template>
    <h4>Transfer of <span>{{ transaction.amount }}</span> coins</h4>
    <h5> {{ date }}</h5>
</template>

<script>
export default {
    props: {
        transaction: {
            type: Object,
            required: true,
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
        }
    }

}
</script>

<style lang="scss">
</style>