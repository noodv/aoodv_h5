import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home/Home'
// import Account from '@/views/Account/Account'
// import Mystudy from '@/views/Mystudy'
// import classify from '@/views/Classify'
// import Coursedetails from '@/views/Coursedetails/Coursedetails'
// import Classifydetails from '@/views/Classifydetails' 
// import Login from '@/views/Login'
// import search from '@/components/search' 
// import NotFound from '@/components/NotFound'
// import setting from '@/views/Account/setting'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: resolve => require(['@/views/index'], resolve),
      // children:[
      //   {
      //     path: '',
      //     redirect: 'recommend'
      //   },
      //   { path: 'recommend', component: recommend, name: 'recommend' },
      //   { path: 'classic', component: classic, name: 'classic' },
      //   { path: 'major', component: major, name: 'major' },
      //   { path: 'expert', component: expert, name: 'expert' },
      // ]
    },
    {
      path: '/home/askview',
      name: 'askview',
      component: resolve => require(['@/views/ask/components/askview'], resolve),
    },
    {
      path: '/addask',
      name: 'addask',
      component: resolve => require(['@/views/ask/components/addask'], resolve),
    },
    {
      path: '/blogview',
      name: 'blogview',
      component: resolve => require(['@/views/blog/components/blogview'], resolve),
    },
    {
      path: '/addblog',
      name: 'addblog',
      component: resolve => require(['@/views/blog/components/addblog'], resolve),
    },
    {
      path: '/topicview',
      name: 'topicview',
      component: resolve => require(['@/views/topic/components/topicview'], resolve),
    },
    {
      path: '/addtopic',
      name: 'Addtopic',
      component: resolve => require(['@/views/topic/components/addTopic'], resolve),
    },
    {
      path: '/account',
      name: 'Account',
      component: resolve => require(['@/views/Account/Account'], resolve),
    },  
    {
      path: '/mystudy',
      name: 'Mystudy',
      component: resolve => require(['@/views/Mystudy'], resolve),
    },
    {
      path: '/classify',
      name: 'Classify',
      component: resolve => require(['@/views/Classify'], resolve),
    },
    {
      path: '/home/coursedetails',
      name: 'Coursedetails',
      component: resolve => require(['@/views/Coursedetails/Coursedetails'], resolve),
      // children:[
      //   {
      //     path: '',
      //     redirect: 'introduce'
      //   },
      //   { path: 'introduce', component: introduce, name: 'introduce' },
      //   { path: 'catalog', component: catalog, name: 'catalog' },
      //   { path: 'comment', component:comment, name: 'comment' },
      // ]
    },
    {
      path: '/classifydetails',
      name: 'Classifydetails',
      component: resolve => require(['@/views/Classifydetails'], resolve),
      children:[
      ]
    },
    {
      path: '/home/search',
      name: 'search',
      component: resolve => require(['@/components/search'], resolve),
      
    },
    {
      path: '/account/login',
      name: 'login',
      component: resolve => require(['@/views/Login'], resolve),
    },
    {
      path: '/account/pwdlogin',
      name: 'login',
      component: resolve => require(['@/views/PwdLogin'], resolve),
    },
    {
      path:'/account/setting',
      component: resolve => require(['@/views/Account/setting'], resolve),
    },
    {
      path: '*',
      name: 'notfound',
      component: resolve => require(['@/components/NotFound'], resolve),
    },

  ]
})
