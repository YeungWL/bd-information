<template>
  <div class="submenu-container">
    <div class="submenu-aside dh200">
      <div class="submenu-hd">
        <span>设置管理</span>
      </div>
      <el-menu :default-active="$route.path"
               class="submenu"
               router>
        <el-menu-item v-for="(item,index) in logList"
                      :key="index"
                      :index="item.path"
                      :class="{'is-active':isActived(item.path)}">{{item.name}}</el-menu-item>
        <!--<el-menu-item index="/facility/activation" :class="{'is-active':isActived('/facility/activation')}">激活设备</el-menu-item>-->
        <!--<el-menu-item index="/facility/grouping" :class="{'is-active':isActived('/facility/grouping')}">设备分组</el-menu-item>-->
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
        logList: [
          { path: '/setup/paramsSetup', name: '参数设置' },
          { path: '/setup/logoSet', name: 'LOGO设置' },
          { path: '/setup/iosCertificate', name: 'ios设置' },
          { path: '/setup/timeScheme', name: '时间方案管理' }
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
