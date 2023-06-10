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
        meta: {
          title: "首页"
        },
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        meta: {
          title: "订单管理"
        },
        component: () => import('@/views/OrdersView.vue')
      },
      {
        path: '/goodsList',
        name: 'goodsList',
        meta: {
          title: "商品管理/商品列表"
        },
        component: () => import('@/views/GoodsList.vue')
      },
      {
        path: '/goodsAdd',
        name: 'goodsAdd',
        meta: {
          title: "商品管理/商品添加"
        },
        component: () => import('@/views/GoodsAdd.vue')
      },
      {
        path: '/goodsClass',
        name: 'goodsClass',
        meta: {
          title: "商品管理/商品分类"
        },
        component: () => import('@/views/GoodsClass.vue')
      },
      {
        path: '/shop',
        name: 'shop',
        meta: {
          title: "店铺管理"
        },
        component: () => import('@/views/ShopView.vue')
      },
      {
        path: '/accountList',
        name: 'accountList',
        meta: {
          title: "账号管理/账号列表"
        },
        component: () => import('@/views/AccountList.vue')
      },
      {
        path: '/accountAdd',
        name: 'accountAdd',
        meta: {
          title: "账号管理/账号添加"
        },
        component: () => import('@/views/AccountAdd.vue')
      },
      {
        path: '/accountModify',
        name: 'accountModify',
        meta: {
          title: "账号管理/修改密码"
        },
        component: () => import('@/views/AccountModify.vue')
      },
      {
        path: '/totalGoods',
        name: 'totalGoods',
        meta: {
          title: "销售统计/商品统计"
        },
        component: () => import('@/views/TotalGoods.vue')
      },
      {
        path: '/totalOrders',
        name: 'totalOrders',
        meta: {
          title: "销售统计/订单统计"
        },
        component: () => import('@/views/TotalOrders.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
