<template>
  <div class="page-main">
    <div class="handleArea">
      <div class="left">
        <p>基于wifi添加电子围栏&nbsp;&gt;&gt;</p>
      </div>
      <div class="right">
        <div class="button-bar">
          <el-button type="primary">保存</el-button>
          <el-button type="primary">返回</el-button>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="用户管理"
                   name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理"
                   name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理"
                   name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {}
  }
}
</script>
