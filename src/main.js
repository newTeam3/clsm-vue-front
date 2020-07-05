// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from "./vuex/store";
import Blob from './Excel/Blob'
import Export2Excel from './Excel/Export2Excel.js'

Vue.config.productionTip = false
Vue.use(router);
Vue.use(ElementUI);
Vue.prototype.$axios=axios
//配置axios的基本路径
axios.defaults.baseURL="http://localhost:8080"
//每次发送请求都在请求头中加入token
axios.interceptors.request.use(config=>{
  config.headers.Authorization="Bearer "+store.state.token
  console.log(config)
  return config
})
axios.interceptors.response.use(function (response){
  // 处理响应数据
  return response;
}, function (error) {
  // 处理响应失败
  Vue.prototype.$message.error('系统发生错误,你没有此权限');

  return Promise.reject(error);
})
/* eslint-disable no-new */
//路由拦截，只有当vuex中保存的token不为空时，才能访问其他组件，否则跳转到登录页面
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
      if (store.state.token) {
        next()
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)

new Vue({
  el: '#app',
  router,
  store,
  render:h => h(App)
})
