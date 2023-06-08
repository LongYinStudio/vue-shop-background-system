import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/IndexView.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('@/views/OrdersView.vue')
      },
      {
        path: '/goodsList',
        name: 'goodsList',
        component: () => import('@/views/GoodsList.vue')
      },
      {
        path: '/goodsAdd',
        name: 'goodsAdd',
        component: () => import('@/views/GoodsAdd.vue')
      },
      {
        path: '/goodsClass',
        name: 'goodsClass',
        component: () => import('@/views/GoodsClass.vue')
      },
      {
        path: '/shop',
        name: 'shop',
        component: () => import('@/views/ShopView.vue')
      },
      {
        path: '/accountList',
        name: 'accountList',
        component: () => import('@/views/AccountList.vue')
      },
      {
        path: '/accountAdd',
        name: 'accountAdd',
        component: () => import('@/views/AccountAdd.vue')
      },
      {
        path: '/accountModify',
        name: 'accountModify',
        component: () => import('@/views/AccountModify.vue')
      },
      {
        path: '/totalGoods',
        name: 'totalGoods',
        component: () => import('@/views/TotalGoods.vue')
      },
      {
        path: '/totalOrders',
        name: 'totalOrders',
        component: () => import('@/views/TotalOrders.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
