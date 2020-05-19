import Vue from 'vue'
import Router from 'vue-router'


import Index from "../components/Index";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import Test from "../components/public/Test";

Vue.use(Router);

export default new Router({
    mode:'history',
  routes:[

    {
      path:'/index',
      name:'Index',
      component:Index,
      meta:{
        requireAuth: true
      },
      children:[
        //如果要使用props传参的方式，要添加props:true
        //用户菜单
        {path:'/test/test',name:'test',component:Test},

      ]

    },
    {
      path:'/login',
      name:'login',
      component:Login,

    },
    //重定向
    {
      path:'/goHome',
      name:'goHome',
      redirect: Index
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      component: Login
    },

  ]
});
