<template>
  <div class="submenu-container">
    <div class="submenu-aside dh200">
      <div class="submenu-hd">
        <span>应用管理</span>
      </div>
      <el-menu :default-active="$route.path"
               class="submenu"
               router>
        <el-menu-item index="/adhibition/management"
                      :class="{'is-active':isActived('/adhibition/management')}">应用管理</el-menu-item>
        <el-menu-item index="/adhibition/label"
                      :class="{'is-active':isActived('/adhibition/label')}">应用标签管理</el-menu-item>
        <el-menu-item index="/adhibition/blacklist"
                      :class="{'is-active':isActived('/adhibition/blacklist')}">黑名单管理</el-menu-item>
        <el-menu-item index="/adhibition/whitelist"
                      :class="{'is-active':isActived('/adhibition/whitelist')}">白名单管理</el-menu-item>
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
  name: 'userIndex',
  components: {
    Breadcrumb
  },
  data() {
    return {}
  },
  created() {
    console.log(this.$route)
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
