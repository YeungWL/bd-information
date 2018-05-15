<template>
  <div>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form ref="policyForm" :inline="true" :model="policyForm">
            <el-form-item label="策略名称">
              <el-input v-model="policyForm.name" placeholder="请输入策略名称"></el-input>
            </el-form-item>
            <el-form-item label="平台类型">
              <el-select v-model="policyForm.platform" placeholder="请选择平台类型">
                <el-option
                  v-for="(item,index) in platformList"
                  :label="item.label"
                  :value="item.value"
                  :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchPolicyList" style="padding:8px 20px;">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-button type="primary" @click="addPolicy">添加</el-button>
          <el-button type="primary" @click="getPolicyList">刷新</el-button>
        </div>
      </div>
      <el-table :data="policyList" stripe style="width: 100%">
        <el-table-column label="策略名称" min-width="140">
          <template slot-scope="scope">
            <span style="cursor:pointer;color:#428bca" @click="strategyTemplate(scope.row)">
              {{scope.row.name}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="是否默认" width="90">
          <template slot-scope="scope">
            <span :class="{default:scope.row.is_default===1}"></span>
          </template>
        </el-table-column>
        <el-table-column label="策略状态" width="90">
          <template slot-scope="scope">
            <div>{{status(scope.row.status)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="安装数/推送总数" width="130">
          <template slot-scope="scope">
            <span>{{scope.row.installNum}}/{{scope.row.pushNum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="平台类型" width="90">
          <template slot-scope="scope">
            <span :class="{apple: scope.row.platform===2, android: scope.row.platform===1}"></span>
          </template>
        </el-table-column>
        <el-table-column prop="visible" label="可见性" width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.visiable===1">公开</span>
            <span v-if="scope.row.visiable===0">私有</span>
          </template>
        </el-table-column>
        <el-table-column prop="version" label="发布版本" width="90"></el-table-column>
        <el-table-column prop="creator" label="创建人" min-width="120"></el-table-column>
        <el-table-column prop="update_time" label="最近修改时间" width="160"></el-table-column>
        <el-table-column prop="push_time" label="最近推送时间" width="160"></el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="history(scope.row.id)">历史</el-button>
            <el-button type="text" @click="policyPush(scope.row.id)">推送</el-button>
            <el-button type="text" @click="remove(scope.row.id)">删除</el-button>
            <el-button type="text" @click="settingDefault(scope.row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :page="listQuery.page"
        :size="listQuery.size"
        @pageChange="pageChange"></pagination>
    </div>
    <!-- 添加策略 start -->
    <el-dialog title="添加策略" :visible.sync="addFormVisible" class="customDialog">
      <el-form ref="addPolicyForm" :rules="addFormRules" :model="addPolicyForm" label-width="120px">
        <el-form-item label="策略名称" prop="name">
          <el-input v-model="addPolicyForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择平台">
          <el-select v-model="addPolicyForm.platform" placeholder="请选择平台类型" @change="getPolicyOpt">
            <el-option
              v-for="(item,index) in platformList"
              :label="item.label"
              :value="item.value"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择策略模板" prop="template">
          <el-select v-model="addPolicyForm.template" placeholder="请选择策略类型">
            <el-option
              v-for="(item,index) in platTempList"
              :label="item.name"
              :value="item.id"
              :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可见性">
          <el-select v-model="addPolicyForm.visiable" placeholder="请选择可见类型">
            <el-option
              v-for="(item,index) in visibleList"
              :label="item.label"
              :value="item.value"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddPolicy('addPolicyForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加策略 end -->
    <!-- 策略推送 start -->
    <el-dialog title="策略推送" :visible.sync="pushDialogVisible">
      <el-row>
        <el-col :span="12">
          <h3>用户组</h3>
          <el-tree
            :data="userGroupList"
            node-key="id"
            ref="tree"
            accordion
            highlight-current
            :current-node-key="treeData.checkedIds"
            :default-expanded-keys="treeData.expandedIds"
            @node-click="handleNodeClick"
            :props="defaultProps">
          </el-tree>
        </el-col>
        <el-col :span="12">
          <el-row style="padding:0 10px;margin-bottom:5px;">
            <el-col :span="24">
              <h3>单个设备</h3>
              <el-form :model="deviceForm" label-width="0px">
                <el-form-item label="" style="margin-bottom:5px;">
                  <el-input v-model="deviceForm.name" auto-complete="on" placeholder="查询关键字"></el-input>
                </el-form-item>
              </el-form>
              <div style="padding:10px;margin-bottom:5px;background-color:#ddd;border-radius: 3px;">
                <table class="deviceList">
                  <tr v-for="(item,index) in deviceList" :key="index">
                    <td>{{item.name}}</td>
                    <td>
                      <span class="delete" @click="deleteDevice(item)"></span>
                    </td>
                  </tr>
                </table>
              </div>
            </el-col>
            <el-col :span="24">
              <el-form :model="labelForm" label-width="50px">
                <el-form-item label="标签" style="margin-bottom:5px;">
                  <el-input
                    v-model="labelForm.name"
                    auto-complete="off"
                    placeholder="标签"
                    style="width:180px;"></el-input>
                  <el-button type="primary" @click="searchLabel">搜索</el-button>
                </el-form-item>
              </el-form>
              <div style="padding:10px;background-color:#ddd;border-radius: 3px;">
                <table class="deviceList">
                  <tr v-for="(item,index) in labelList" :key="index">
                    <td>
                      <el-checkbox v-model="item.checked" @change="setChecked(item)"></el-checkbox>
                    </td>
                    <td>{{item.name}}</td>
                    <td style="text-align: center">{{item.sort}}</td>
                  </tr>
                </table>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary">保存</el-button>
      </div>
    </el-dialog>
    <!-- 策略推送 end -->
  </div>
</template>
<script>
import Pagination from 'components/common/pagination/index'
export default {
  name: 'strategyList',
  components: {
    Pagination
  },
  data() {
    return {
      //推送 弹窗 数据
      userGroupList: [],
      treeData: {
        checkedList: {},
        checkedIds: 0,
        expandedIds: []
      },
      defaultProps: {
        id: 'id',
        children: 'children',
        label: 'label'
      },
      deviceList: [
        { name: 'MI 3C -- liangjunfeng' },
        { name: 'MI 3C -- liangjunfeng' }
      ],
      labelList: [
        {
          checked: false,
          name: 'zy测试 [admin]',
          sort: '用户'
        },
        {
          checked: false,
          name: '产品测试',
          sort: '用户'
        }
      ],
      deviceForm: {
        name: ''
      },
      labelForm: {
        name: ''
      },
      //列表搜索
      platformList: [
        { label: 'Android', value: 1},
        { label: 'iOS', value: 2}
      ],
      policyForm: {
        name: '',
        platform: ''
      },
      //策略列表
      policyList: [],
      //列表分页
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      //添加策略 - 弹窗数据
      addFormVisible: false,
      platTempList: [],
      visibleList: [
        { label: '公开', value: 1},
        { label: '私有', value: 0}
      ],
      addPolicyForm: {
        name: '',
        platform: 1,
        template: -1,
        visiable: 0
      },
      //添加策略 - form校验
      addFormRules: {
        name: [
          {required: true, message: '策略名称不能为空', trigger: 'blur'},
          {required: true, message: '策略模板不能为空', trigger: 'blur'}
        ]
      },
      pushDialogVisible: false
    }
  },
  methods: {
    getPolicyList() {
      let params = {
        name: this.policyForm.name,
        platform: this.policyForm.platform ? this.policyForm.platform : -1,
        pageNo: this.listQuery.page
      };
      this.$api.getPolicyList(params).then(res => {
        if (res && res.code === 200 && res.data) {
          this.policyList = res.data.Rows || [];
          this.total = res.data.Total;
        }
      })
    },
    //策略状态转换
    status(item) {
      let statusName = '';
      if (item === 1) {
        statusName = '已发送'
      } else if (item === 0) {
        statusName = '未发送'
      }
      return statusName
    },
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val;
      this.getPolicyList();
    },
    //列表搜索
    searchPolicyList() {
      if (this.listQuery.page === 1) {
        this.getPolicyList();
      } else {
        this.listQuery.page = 1;
      }
    },
    //添加策略
    addPolicy() {
      this.addFormVisible = true;
      this.$nextTick(() => {
        this.$refs.addPolicyForm.resetFields();
      })
    },
    //添加策略 - 策略模板下拉列表
    getPolicyOpt() {
      this.$api.getPolicyOpt({platform: this.addPolicyForm.platform}).then(res => {
        if (res && res.code === 200) {
          this.platTempList = res.data || [];
          this.addPolicyForm.template = this.platTempList.length > 0 ? this.platTempList[0].id : '';
        }
      })
    },
    //添加策略 - 弹窗 确定
    submitAddPolicy(formName) {
      let params = {
        name: this.addPolicyForm.name,
        platform: this.addPolicyForm.platform,
        parent_policy_id: this.addPolicyForm.template,
        visiable: this.addPolicyForm.visiable
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.addPolicy(params).then(res => {
            if (res && res.code === 200) {
              this.getPolicyList();
              this.addFormVisible = false;
            }
          })
        } else {
          return false;
        }
      })
    },
    //策略详情 - 点击策略名称
    strategyTemplate(item) {
      this.$router.push({
        path: '/strategy/list/strategyTemplate',
        query: {policyItem: item}
      })
    },
    //查看历史策略
    history(id) {
      this.$router.push({
        path: '/strategy/list/historyList',
        query: {id: id}
      });
    },
    //推送
    policyPush(item) {
      //TODO
      this.pushDialogVisible = true;
    },
    //获取 推送弹窗 的用户组数据
    getUserGroup() {
      this.$api.listGroup().then(res => {
        if (res && res.code === 200 && res.data) {
          this.userGroupList = this.$tree(res.data);
          if (this.userGroupList.length > 0) {
            this.treeData.checkedList = this.userGroupList[0];
            this.treeData.checkedIds = this.userGroupList[0].id;
            this.treeData.expandedIds = [this.userGroupList[0].id]
          }
        }
      })
    },
    //删除策略
    remove(id) {
      this.$confirm('您确定要删除吗?', '删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.$api.deletePolicy({id: id}).then(res => {
          if (res && res.code === 200) {
            this.getPolicyList();
            this.$message({type: 'success',message: res.msg})
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
        })
    },
    //设置默认
    settingDefault() {
      this.$confirm('确定设置当前策略为默认策略吗？', '默认策略', {
        confirmButtonText: '设置',
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '设置成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消设置'
          })
        })
    },
    //推送 弹窗 树节点点击事件
    handleNodeClick(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    //单个设备 删除
    deleteDevice(item) {
      console.log(item)
    },
    //标签搜索
    searchLabel() {
      //this.$api.searchLabel({name: this.labelForm.name}).then(res => {})
    },
    setChecked(item) {
      item.checked = !item.checked;
    }
  },
  created() {
    //获取策略列表
    this.getPolicyList();
    //获取策略模板下拉列表数据
    this.getPolicyOpt();
    //获取 推送弹窗 用户组数据
    this.getUserGroup();
  }
}
</script>
<style>
.text-green {
  color: #13ce66;
}
.text-danger {
  color: #ff4949;
}
</style>
