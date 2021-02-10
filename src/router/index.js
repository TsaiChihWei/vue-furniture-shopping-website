import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Dashboard from '@/components/manager/Dashboard'
import ManageProducts from '@/components/manager/ManageProducts'
import BrowseProducts from '@/components/customer/BrowseProducts'
import Orders from '@/components/manager/Orders'
import Cart from '@/components/customer/Cart'
import CustomerOrder from '@/components/customer/CustomerOrder'
import CustomerOrderID from '@/components/customer/CustomerOrderID'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/products',
      name: 'BrowseProducts',
      component: BrowseProducts
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/customer_order',
      name: 'CustomerOrder',
      component: CustomerOrder
    },
    {
      path: '/customer_order/:orderId',
      name: 'CustomerOrderID',
      component: CustomerOrderID
    },
    {
      path: '/admin',
      // name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'ManageProducts',
          component: ManageProducts
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders
        }
      ]
    }
  ]
})
