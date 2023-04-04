import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import AdminIndex from '../components/admin/AdminIndex.vue'
import GoodsManage from '../components/admin/GoodsManage.vue'
import UserManage from '../components/admin/UserManage.vue'
import TagManage from '../components/admin/TagManage.vue'
import AddressManage from '../components/admin/AddressManage.vue'
import VipManage from '../components/admin/VipManage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: "/admin/index",
      name: "AdminIndex",
      component: AdminIndex,
      children: [{
          path: 'goods',
          component: GoodsManage
        },
        {
          path: 'user',
          component: UserManage
        },
        {
          path: 'tag',
          component: TagManage
        }, {
          path: 'address',
          component: AddressManage
        }, {
          path: 'vip',
          component: VipManage
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
