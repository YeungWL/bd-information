<template>
  <div>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true">
            <el-form-item label="">
              <el-button type="primary"
                         @click="store">保存</el-button>
              <el-button type="primary"
                         @click="importParams">导入参数设置</el-button>
              <el-button type="primary"
                         @click="onSubmit">导出参数设置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right"></div>
      </div>
      <el-collapse v-model="active1"
                   @change="handleChange">
        <el-collapse-item title="邮箱配置"
                          name="1">
          <table class="setting_table">
            <tr>
              <td>邮件是否采用SSL协议</td>
              <td>
                <el-select v-model="form.method"
                           placeholder="请选择协议方式">
                  <el-option v-for="(item,index) in isSLL"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>发送邮件服务器</td>
              <td>
                <el-input v-model="form.email"
                          type="email"
                          placeholder='请输入邮箱'
                          auto-complete="off"
                          style="width:193px;"
                          required></el-input> 示例:smtp.163.com 或 202.106.199.34</td>
            </tr>
            <tr>
              <td>端口号</td>
              <td>
                <el-input v-model="form.port"
                          type="text"
                          placeholder='请输入端口'
                          auto-complete="off"
                          style="width:193px;"
                          required></el-input>
              </td>
            </tr>
            <tr>
              <td>发送邮件服务器</td>
              <td>
                <el-input v-model="form.emailSend"
                          type="email"
                          placeholder='请输入邮箱'
                          auto-complete="off"
                          style="width:193px;"
                          required></el-input> 示例:smtp.163.com 或 202.106.199.34</td>
            </tr>
            <tr>
              <td>用户名</td>
              <td>
                <el-input v-model="form.user"
                          type="text"
                          placeholder='请输入用户名'
                          auto-complete="off"
                          style="width:193px;"
                          required></el-input>
              </td>
            </tr>
            <tr>
              <td>密码</td>
              <td>
                <el-input v-model="form.password"
                          type="password"
                          placeholder='请输入密码'
                          auto-complete="off"
                          style="width:193px;"
                          required></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <el-button type="primary"
                           @click="test">测试</el-button>
              </td>
              <td></td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item title="客户端升级配置"
                          name="2">
          <table class="setting_table">
            <tr>
              <td>客户端的心跳时间</td>
              <td>
                <el-select v-model="client.heart"
                           placeholder="请选择时间">
                  <el-option v-for="(item,index) in heartList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>客户端上传日志间隔</td>
              <td>
                <el-select v-model="client.log"
                           placeholder="请选择时间">
                  <el-option v-for="(item,index) in heartList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </td>
              </td>
            </tr>
            <tr>
              <td>客户端pull消息间隔</td>
              <td>
                <el-select v-model="client.pull"
                           placeholder="请选择时间">
                  <el-option v-for="(item,index) in heartList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>客户端上传设备信息间隔</td>
              <td>
                <el-select v-model="client.upload"
                           placeholder="请选择时间">
                  <el-option v-for="(item,index) in heartList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </td>
              </td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item title="合规参数配置"
                          name="3">
          <table class="setting_table">
            <tr>
              <td>合规历史上报周期</td>
              <td>
                <el-select v-model="client.heart"
                           placeholder="请选择时间">
                  <el-option v-for="(item,index) in heartList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>合规检测上报周期</td>
              <td>
                <el-select v-model="client.log"
                           placeholder="请选择时间">
                  <el-option v-for="(item,index) in heartList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </td>
              </td>
            </tr>
            <tr>
              <td>违规邮件周期</td>
              <td>
                <el-select v-model="client.pull"
                           placeholder="请选择时间">
                  <el-option v-for="(item,index) in heartList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item title="地图定位类型配置"
                          name="4">
          <table class="setting_table">
            <tr>
              <td>定位地图类型</td>
              <td>
                <el-select v-model="client.heart"
                           placeholder="请选择地图">
                  <el-option v-for="(item,index) in mapList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item title="登录参数配置"
                          name="5">
          <table class="setting_table">
            <tr>
              <td>失败重试次数</td>
              <td>
                <el-input v-model="form.email"
                          type="email"
                          placeholder='请输入失败重试次数'
                          auto-complete="off"
                          style="width:193px;"
                          required></el-input>
              </td>
            </tr>
            <tr>
              <td>失败冻结时长(分钟)</td>
              <td>
                <el-input v-model="form.port"
                          type="text"
                          placeholder='请输入失败冻结时长(分钟)'
                          auto-complete="off"
                          style="width:193px;"
                          required></el-input>
              </td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item title="电子围栏参数配置"
                          name="6">
          <table class="setting_table">
            <tr>
              <td>电子围栏检测周期</td>
              <td>
                <el-select v-model="client.heart"
                           placeholder="请选择时间">
                  <el-option v-for="(item,index) in heartList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item title="IOS证书过期是否提醒"
                          name="7">
          <table class="setting_table">
            <tr>
              <td>IOS证书过期是否提醒</td>
              <td>
                <el-select v-model="client.heart"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in heartList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </td>
            </tr>
          </table>
        </el-collapse-item>
        <el-collapse-item title="IOS重置设备流转策略"
                          name="8">
          <table class="setting_table">
            <tr>
              <td>IOS重置设备流转策略</td>
              <td>
                <el-select v-model="client.heart"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in heartList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </td>
            </tr>
          </table>
        </el-collapse-item>
      </el-collapse>
    </div>

    <el-dialog title="导入参数设置"
               :visible.sync="importVisible"
               size="tiny"
               class="importSetting">
      <el-row>
        <el-col :span="12">下载Excel文件模板</el-col>
        <el-col :span="12">
          <a href=""
             style="color:rgb(255, 0, 0);">XLS模板下载</a>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">上传文件</el-col>
        <el-col :span="12"><input type="file"></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">支持的文件格式</el-col>
        <el-col :span="12">*.xls, *.xlsx, *.csv</el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="importVisible = false">确 定</el-button>
        <el-button @click="importVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scope>
.el-collapse-item__content {
  padding: 10px 0px;
}
</style>
<script>
export default {
  name: 'paramsSetting',
  components: {},
  data() {
    return {
      importVisible: false,
      active1: '1',
      isSLL: [{ label: '否', value: 'no' }, { label: '是', value: 'yes' }],
      form: {
        method: '',
        email: '',
        port: '',
        emailSend: ''
      },
      client: {
        heart: '',
        log: '',
        pull: '',
        upload: ''
      },
      heartList: [
        { label: '4小时', value: '4' },
        { label: '8小时', value: '8' },
        { label: '12小时', value: '12' }
      ],
      mapList: [
        { label: '百度地图', value: 'baidu' },
        { label: '高德地图', value: 'gaode' }
      ]
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    onSubmit() {},
    test() {},
    store() {
      this.$confirm('你确定要保存吗?', '提示', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          })
        })
    },
    importParams() {
      this.importVisible = true
    },
    handleChange(v) {},
    handleCurrentChange(v) {}
  }
}
</script>
