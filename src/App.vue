<template>
  <div id="app">
    <!--<headerPublic v-if="headerShow"></headerPublic>   -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!--<footerPublic v-if="footerShow"></footerPublic>-->
  </div>
</template>

<script>
//引入了头部公共模块
// import headerPublic from './components/common/header.vue'
//引入了底部公共模块
// import footerPublic from './components/common/footer.vue'
/*
 * components为定义引入模块的地方
*/
export default {
  name: 'app',
  data() {
    return {
      //头部是否显示
      // headerShow:true,
      //底部是否显示
      // footerShow:true,
      //一级目录
      firstMenu: 0
      // timer:''
    }
  },
  created() {
    if (this.$cookie.get('password')) {
      this.$cookie.remove('password')
    }
    // if(!this.$cookie.get(this.$api.ctk)){
    //   this.$router.push('/login');
    // }
  },
  methods: {
    routeChange() {
      //如果半小时没操作，那么自动刷新一次
      if (this.$cookie.get('refreshTimer')) {
        clearInterval(this.$cookie.get('refreshTimer'))
      }
      let refreshTimer = setInterval(() => {
        location.reload()
      }, 1000 * 60 * 60)
      this.$cookie.set('refreshTimer', refreshTimer)
    }
  },
  watch: {
    $route: 'routeChange'
  }
}
</script>
<style lang="scss">
// @import './styles/element-ui.scss';
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

