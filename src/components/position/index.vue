<template>
  <div class="submenu-container">
    <div class="submenu-aside dh200">
      <div class="submenu-hd">
        <span>定位管理</span>
      </div>
      <el-menu :default-active="$route.path"
               class="submenu"
               router>
        <el-menu-item index="/position/equipment"
                      :class="{'is-active':isActived('/position/equipment')}">设备定位</el-menu-item>
        <el-menu-item index="/position/timing"
                      :class="{'is-active':isActived('/position/timing')}">定时策略</el-menu-item>
        <el-menu-item index="/position/rail"
                      :class="{'is-active':isActived('/position/rail')}">电子围栏</el-menu-item>
      </el-menu>
    </div>

    <div class="content-wrapper">
      <breadcrumb class="breadcrumb-container"></breadcrumb>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/common/Breadcrumb'
export default {
  name: 'positionIndex',
  components: {
    Breadcrumb
  },
  data() {
    return {}
  },
  methods: {
    isActived(path) {
      // 判断是否选中状态
      let isActived = this.$route.fullPath.indexOf(path) != -1
      return isActived
    }
  }
}
</script>

<style lang="scss" scoped>
.submenu-container{
  .content-wrapper{
    // display: flex;
    // flex-direction: column;
    
  }
}
</style>
