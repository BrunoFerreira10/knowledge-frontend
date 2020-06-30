import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'
import ArticleByCategory from '../components/articles/ArticlesByCategory'
import ArticleById from '../components/articles/ArticleById'
import Auth from '../components/auth/Auth'

import { userKey } from '@/global'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: { requiresLogin: false }
  },
  {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
  },
  {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticleByCategory
  },
  {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
  }  ,
  {
    name: 'auth',
    path: '/auth',
    component: Auth
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey)  
  console.log(router)
  if(to.matched.some(record => record.meta.requiresLogin)){
    const user = JSON.parse(json)            
    user ? next() : next({ path: '/auth' })    
  } else {
    next()
  }

  if(to.matched.some(record => record.meta.requiresAdmin)){
    const user = JSON.parse(json)
        user && user.admin ? next() : next({path: '/auth'})
  } else {
    next()
  }

  if(router.history.current.name.startsWith('auth')){
    store.commit('setMenuToggleButtonVisible', false)    
    store.commit('setDropdownMenuVisible', false)
    store.commit('toggleMenu', false)
  } else {
    store.commit('setMenuToggleButtonVisible', true)    
    store.commit('setDropdownMenuVisible', true)    
  }  
  
})

export default router