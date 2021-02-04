import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Dashboard  from '@/components/manager/Dashboard'
import ManageProducts  from '@/components/manager/ManageProducts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      // name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'ManageProducts',
          component: ManageProducts,
        },
      ]
    },
  ]
})
