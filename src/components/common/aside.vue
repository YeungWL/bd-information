<template>
  <div class="sidebar-container  sidebar-nav" >
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo sidebar-menu"  router>
      <el-menu-item index="/index"  :class="{'is-active': activeted('/demo')}">
        <i class="iconfont icon-index"></i> <span class="menu">首页</span>
      </el-menu-item>
      <el-menu-item index="/facility" :class="{'is-active': activeted('/facility')}">
        <i class="iconfont icon-facility"></i> <span class="menu">设备管理</span>
      </el-menu-item>
      <el-menu-item index="/user" :class="{'is-active': activeted('/user')}">
        <i class="iconfont icon-user"></i> <span class="menu">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/strategy" :class="{'is-active': activeted('/strategy')}">
        <i class="iconfont icon-strategy"></i> <span class="menu">合规策略</span>
      </el-menu-item>
      <el-menu-item index="/adhibition" :class="{'is-active': activeted('/adhibition')}">
        <i class="iconfont icon-apply"></i> <span class="menu">应用管理</span>
      </el-menu-item>
      <el-menu-item index="/content" :class="{'is-active': activeted('/demo2')}">
        <i class="iconfont icon-content"></i> <span class="menu">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/position" :class="{'is-active': activeted('/position')}">
        <i class="iconfont icon-position"></i> <span class="menu">定位管理</span>
      </el-menu-item>
      <el-menu-item index="/statistic" :class="{'is-active': activeted('/statistic')}">
        <i class="iconfont icon-chart"></i> <span class="menu">报表审计</span>
      </el-menu-item>
      <el-menu-item index="/log" :class="{'is-active': activeted('/log')}">
        <i class="iconfont icon-log"></i> <span class="menu">日志管理</span>
      </el-menu-item>
      <el-menu-item index="/setup" :class="{'is-active': activeted('/setup')}">
        <i class="iconfont icon-setting"></i> <span class="menu">系统设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'index',
   data() {
      return{
      }
    },
    methods:{
      activeted(path){
        return this.$route.fullPath.includes(path)
      }
    }
}
</script>

<style scoped>

</style>
