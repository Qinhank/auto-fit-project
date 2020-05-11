import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Storage from 'vue-ls'
import { getapi } from './utils'

Vue.config.productionTip = false

//参考文档：http://mint-ui.github.io/docs/#/zh-cn2
Vue.use(MintUI)

if(location.search && location.search.indexOf('console=true')>-1) {
  new VConsole()
}

//vue-ls（用于本地存储）：https://github.com/RobinCK/vue-ls
const lsOption = {
  namespace: 'bikong0226__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
}
Vue.use(Storage, lsOption)

//配置全局的axios请求
axios.interceptors.request.use(
  config => {
    config.headers['authorization'] = Vue.ls.get('authorization')
    return config
  }
)

Vue.prototype.isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

Vue.prototype.isWechat = navigator.userAgent.toLowerCase().match(/micromessenger/i)=="micromessenger"

Vue.prototype.$g = function(url,data,opt) {
  const that = this
  let option = {
    method: 'get',
    params: {
      ...data,
      timeStamp: Date.parse(new Date()),
    },
    url: getapi(url),
    ...opt,
  }
  return new Promise(function(resolve, reject) {
    axios({...option})
    .then(res => {
      const { unlogin, meta, data } = res.data
      //如果未登录或过期
      if(unlogin) {
        that.$router.replace({path: '/login', query: { path: that.$route.path } })
        // MintUI.Toast('当前未登录')
        reject(res)
      }
      //如果已登录但返回数据错误
      else if(!meta.success) {
        MintUI.Indicator.close()
        MintUI.Toast(meta.message)
      }
      resolve(data)
    })
    .catch(res => reject(res))
  })
}

//封装axios的Post方法
Vue.prototype.$p = function(url,data,opt) {
  let option = {
    method: 'post',
    data: data,
    url: getapi(url),
    ...opt
  }
  return new Promise(function(resolve, reject) {
    axios({...option})
    .then(res => {
      const { unlogin, meta, data } = res.data
      if(unlogin) {
        reject()
      }
      //如果已登录但返回数据错误
      else if(!meta.success) {
        MintUI.Indicator.close()
        MintUI.Toast(meta.message)
        reject()
      }
      else {
        resolve(data)
      }
    })
    .catch(res => {
      reject(res)
    })
  })
}

//全局loading方法
Vue.prototype.$loading = MintUI.Indicator

//全局toast方法
Vue.prototype.$toast = MintUI.Toast

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
