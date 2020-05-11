<style lang="scss">
  #app{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    #body{
      width: 100%;
      height: calc(100vh - 120px);
      background: #f9f9f9;
      // background: white;
      overflow-x: hidden;
      overflow-y: auto;
    }
    #head{
      width: 100%;
      height: 86px;
      position: relative;
      z-index: 9;
      .head-box{
        position: fixed;
        width: 100%;
        background: white;
        z-index: 99;
        padding: 20px 30px;
        i{
          transform: rotate(180deg);
          display: inline-block;
        }
        h1{
          font-size: 32px;
          margin-left: -50px;
        }
      }
    }
    #nav{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 120px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      border-top: 1px solid rgba(0,0,0,.02);
      box-shadow: 0 1px 16px rgba(0,0,0,.1);
      background: white;
      .nav-item{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
        width: 25%;
        text-align: center;
        line-height: 1.4;
        transition: all .3s;
      }
      .nav-active{
        color: $active;
        transition: all .3s;
        .iconfont{
          color: $active;
        }
      }
    }
  }
</style>

<template>
  <div id="app">
    <div id="body">
      <div id="head" v-if="!isWechat&&judgeHasShowTop()">
        <div class="head-box flex">
          <span @click="back"><i class="iconfont bkright"></i></span>
          <h1>{{title}}</h1>
          <span></span>
        </div>
      </div>
      <router-view />
    </div>
    <div id="nav" v-if="judgeHasShowNav()">
      <div v-for="(nav,index) in navs" :key="index" :class="{'nav-item':true,'nav-active':jusgeisActive(nav.path)}" @click="link2(nav.path)">
        <i :class="`iconfont ${jusgeisActive(nav.path)?nav.activeIcon:nav.icon}`"></i>
        {{ nav.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '必控',
      navs: [
        {
          icon: 'bkshouyexian',
          activeIcon: 'bkshouye',
          text: '主题',
          path: '/home'
        },
        {
          icon: 'bkshujuxian',
          activeIcon: 'bkshuju',
          text: '数据',
          path: '/thermometry'
        },
        {
          icon: 'bkrenyuanxinxi_mdpi',
          activeIcon: 'bkrenyuanxinximdpi',
          text: '人员',
          path: '/personnel'
        },
        {
          icon: 'bkshebeixian',
          activeIcon: 'bkshebei',
          text: '设备',
          path: '/device'
        },
        {
          icon: 'bkwodexian',
          activeIcon: 'bkwode',
          text: '我的',
          path: '/my'
        }
      ],
      unShows: ['/login', '/register', '/down', '/qr-code', '/pc', '/ad'],
    }
  },
  beforeCreate() {
    /*if(!this.isMobile) {
      window.location.href = 'http://pc.bk.apal.com.cn'
    }*/
  },
  mounted() {
    if(this.$route.meta && this.$route.meta.title) {
      this.title = this.$route.meta.title
    }
  },
  watch: {
    $route(n) {
      if(n.meta && n.meta.title) {
        this.title = n.meta.title
      }
      if(this.unShows.indexOf(n.path)>-1) {
        document.getElementById('body').style.height = '100vh'
      } else {
        document.getElementById('body').style.height = 'calc(100vh - 16vw)'
      }
    }
  },
  methods: {
    link2(path) {
      this.$router.push(path)
    },
    jusgeisActive(path) {
      const path2 = this.$route.path
      return path2.indexOf(path)>-1
    },
    judgeHasShowNav() {
      return this.unShows.indexOf(this.$route.path)<0
    },
    judgeHasShowTop() {
      const unShows = ['/down', '/qr-code', '/pc', '/ad']
      return unShows.indexOf(this.$route.path)<0
    },
    back() {
      this.$router.back()
    }
  }
}
</script>
