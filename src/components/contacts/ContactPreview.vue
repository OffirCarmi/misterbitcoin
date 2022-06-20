<template>
    <RouterLink :to="`/contacts/${contact._id}`">
        <h2>{{ contact.name }}</h2>
    </RouterLink>
</template>

<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="scss">
</style>