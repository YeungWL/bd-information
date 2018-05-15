<template>
  <div>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true"
                   class="search-form">
            <el-form-item label="">
              <el-button type="primary"
                         @click="createNewCertificate">生成新证书</el-button>
              <el-button type="primary">下载</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right"></div>
      </div>
      <table class="custom">
        <tr>
          <td colspan="2">证书信息</td>
        </tr>
        <tr>
          <td>Apple MDM Certificate Topic</td>
          <td>651656545614561564564544564564</td>
        </tr>
        <tr>
          <td>Apple iTunes ID</td>
          <td></td>
        </tr>
        <tr>
          <td>生效日期</td>
          <td></td>
        </tr>
        <tr>
          <td>失效日期</td>
          <td></td>
        </tr>
      </table>
      <table class="custom"
             style="margin-top:50px;">
        <tr>
          <td>
            <div class="upload">文件上传<input type="file"
                     class="file"></div>
          </td>
          <td>
            <el-input type="password"
                      placeholder='请输入确认密码'
                      auto-complete="off"
                      style="width:193px;"
                      required></el-input>
          </td>
          <td>
            <div class="upload">上传已有证书文件<input type="file"
                     class="file"></div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style>

</style>
<script>
export default {
  name: 'iosCertificateCreate',
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    //
    createNewCertificate() {
      this.$router.push('/setup/iosCertificate/createNewCertificate')
    }
  }
}
</script>
