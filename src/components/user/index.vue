<template>
  <div class="submenu-container">
    <div class="submenu-aside dh200">
      <div class="submenu-hd">
        <span>用户管理</span>
      </div>
      <el-menu :default-active="$route.path"
               class="submenu"
               router>
        <el-menu-item index="/user/admin"
                      :class="{'is-active':isActived('/user/admin')}">管理员管理</el-menu-item>
        <el-menu-item index="/user/usergroup"
                      :class="{'is-active':isActived('/user/usergroup')}">用户组管理</el-menu-item>
        <el-menu-item index="/user/role"
                      :class="{'is-active':isActived('/user/role')}">角色管理</el-menu-item>
        <el-menu-item index="/user/usertag"
                      :class="{'is-active':isActived('/user/usertag')}">用户标签管理</el-menu-item>
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
  methods: {
    isActived(path) {
      // 判断是否选中状态
      let isActived = this.$route.fullPath.indexOf(path) != -1
      return isActived
    }
  }
}
</script>
