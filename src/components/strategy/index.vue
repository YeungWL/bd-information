<template>
  <div class="submenu-container">
    <div class="submenu-aside dh200">
      <div class="submenu-hd">
        <span>合规策略</span>
      </div>
      <el-menu :default-active="$route.path"
               class="submenu"
               router>
        <el-menu-item index="/strategy/list"
                      :class="{'is-active':isActived('/strategy/list')}">策略列表</el-menu-item>
        <el-menu-item index="/strategy/secure"
                      :class="{'is-active':isActived('/strategy/secure')}">安全规则列表</el-menu-item>
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
  name: 'strategyIndex',
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
