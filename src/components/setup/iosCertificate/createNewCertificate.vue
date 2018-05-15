<template>
  <div>
    <div class="page-main">
      <table class="custom">
        <tr>
          <td style="font-size:16px;color:#669fc7">生成IOS证书</td>
        </tr>
        <tr>
          <td>
            <el-steps :active="index"
                      align-center
                      :center='center'>
              <el-step title="开始"></el-step>
              <el-step title="创建证书签名请求"></el-step>
              <el-step title="与苹果公司创建证书"></el-step>
              <el-step title="上传并生成APNs"></el-step>
            </el-steps>
          </td>

        </tr>
        <tr>
          <td class="certificateStep">
            <div v-if="index==1"
                 style="text-align: center;">
              <el-form :inline="true"
                       class="search-form">
                <el-form-item label="输入你的Apple iTunes ID">
                  <el-input type="password"
                            placeholder='请输入确认密码'
                            auto-complete="off"
                            style="width:193px;"
                            required></el-input>
                  这个Id将会用来创建（和更改）App网站上的证书
                </el-form-item>
              </el-form>
            </div>
            <div v-if="index==2"
                 style="text-align: center;">
              <p>
                <span style="color:#2a703c;">你的证书申请（CSR）</span>已经生成</p>
              <p>
                <a style="color:#428bca;">下载</a>备份为下一步所用</p>
            </div>
            <div v-if="index==3">
              <div style="margin-left:450px;">
                <p>进入
                  <a href=""
                     style="color:#428bca;">Apple证书网站</a> ，并按照如下操作:</p>
                <p>1.输入你的apple ID 进入第一步.</p>
                <p>2.点击按钮“创建一个证书”。如果提示接受团队的协议,请接受然后继续操作。</p>
                <p>3.上传在上一步生成的证书签名请求（CSR）文件.</p>
                <p>4.生成成功后点击“download”按钮获得苹果生成的".pem"证书.你现在可以移到下一步. </p>
              </div>
            </div>
            <div v-if="index==4">
              <el-form class="search-form"
                       style="margin-left:350px;">
                <el-form-item label=""
                              style="margin-bottom:0;">
                  <span style="padding-left:25px;">上传证书</span>
                  <el-input type="file"
                            placeholder='上传证书'
                            auto-complete="off"
                            style="width:193px;"
                            required></el-input>
                  浏览在上一步从苹果入口下载的“.pem”证书文件。
                </el-form-item>
                <el-form-item label=""
                              style="margin-bottom:0;">
                  创建证书密码
                  <el-input type="password"
                            placeholder='创建证书密码	'
                            auto-complete="off"
                            style="width:193px;"
                            required></el-input>
                  这是用来加密你的APNs证书 .请记下这个密码,因为你在以后会用到它
                </el-form-item>
                <el-form-item label=""
                              style="margin-bottom:0;">
                  创建证书密码
                  <el-input type="password"
                            placeholder='确认密码	'
                            auto-complete="off"
                            style="width:193px;"
                            required></el-input>
                  确认两次输入的密码相同
                </el-form-item>
              </el-form>
            </div>
          </td>

        </tr>
        <tr>
          <td>
            <el-form :inline="true"
                     style="float:right;"
                     class="search-form">
              <el-form-item label="">
                <el-button type="primary"
                           style="padding:8px 20px;"
                           @click="stepUp">上一步</el-button>
                <el-button type="primary"
                           style="padding:8px 20px;"
                           @click="stepDown">下一步</el-button>
              </el-form-item>
            </el-form>
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
  name: 'createNewCertificate',
  components: {},
  data() {
    return {
      index: 1,
      center: true
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    stepUp() {
      this.index = this.index > 1 ? --this.index : 1
    },
    stepDown() {
      this.index = this.index < 4 ? ++this.index : 4
    }
  }
}
</script>
