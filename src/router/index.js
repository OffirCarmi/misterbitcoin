import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import ContactApp from '../views/ContactApp.vue'
import ContactDetails from '../views/ContactDetails.vue'
import ContactEdit from '../views/ContactEdit.vue'
import StatisticPage from '../views/StatisticPage.vue'
import Signup from '../views/Signup.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Signup
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/contacts',
      component: ContactApp
    },
    {
      path: '/contacts/:_id',
      component: ContactDetails
    },
    {
      path: '/contacts/edit/:_id?',
      component: ContactEdit
    },
    {
      path: '/statistics',
      component: StatisticPage
    }
    ,
    {
      path: '/signup',
      component: Signup
    }
  ]
})

export default router
