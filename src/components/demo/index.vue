<template>
    <div class="submenu-container" >
      <div class="submenu-aside dh200">
        <div class="submenu-hd"><span>demo模块</span></div>
        <el-menu :default-active="$route.path" class="submenu" router>
          <el-menu-item index="/demo/test1" :class="{'is-active':isActived('/demo/test1')}">test1</el-menu-item>
          <el-submenu index="/demo/test2">
            <template slot="title">test2</template>
            <el-menu-item-group>
              <el-menu-item index="/demo/test2" :class="{'is-active':isActived('/demo/test2')}">test2</el-menu-item>
              <el-menu-item index="/demo/test3" :class="{'is-active':isActived('/demo/test3')}">test3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>

      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'index',
    data() {
      return {
      }
    },
    methods: {
      isActived(path){
        let isActived = this.$route.fullPath.indexOf(path) != -1 ;
        return isActived;
      }
    },
  }
  </script>

  <style scoped>

  </style>
