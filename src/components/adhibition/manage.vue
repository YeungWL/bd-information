<template>
  <section>
    <template v-if="$route.meta.hasChild">

      <div class="page-main">
        <div class="handleArea">
          <div class="left">
            <el-form :inline="true"
                     :model="formInline">
              <el-form-item label="平台类型：">
                <el-select v-model="formInline.region"
                           placeholder="请选择平台类型">
                  <el-option label="Android"
                             value="Android"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="策略名称：">
                <el-input v-model="formInline.user"
                          placeholder="请填写策略名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-tooltip class="item"
                        effect="light"
                        placement="bottom">
              <div slot="content"
                   class="contentTip">
                <div class="tipOption"
                     @click="showAndroidDialog">Android</div>
              </div>
              <el-button type="primary">增加
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table :data="tableData"
                  stripe
                  style="width: 100%">
          <el-table-column prop="icon"
                           label="图标"
                           width="140">
            <template slot-scope="scope">
              <img :src="scope.row.icon"
                   :alt="scope.row.name"
                   style="height:40px;weight:40px;margin:5px;" />
            </template>
          </el-table-column>
          <el-table-column prop="name"
                           label="应用名"
                           width="140">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="showUpdateAndroidDialog">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="version"
                           label="版本号">
          </el-table-column>
          <el-table-column prop="platform"
                           label="平台">
          </el-table-column>
          <el-table-column prop="status"
                           label="安全状态">
          </el-table-column>
          <el-table-column prop="origin"
                           label="来源">
          </el-table-column>
          <el-table-column prop="num"
                           label="安装数/推送总数"
                           width="140">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="goToPushPage">{{scope.row.num}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="date"
                           label="最近修改时间"></el-table-column>
          <el-table-column label="操作"
                           width="180">
            <template slot-scope="scope">
              <el-button type="text">安全扫描</el-button>
              <el-button type="text">推送</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total"
                    :page="listQuery.page"
                    :size="listQuery.size"
                    @pageChange="pageChange"></pagination>
      </div>
    </template>
    <!-- 详情页面 -->
    <router-view></router-view>
    <!-- 添加Android内部应用 -->
    <el-dialog title="添加Android内部应用"
               :visible.sync="androidVisible"
               size="small">
      <el-form ref="form"
               label-width="200px"
               label-position="left"
               :model="addApply">
        <el-form-item label="选择应用"
                      required>
          <el-button type="info"
                     @click="uploadButtonClick"
                     size="small">上传文件</el-button>
          <input type="file"
                 ref="uploadFile"
                 @change="unpoadFileChange"
                 style="display:none;">
          <el-input disabled
                    v-model="addApply.fileName"
                    style="width:405px;"></el-input>
        </el-form-item>
        <el-form-item label="全局可见"
                      prop="global">
          <el-radio :label="true"
                    v-model="addApply.global">是</el-radio>
          <el-radio :label="false"
                    v-model="addApply.global">否</el-radio>
        </el-form-item>
        <el-form-item label="沙箱应用">
          <el-radio :label="true"
                    v-model="addApply.sandBox">是</el-radio>
          <el-radio :label="false"
                    v-model="addApply.sandBox">否</el-radio>
          <span style="color:red;">（仅支持企业内部应用）</span>
        </el-form-item>
        <el-form-item label="必须安装">
          <el-radio :label="true"
                    v-model="addApply.install">是</el-radio>
          <el-radio :label="false"
                    v-model="addApply.install">否</el-radio>
        </el-form-item>
        <el-form-item label="开启二次密码保护">
          <el-radio :label="true"
                    v-model="addApply.security">是</el-radio>
          <el-radio :label="false"
                    v-model="addApply.security">否</el-radio>
        </el-form-item>
        <el-form-item label="应用介绍">
          <el-input type="textarea"
                    resize="none"
                    v-model="addApply.desc"
                    :rows="4"
                    placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="uploadAndroid">确 定</el-button>
        <el-button @click="androidVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 修改Android内部应用 -->
    <el-dialog title="修改Android内部应用"
               :visible.sync="updateAndroidVisible"
               size="small">
      <el-form ref="form"
               label-width="200px"
               label-position="left"
               :model="updateApply">
        <el-form-item label="文件名">
          <span>{{updateApply.name}}</span>
        </el-form-item>
        <el-form-item label="替换文件">
          <el-button type="info"
                     @click=""
                     size="small">上传文件</el-button>
          <input type="file"
                 ref="updateFile"
                 @change=""
                 style="display:none;">
          <el-input disabled
                    v-model="updateApply.fileName"
                    style="width:405px;"></el-input>
        </el-form-item>
        <el-form-item label="全局可见"
                      prop="global">
          <el-radio :label="true"
                    v-model="updateApply.global">是</el-radio>
          <el-radio :label="false"
                    v-model="updateApply.global">否</el-radio>
        </el-form-item>
        <el-form-item label="沙箱应用">
          <el-radio :label="true"
                    v-model="updateApply.sandBox">是</el-radio>
          <el-radio :label="false"
                    v-model="updateApply.sandBox">否</el-radio>
          <span style="color:red;">（仅支持企业内部应用）</span>
        </el-form-item>
        <el-form-item label="必须安装">
          <el-radio :label="true"
                    v-model="updateApply.install">是</el-radio>
          <el-radio :label="false"
                    v-model="updateApply.install">否</el-radio>
        </el-form-item>
        <el-form-item label="开启二次密码保护">
          <el-radio :label="true"
                    v-model="updateApply.security">是</el-radio>
          <el-radio :label="false"
                    v-model="updateApply.security">否</el-radio>
        </el-form-item>
        <el-form-item label="应用介绍">
          <el-input type="textarea"
                    resize="none"
                    v-model="updateApply.desc"
                    :rows="4"
                    placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="uploadAndroid">确 定</el-button>
        <el-button @click="updateAndroidVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import Pagination from 'components/common/pagination/index'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [
        {
          id: '1',
          icon: require('assets/images/apply/cpu-z.png'),
          name: 'CPU-Z',
          version: '2.2',
          platform: 'Android',
          status: '未扫描',
          origin: '内部',
          num: '0/0',
          date: '2018-04-11 14:52:16'
        },
        {
          id: '2',
          icon: require('assets/images/apply/wps-office.png'),
          name: 'WPS Office',
          version: '9.1.1',
          platform: 'Android',
          status: '未扫描',
          origin: '内部',
          num: '1/7',
          date: '2018-04-11 14:52:16'
        },
        {
          id: '3',
          icon: require('assets/images/apply/today.png'),
          name: '今日头条',
          version: '5.9.0',
          platform: 'Android',
          status: '扫描中',
          origin: '内部',
          num: '1/8',
          date: '2018-04-11 14:52:16'
        },
        {
          id: '4',
          icon: require('assets/images/apply/360.png'),
          name: '360清理大师',
          version: '5.2.5',
          platform: 'Android',
          status: '安全',
          origin: '内部',
          num: '2/11',
          date: '2018-04-11 14:52:16'
        }
      ],
      listQuery: {
        page: 1,
        size: 8
      },
      total: 10,
      addApply: {
        file: '',
        global: true,
        sandBox: false,
        install: true,
        security: false,
        desc: '',
        fileName: ''
      },
      updateApply: {
        file: '',
        global: true,
        sandBox: false,
        install: true,
        security: false,
        desc: '',
        fileName: '',
        name: ''
      },
      androidVisible: false,
      updateAndroidVisible: false
    }
  },
  created() {},
  methods: {
    // 显示新建android应用弹窗
    showAndroidDialog() {
      this.androidVisible = true
    },
    // 显示文件选择框
    uploadButtonClick() {
      this.$refs.uploadFile.value = ''
      this.$refs.uploadFile.click()
    },
    // 所选文件改变
    unpoadFileChange(e) {
      if (e.target.files.length !== 0) {
        this.addApply.file = e.target.files[0]
        this.addApply.fileName = e.target.files[0].name
      }
    },
    // 新建、编辑android应用确定
    uploadAndroid() {
      console.log(this.addApply)
      this.androidVisible = false
    },
    // 显示编辑android应用弹窗
    showUpdateAndroidDialog() {
      this.updateAndroidVisible = true
    },
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val
      console.log(this.listQuery)
    },
    // 转到推送详情页面
    goToPushPage() {
      this.$router.push('/adhibition/managepush')
    }
  }
}
</script>

<style lang="scss" scoped>
.handle-button {
  padding-bottom: 10px;
}
.contentTip {
  .tipOption {
    width: 100px;
    line-height: 30px;
    padding-left: 5px;
    &:hover {
      background-color: #50bfff;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
