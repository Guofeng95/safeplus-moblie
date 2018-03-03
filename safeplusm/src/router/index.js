import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import rstwd from '@/components/resetpassward'
import reset from '@/components/reset'
import toutiao from '@/components/index/toutiao'
import recommend from '@/components/index/recommend'
import article from '@/components/index/article'
import insubscripe from '@/components/index/insubscripe'
import search from '@/components/index/search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children: [
        {
          path: '/article',
          component: article
        },
        {
          path: '/',
          component: toutiao
        },
        {
          path: '/recommend',
          component: recommend
        },
        {
          path: '/keyword',
          component: insubscripe
        },
        {
          path: '/search',
          component: search
        }
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
    {
      path: '/forget',
      name: 'rstwd',
      component: rstwd
    }
  ]
})
