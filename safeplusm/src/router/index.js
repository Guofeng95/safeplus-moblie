import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import reset from '@/components/reset'
import toutiao from '@/components/index/toutiao'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children: [
        // {
        //   path: '',
        //   component: manger
        // },
        // {
        //   path: '/submit',
        //   component: submit
        // },
        {
          path: '',
          component: toutiao
        },
       ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/reset',
      name: 'reset',
      component: reset
    },
  ]
})
