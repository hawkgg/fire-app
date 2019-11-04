import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/tasks/:page',
      name: 'Index Pagination',
      component: Index
    },
    {
      path: '/tasks/edit/:taskId',
      name: 'Edit',
      component: Edit
    }
  ]
})
