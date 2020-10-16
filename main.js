
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'// vue状态仓库

import Vant, { Toast } from 'vant';// vant-UI移动框架 
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css'
Vue.use(Vant);

import $ from 'jquery'// jquery ajax
import animate from 'animate.css' // css3 动画

import utils from '@/common/utils'// js公共工具函数库
Vue.prototype.utils = utils // 设置全局

import Ripple from 'vue-ripple-directive'// 点击按钮水波
Ripple.color = 'rgba(88,220,223,0.5)';
Ripple.zIndex = 40;
Vue.directive('ripple', Ripple);
Vue.config.productionTip = false

import axios from "axios";
Vue.prototype.axios = axios
// 自定义的 axios 响应拦截器 ,设置新的authorization为token的值
axios.interceptors.response.use((response) => {
  // 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token。你可以根据你的业务需求自己编写更新token的逻辑
  var token = response.headers.authorization;
  if (token) {
    token = token.replace("Bearer ", '')
    console.log('新的headers=', response.headers)
    console.log('新的token=' + token)
    // 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
    let userInfo = JSON.parse(localStorage.getItem("user_info"));
    userInfo.access_token = token;
    utils.putLocalStorageItem("user_info", userInfo)
    utils.putSessionItem("user_info", userInfo)
    axios.defaults.headers.token = token;
    axios.defaults.headers.common['Authorization'] = token
    axios.defaults.headers.Authorization = token
  }
  // token 失效情况 重新登陆
  if (response.data.errcode == 1001 && response.data.errmsg.toLowerCase().indexOf('token') !== -1) {
    localStorage.removeItem("user_info");
    sessionStorage.removeItem("user_info");
    if (utils.isProduct) {
      window.location.reload();
    } else {
      setTimeout(() => {
        router.push({ name: 'Login' })
      }, 1500)
    }
  }
  return response
}, (error) => {
  switch (error.response.status) {
    // 如果响应中的 http code 为 401，那么则此用户可能 token 失效了之类的，我会触发 logout 方法，清除本地的数据并将用户重定向至登录页面
    case 401:
      return falseToast('Token过期')
      break
    // 如果响应中的 http code 为 400，那么就弹出一条错误提示给用户
    case 400:
      return Toast('Token失效')
      break
  }
  return Promise.reject(error)
})

// 兼容安卓或ios低版本
// import 'babel-polyfill' 
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

// 解决移动端click 300ms延迟
// import fastclick from 'fastclick'
// fastclick.attach(document.body)

// 移动端打印log
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)

// 图片延迟加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3, // 预压高度的比例  
  error: 'https://viroyalcampus.oss-cn-shanghai.aliyuncs.com/wxserve/leave/20200410/1586485672535.jpeg', // 图像的加载失败时 显示的error图示  
  loading: 'https://viroyalcampus.oss-cn-shanghai.aliyuncs.com/wxserve/leave/20200410/1586484986713.jpeg', // 图像正常加载时 显示的loading图示
  attempt: 1 // 图像尝试加载 次数
})

// 新页面居顶
// router.afterEach((to,from,next) => {
//   window.scrollTo(0,0);
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
