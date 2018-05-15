<template>
  <div>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true"
                   class="search-form">
            <el-form-item label="">
              <el-button type="primary"
                         @click="store">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right"></div>
      </div>
      <el-collapse v-model="active1"
                   @change="handleChange">
        <el-collapse-item title="LOGO设置"
                          name="1">
          <table class="setting_table">
            <tr>
              <td>上传Logo</td>
              <td>
                <el-input type="file"
                          auto-complete="off"
                          style="width:193px;"
                          required></el-input>
              </td>
            </tr>
            <tr>
              <td>当前Logo</td>
              <td><img src=""
                     alt=""> </td>
            </tr>
          </table>
        </el-collapse-item>

      </el-collapse>
    </div>

  </div>
</template>
<style>

</style>
<script>
export default {
  name: 'logoSetting',
  components: {},
  data() {
    return {
      msg: 'hello vue'
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    //
    store() {}
  }
}
</script>
