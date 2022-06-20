<template>
  <AppHeader />
  <main class="main-app">
    <RouterView />
  </main>
  <AppFooter />
  <UserMsg />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import UserMsg from '@/components/UserMsg.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    UserMsg,
  }
}
</script>

<style lang="scss">
@import "./assets/style.scss";
</style>
