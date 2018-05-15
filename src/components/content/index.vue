<template>
  <div class="submenu-container">
    <div class="submenu-aside dh200">
      <div class="submenu-hd">
        <span>内容管理</span>
      </div>
      <el-menu :default-active="$route.path"
               class="submenu"
               router>
        <el-menu-item v-for="(item,index) in facilityList"
                      :key="index"
                      :index="item.path"
                      :class="{'is-active':isActived(item.path)}">{{item.name}}</el-menu-item>
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
  name: 'index',
  components: {
    Breadcrumb
  },
  data() {
    return {
      facilityList: [
        { path: '/content/file', name: '文件管理' },
        { path: '/content/addresslist', name: '通讯录管理' },
        { path: '/content/message', name: '消息推送' },
        { path: '/content/catalog', name: '目录加密' }
      ]
    }
  },
  methods: {
    isActived(path) {
      let isActived = this.$route.fullPath.indexOf(path) != -1
      return isActived
    }
  }
}
</script>

  <style scoped>

</style>
