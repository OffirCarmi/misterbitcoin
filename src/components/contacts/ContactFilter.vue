<template>
    <div class="contact-filter">
        <input @input="filter" v-model="filterBy.txt" type="text" placeholder="Search contact name">
    </div>
</template>

<script>
export default {
    data() {
        return {
            filterBy: { txt: '' }
        }
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