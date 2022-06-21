<template>
    <div class="contact-filter">
        <input @input="filter" ref="filter" v-model="filterBy.txt" type="text" placeholder="Search for contact">
    </div>
</template>

<script>
export default {
    data() {
        return {
            filterBy: { txt: '' }
        }
    },
    mounted() {
        this.$refs.filter.focus()
    },
    methods: {
        filter() {
            this.$emit('set-filter', this.filterBy)
        }
    },
}
</script>

<style lang="scss">
</style>