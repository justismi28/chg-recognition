import Vue from 'vue'
import Router from 'vue-router'
import NominationForm from '@/components/NominationForm'
import NominationHistory from '@/components/NominationHistory'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NominationForm',
      component: NominationForm
    },
    {
      path: '/history',
      name: 'NominationHistory',
      component: NominationHistory
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})
