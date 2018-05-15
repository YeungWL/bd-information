<template>
  <section>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true"
                   :model="formInline"
                   class="search-form">
            <el-form-item label="平台类型：">
              <el-select v-model="formInline.region"
                         placeholder="请选择平台类型">
                <el-option label="Android"
                           value="Android"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签名称：">
              <el-input v-model="formInline.user"
                        placeholder="请填写标签名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-button type="primary"
                     @click="showAddLabelDialog">添加</el-button>
        </div>
      </div>
      <el-table :data="tableData"
                stripe
                style="width: 100%">
        <el-table-column prop="name"
                         label="标签名称"
                         width="140">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="showUpdateLabelDialog">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="platform"
                         label="平台">
        </el-table-column>
        <el-table-column prop="creator"
                         label="创建人">
        </el-table-column>
        <el-table-column prop="createTime"
                         label="创建时间">
        </el-table-column>
        <el-table-column prop="updateTime"
                         label="最近修改时间"></el-table-column>
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
    <!-- 添加应用标签 -->
    <el-dialog title="添加应用标签"
               :visible.sync="addLabelVisible"
               size="tiny">
      <el-form ref="form"
               label-width="100px"
               label-position="left"
               :model="addLabel">
        <el-form-item label="标签名称"
                      required
                      prop="">
          <el-input placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="平台"
                      prop="platform"
                      required>
          <el-select v-model="addLabel.platform"
                     placeholder="请选择">
            <el-option label="Android"
                       value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签介绍">
          <el-input type="textarea"
                    resize="none"
                    v-model="addLabel.desc"
                    :rows="4"
                    placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="addLabelVisible = false">确 定</el-button>
        <el-button @click="addLabelVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 修改应用标签 -->
    <el-dialog title="修改应用标签"
               :visible.sync="updateLabelVisible"
               size="tiny">
      <el-form ref="form"
               label-width="100px"
               label-position="left"
               :model="updateLabel">
        <el-form-item label="标签名称"
                      required
                      prop="">
          <el-input placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="平台"
                      prop="platform"
                      required>
          <el-select v-model="addLabel.platform"
                     placeholder="请选择"
                     disabled>
            <el-option label="Android"
                       value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用介绍">
          <el-input type="textarea"
                    resize="none"
                    v-model="updateLabel.desc"
                    :rows="4"
                    placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="updateLabelVisible = false">确 定</el-button>
        <el-button @click="updateLabelVisible = false">取 消</el-button>
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
                             prop="version"></el-table-column>
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
                             prop="version"></el-table-column>
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
          id: '1',
          name: '123',
          platform: 'Android',
          creator: '测试组1',
          createTime: '2018-03-26 16:46:05',
          updateTime: '2018-03-26 16:46:05'
        },
        {
          id: '2',
          name: '231',
          platform: 'Android',
          creator: '测试组2',
          createTime: '2018-03-26 16:46:05',
          updateTime: '2018-03-26 16:46:05'
        }
      ],
      listQuery: {
        page: 1,
        size: 8
      },
      total: 10,
      addLabel: {
        platform: '1'
      },
      updateLabel: {},
      addLabelVisible: false,
      updateLabelVisible: false,
      configureVisible: false,
      list: [
        {
          id: '1',
          icon: icon1,
          name: 'CPU-Z',
          version: '2.2',
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
  created() {},
  methods: {
    // 显示添加标签弹窗
    showAddLabelDialog() {
      this.addLabelVisible = true
    },
    // 显示编辑标签弹窗
    showUpdateLabelDialog() {
      this.updateLabelVisible = true
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
    }
  }
}
</script>

<style lang="scss" scoped>
.handle-button {
  padding-bottom: 10px;
}
.configureBox {
  height: 300px;
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
}
</style>
