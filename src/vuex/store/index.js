import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    //将存在sessionstorage里的token赋值给全局变量
    token:window.sessionStorage.getItem('token' || '[]')==null ? '' :window.sessionStorage.getItem('token' || '[]'),
    //将存在sessionstorage里的用户信息赋值给全局变量
    uid:JSON.parse(sessionStorage.getItem("user"))

  },

  mutations:{
    login(state,token){
      state.token=token
      window.sessionStorage.setItem('token',token)
    }

  }
})
export default store
