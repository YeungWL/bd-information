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
              <el-form-item label="黑名单名称：">
                <el-input v-model="formInline.user"
                          placeholder="请填写黑名单名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-button type="primary"
                       @click="showAddBlackListDialog">添加</el-button>
          </div>
        </div>
        <el-table :data="tableData"
                  stripe
                  style="width: 100%">
          <el-table-column prop="name"
                           label="黑名单名称"
                           width="140">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="showEditBlackListDialog(scope.row)">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="platform"
                           label="平台">
          </el-table-column>
          <el-table-column prop="push"
                           label="有效下发/推送总数"
                           min-width="160">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="goToPushPage">{{scope.row.push}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="createTime"
                           label="创建时间"
                           min-width="160">
          </el-table-column>
          <el-table-column prop="updateTime"
                           label="最近修改时间"
                           min-width="160"></el-table-column>
          <el-table-column prop="pushTime"
                           label="最近推送时间"
                           min-width="160"></el-table-column>
          <el-table-column label="操作"
                           width="180">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="showConfigureDialog">配置</el-button>
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
    <!-- 添加/修改黑名单 -->
    <el-dialog :title="editListForm?'编辑黑名单':'添加黑名单'"
               :visible.sync="addListVisible"
               class="addListFormDialog"
               size="small">
      <el-form ref="form"
               label-width="100px"
               label-position="left"
               :model="addListForm">
        <div style="width:50%;display:inline-block;vertical-align:top;">
          <el-form-item label="黑名单名称"
                        required
                        prop="">
            <el-input placeholder=""
                      style="width:210px;"
                      v-model="addListForm.name"></el-input>
          </el-form-item>
          <el-form-item label="平台"
                        prop="platform"
                        required>
            <el-select v-model="addListForm.platform"
                       style="width:210px;"
                       placeholder="请选择">
              <el-option label="Android"
                         value="1"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="width:48%;display:inline-block;vertical-align:top;">
          <el-form-item label="黑名单介绍">
            <el-input v-model="addListForm.desc"
                      type="textarea"
                      resize="none"
                      :rows="4"
                      placeholder=""></el-input>
          </el-form-item>
        </div>
        <el-form-item label="高级设置">
          <el-button type="text"
                     @click="handelTimePlan">{{timePlanToggle?'隐藏':'显示'}}时间方案</el-button>
        </el-form-item>
        <transition name="fade">
          <section v-if="timePlanToggle">
            <el-form-item label="方案名称">
              <el-input disabled></el-input>
            </el-form-item>
            <el-form-item label="方案描述">
              <el-input type="textarea"
                        resize="none"
                        :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="生效时间段">
              <el-form-item label="上午"
                            label-width="50px"
                            style="display:inline-block;vertical-align:top;width:260px;">
                <el-time-picker is-range
                                v-model="addListForm.amTime"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围">
                </el-time-picker>
              </el-form-item>
              <el-form-item label="下午"
                            label-width="50px"
                            style="display:inline-block;vertical-align:top;">
                <el-time-picker is-range
                                v-model="addListForm.pmTime"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围">
                </el-time-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="生效星期">
              <el-checkbox-group v-model="addListForm.day">
                <el-checkbox label="一"></el-checkbox>
                <el-checkbox label="二"></el-checkbox>
                <el-checkbox label="三"></el-checkbox>
                <el-checkbox label="四"></el-checkbox>
                <el-checkbox label="五"></el-checkbox>
                <el-checkbox label="六"></el-checkbox>
                <el-checkbox label="日"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="失效日期">
              <el-date-picker v-model="addListForm.limitTime"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </section>
        </transition>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="addListVisible = false">确 定</el-button>
        <el-button @click="addListVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 配置应用 -->
    <el-dialog title="配置应用"
               :visible.sync="configureVisible"
               class="configureDialog"
               size="small">
      <div class="configureBox">
        <div class="left">
          <div class="header-search">
            <el-form :inline="true">
              <el-form-item label="应用名称：">
                <el-input placeholder="请输入应用名称"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom:0;">
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-table :data="list"
                    @selection-change="handleLeftChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="图标"
                             prop="icon">
              <template slot-scope="scope">
                <img :src="scope.row.icon"
                     :alt="scope.row.name"
                     style="height:40px;weight:40px;margin:5px;" />
              </template>
            </el-table-column>
            <el-table-column label="名称"
                             prop="name"></el-table-column>
            <el-table-column label="版本"
                             show-overflow-tooltip
                             prop="packageName"></el-table-column>
          </el-table>
        </div>
        <div class="middle">
          <el-button @click="addConfig"
                     size="small"
                     type="primary">添加</el-button>
          <hr style="visibility:hidden;">
          <el-button @click="deleteConfig"
                     size="small"
                     type="primary">删除</el-button>
        </div>
        <div class="right">
          <div class="header-search">
            <div style="font-size:12px;height:42px;line-height:28px;">已选应用列表</div>
          </div>
          <el-table :data="selectList"
                    @selection-change="handleRightChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="图标"
                             prop="name">
              <template slot-scope="scope">
                <img :src="scope.row.icon"
                     :alt="scope.row.name"
                     style="height:40px;weight:40px;margin:5px;" />
              </template>
            </el-table-column>
            <el-table-column label="名称"
                             prop="name"></el-table-column>
            <el-table-column label="版本"
                             show-overflow-tooltip
                             prop="packageName"></el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="configureVisible=false"
                   type="primary">确定</el-button>
        <el-button @click="configureVisible=false">取消</el-button>
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
    const icon1 = require('assets/images/apply/cpu-z.png')
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [
        {
          name: '今日头条',
          platform: 'Android',
          push: '6/9',
          createTime: '2018-03-26 16:47:12',
          updateTime: '2018-04-17 15:28:17',
          pushTime: '2018-04-11 11:15:59'
        },
        {
          name: 'qq',
          platform: 'Android',
          push: '2/4',
          createTime: '2018-03-26 16:47:12',
          updateTime: '2018-04-17 15:28:17',
          pushTime: '2018-04-11 11:15:59'
        }
      ],
      listQuery: {
        page: 1,
        size: 8
      },
      total: 10,
      addListVisible: false,
      addListForm: {
        name: '',
        platform: '',
        desc: '',
        planName: '',
        planDesc: '',
        amTime: [new Date(2018, 4, 18, 8, 0), new Date(2018, 4, 18, 12, 0)],
        pmTime: [new Date(2018, 4, 18, 13, 0), new Date(2018, 4, 18, 18, 0)],
        day: [],
        limitTime: ''
      },
      editListForm: false,
      timePlanToggle: false,
      configureVisible: false,
      list: [
        {
          id: '1',
          icon: icon1,
          name: 'CPU-Z',
          packageName: 'efegeggeewee33rffwqewwqwdgewqgwe',
          platform: 'Android',
          status: '未扫描',
          origin: '内部',
          num: '0/0',
          date: '2018-04-11 14:52:16'
        }
      ],
      selectList: [],
      leftSelection: [],
      rightSelection: []
    }
  },
  methods: {
    // 显示添加黑名单弹窗
    showAddBlackListDialog() {
      this.editListForm = false
      this.addListVisible = true
    },
    // 显示/隐藏时间方案
    handelTimePlan() {
      this.timePlanToggle = !this.timePlanToggle
    },
    // 显示修改黑名单弹窗
    showEditBlackListDialog() {
      this.editListForm = true
      this.addListVisible = true
    },
    // 显示配置应用弹窗
    showConfigureDialog() {
      this.configureVisible = true
    },
    // 配置左边表格多选改变
    handleLeftChange(val) {
      console.log(val)
      this.leftSelection = val
    },
    // 添加配置
    addConfig() {
      if (this.leftSelection.length === 0) {
        this.$message.warning('请选择应用')
      } else if (this.selectList.length > 0) {
        this.$message.warning('应用已添加')
      } else {
        this.selectList.push(...this.leftSelection)
      }
    },
    // 配置右边表格多选改变
    handleRightChange(val) {
      console.log(val)
      this.rightSelection = val
    },
    // 删除配置
    deleteConfig() {
      if (this.rightSelection.length === 0) {
        this.$message.warning('请选择应用')
      } else {
        this.selectList = []
      }
    },
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val
      console.log(this.listQuery)
    },
    // 前往黑名单下发子页面
    goToPushPage() {
      this.$router.push('/adhibition/blacklistpush')
    }
  }
}
</script>
<style lang="scss" scoped>
.handle-button {
  padding-bottom: 10px;
}
.addListFormDialog {
  & /deep/ .el-dialog {
    top: 3% !important;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.configureBox {
  height: 400px;
  display: flex;
  .left {
    flex: 0 0 50%;
    height: 100%;
    border: 1px solid #eeeeee;
  }
  .middle {
    flex: 0 0 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 100px 5px;
  }
  .right {
    flex: 1;
    height: 100%;
    border: 1px solid #eeeeee;
  }
}
.configureDialog /deep/ .el-dialog {
  width: 68%;
  top: 7% !important;
}
</style>
