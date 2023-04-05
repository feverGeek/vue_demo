import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import AdminIndex from '../components/admin/AdminIndex.vue'
import Tasks from '../components/admin/Tasks.vue'
import Workers from '../components/admin/Workers.vue'
import Workbooks from '../components/admin/Workbooks.vue'
import Sheets from '../components/admin/Sheets.vue'
import SheetTemplates from '../components/admin/SheetTemplates.vue'
import Log from '../components/admin/SheetTemplates.vue'

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
          path: 'tasks',
          component: Tasks
        },
        {
          path: 'workers',
          component: Workers
        },
        {
          path: 'workbooks',
          component: Workbooks
        }, {
          path: 'sheets',
          component: Sheets
        }, {
          path: 'sheettemplates',
          component: SheetTemplates
        }, {
          path: 'Log',
          component: Log
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
