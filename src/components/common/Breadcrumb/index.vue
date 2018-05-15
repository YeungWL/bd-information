<template>
  <el-breadcrumb class="app-breadcrumb"
                 separator="">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList"
                          :key="item.path">
        <router-link :to="item.redirect||item.path">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched;
      this.levelList = matched;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 46px;
  margin-left: 20px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  & /deep/ .el-breadcrumb__item__inner + .el-breadcrumb__separator:after {
    content: '/';
  }
}
</style>
