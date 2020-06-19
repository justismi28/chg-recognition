import Vue from 'vue'
import Router from 'vue-router'
import NominationForm from '@/components/NominationForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NominationForm',
      component: NominationForm
    }
  ]
})
