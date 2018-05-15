<template>
  <section>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true" :model="formInline">
            <el-form-item label="级联搜索">
              <el-select v-model="formInline.cascade" placeholder="选择">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="登录名">
              <el-input v-model="formInline.account" placeholder="登录名称"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="formInline.user" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchTableList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right"></div>
      </div>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="border:1px solid #4074e1;">
            <h3 class="title" style="background-color:#4074e1;">选择用户组</h3>
            <el-tree
              ref="userGroupTree"
              empty-text="暂无数据"
              :data="userGroupList"
              :props="defaultProps"
              node-key="id"
              accordion
              highlight-current
              :current-node-key="treeData.checkedIds"
              :default-expanded-keys="treeData.expandedIds"
              @node-click="handleNodeClick">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="20" style="padding-left:10px;">
          <div class="button-bar" style="margin-bottom:10px;">
            <el-button type="primary" @click="userDialog('addUserGroup','basicUserGroupForm')">添加用户组</el-button>
            <el-button type="primary" @click="userDialog('modify', 'basicUserGroupForm')">修改用户组</el-button>
            <el-button type="primary" @click="submitUserDialog('delete')">删除用户组</el-button>
            <el-button type="primary" @click="userDialog('addDeviceUser', 'addDeviceForm')">添加设备用户</el-button>
            <el-button type="primary" @click="userDialog('addUserList', 'groupUserImportForm')">批量添加用户</el-button>
            <el-button type="primary" @click="submitUserDialog('exportDeviceUser')">设备用户导出</el-button>
          </div>
          <el-table :data="userGroupListData" style="width: 100%" class="customTable">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="account" label="登录名"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="delUser(scope.row)">删除</el-button>
                <el-button type="text" @click="changePwd(scope.row)">修改密码</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <pagination
        :total="total"
        :page="listQuery.page"
        :size="listQuery.size"
        @pageChange="pageChange"></pagination>
    </div>
    <!-- 添加用户组 / 修改用户组 弹窗 -->
    <el-dialog :title="basicDialogTitle" :visible.sync="basicDialogVisible" size="tiny">
      <el-form ref="basicUserGroupForm" :rules="basicRules" :model="basicUserGroupForm" label-position="left" label-width="120px">
        <el-form-item label="上级用户组名称" v-if="dialogType==='addUserGroup'">
          <el-input class="ronly_bg" v-model="basicUserGroupForm.parentName" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户组名称" prop="name">
          <el-input v-model="basicUserGroupForm.name"></el-input>
        </el-form-item>
        <p v-show="dialogType==='modify'&&rootNode" class="note_sty">组织机构根节点，不可修改名称。</p>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUserDialog(dialogType, 'basicUserGroupForm')">确 定</el-button>
        <el-button @click="basicDialogVisible = false; rootNode = false;">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 添加设备用户 -->
    <el-dialog title="添加设备用户" :visible.sync="addDeviceVisible" size="tiny">
      <el-form ref="addDeviceForm" :rules="deviceUserRules" :model="addDeviceForm" label-position="left" label-width="120px">
        <el-form-item label="登录名" prop="account">
          <el-input v-model="addDeviceForm.account"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addDeviceForm.email"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addDeviceForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="addDeviceForm.contacts"></el-input>
        </el-form-item>
        <el-form-item label="用户标签">
          <el-select class="user_auto_width" v-model="addDeviceForm.userTag" multiple placeholder="请选择">
            <el-option
              v-for="item in addDeviceForm.userTagOpt"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="addDeviceForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUserDialog('addDeviceUser', 'addDeviceForm')">确 定</el-button>
        <el-button @click="addDeviceVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 批量添加用户 -->
    <el-dialog title="批量添加用户" :visible.sync="uploadingVisible" size="tiny">
      <el-form ref="groupUserImportForm" :model="tempTemplate" label-width="150px">
        <el-form-item label="下载Excel文件模板 : ">
          <span class="download">XLS模板下载</span>
        </el-form-item>
        <el-form-item label="上传文件">
          <div class="upload">
            <el-input v-model="tempTemplate.imagePath"></el-input>
            <el-button class="scan" @click="handleUploadPath" style="position:absolute;top:0">浏览</el-button>
          </div>
          <span style="color:#ccc;padding:5px 0 5px 0;">类型只可为:xls/xlsx/csv。</span>
          <input type="file" name="image" ref="path" @change="handlePathChange($event)" style="display:none">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUserDialog('addUserList')">确 定</el-button>
        <el-button @click="uploadingVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 列表 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="modifyPwdVisible" size="tiny">
      <el-form ref="modifyPwdForm" :model="modifyPwdForm" label-width="120px">
        <el-form-item label="新密码">
          <el-input v-model="modifyPwdForm.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="modifyPwdForm.confirmNewPwd"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitModifyPwd">确定</el-button>
        <el-button @click="modifyPwdVisible=false">取消</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import Pagination from 'components/common/pagination/index'
let fileForm;
export default {
  components: {
    Pagination
  },
  data() {
    return {
      //列表搜索条件
      formInline: {
        account: '',
        user: '',
        cascade: 1,
        currentGroupId: -1   //当前选中的用户组
      },
      //用户组TreeData
      firstFlag: true,//标志是否请求列表
      userGroupList: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        id: 'id'
      },
      treeData: {
        checkedList: {},
        checkedIds: 0,
        expandedIds: []
      },
      userGroupListData: [],
      //修改密码
      modifyPwdVisible: false,
      modifyPwdForm: {
        newPwd: '',
        confirmNewPwd: ''
      },
      //弹窗title
      basicDialogTitle: '',
      dialogType: '',
      //添加用户组、修改用户组
      basicUserGroupForm: {
        parentName: '',
        name: ''
      },
      //Form校验
      basicRules: {
        name: [
          {required: true, message: '用户组名称不能为空', trigger: 'blur'}
        ]
      },
      //判断当前操作的节点是否是根节点
      rootNode: false,
      //添加设备用户
      addDeviceForm: {
        account: '',
        email: '',
        userName: '',
        contacts: '',
        description: '',
        userTag: [],
        userTagOpt: []
      },
      //添加设备用户表单校验
      deviceUserRules:{
        account: [
          {required: true, message: '登录名不能为空', trigger: 'blur'}
        ],
        email:[
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur, change'}
        ],
        userName: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ]
      },
      //批量添加用户
      tempTemplate: {
        imagePath: ''
      },
      radioValue: 1,
      basicDialogVisible: false,
      addDeviceVisible: false,
      uploadingVisible: false,
      listQuery: {
        page: 1,
        size: 15
      },
      total: 0
    }
  },
  methods: {
    //获取用户组list
    getUserGroupList(type) {
      this.$api.listGroup().then(res => {
        if (res && res.code === 200 && res.data) {
          this.userGroupList = this.$tree(res.data);
          if (this.userGroupList.length > 0 && (this.firstFlag || type === 'delete')) {
            this.formInline.currentGroupId = this.userGroupList[0].id;
            this.treeData.checkedList = this.userGroupList[0];
            this.treeData.checkedIds = this.userGroupList[0].id;
            this.treeData.expandedIds = [this.userGroupList[0].id];
            //获取用户列表数据
            this.getTableList();
            this.firstFlag = false;
          }
        }
      })
    },
    //获取用户列表数据
    getTableList() {
      let params = {
        account: this.formInline.account,
        username: this.formInline.user,
        cascade: this.formInline.cascade,
        groupId: this.formInline.currentGroupId,
        pageNo: this.listQuery.page
      };
      this.$api.getUserGroupManageList(params).then(res => {
        if (res && res.code === 200 && res.data) {
          this.total = res.data.Total;
          this.userGroupListData = res.data.Rows;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        this.$message.error(err.msg);
      })
    },
    //分页改变
    pageChange(val) {
      this.listQuery.page = val;
      this.getTableList();
    },
    //选择用户组 - 点击tree node
    handleNodeClick(data) {
      this.treeData.checkedList = data;
      this.formInline.currentGroupId = data.id;
      if (this.listQuery.page === 1) {
        this.getTableList();
      } else {
        this.listQuery.page = 1;
      }
    },
    //列表查询
    searchTableList() {
      if (this.listQuery.page === 1) {
        this.getTableList();
      } else {
        this.listQuery.page = 1;
      }
    },
    //列表 - 删除
    delUser(rowData) {
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteDeviceUser({id: rowData.id}).then(res => {
          if (res && res.code === 200) {
            this.getTableList();
            this.$message({
              type: 'success',
              message: res.msg
            })
          }
        })
      })
    },
    //列表 - 修改密码
    changePwd(rowData) {
      this.modifyPwdVisible = true;
    },
    //修改密码 - 提交
    submitModifyPwd() {
      this.modifyPwdVisible = false;
    },
    //批量添加用户 - 浏览
    handleUploadPath() {
      this.$refs.path.click()
    },
    //弹窗操作
    userDialog(type, formName) {
      this.dialogType = type;
      switch(type) {
        case 'addUserGroup':
          this.basicDialogTitle = '添加用户组';
          this.basicDialogVisible = true;
          this.basicUserGroupForm.parentName = this.treeData.checkedList.label;
          this.basicUserGroupForm.name = '';
          break;
        case 'modify':
          this.basicDialogTitle = '修改用户组';
          this.rootNode = false;
          this.basicDialogVisible = true;
          this.basicUserGroupForm.name = this.treeData.checkedList.label;
          break;
        case 'addDeviceUser':
          this.addDeviceVisible = true;
          break;
        case 'addUserList':
          this.tempTemplate.imagePath = '';
          this.uploadingVisible = true;
          break;
      }
    },
    //添加用户组等操作弹窗 - 确定
    submitUserDialog(type, formName) {
      switch(type) {
        case 'addUserGroup':
          this.$refs[formName].validate(valid => {
            if(valid) {
              this.$api.addUserGroup({pid: this.treeData.checkedList.id, name: this.basicUserGroupForm.name}).then(res => {
                if (res && res.code === 200) {
                  this.$refs[formName].resetFields();
                  this.basicDialogVisible = false;
                  this.getUserGroupList();
                }
              });
            } else {
              return false;
            }
          });
          break;
        case 'modify':
          //判断是否是根节点 - 根节点不允许修改名称
          this.rootNode = this.treeData.checkedList.id === this.userGroupList[0].id;
          if (this.rootNode) {
            return;
          }
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.$api.modifyUserGroup({id: this.treeData.checkedList.id, name: this.basicUserGroupForm.name}).then(res => {
                if (res && res.code === 200) {
                  this.$refs[formName].resetFields();
                  this.basicDialogVisible = false;
                  this.rootNode = false;
                  this.treeData.checkedList.label = this.basicUserGroupForm.name;//实时更新保存的变量
                  this.getUserGroupList();
                }
              })
            } else {
              return false;
            }
          });
          break;
        case 'delete':
          //判断是否是根节点 - 根节点不允许修改名称
          if (this.treeData.checkedList.id === this.userGroupList[0].id) {
            this.$message.error('该节点是根节点，不可删除！');
            return;
          }
          this.$api.deleteUserGroup({id: this.treeData.checkedList.id}).then(res => {
            if (res && res.code === 200) {
              this.getUserGroupList('delete');
            }
          });
          break;
        case 'addDeviceUser':
          this.$refs[formName].validate(valid => {
            if (valid) {
              let params = {
                account: this.addDeviceForm.account,
                email: this.addDeviceForm.email,
                username: this.addDeviceForm.userName,
                contacts: this.addDeviceForm.contacts,
                labelIds: this.addDeviceForm.userTag.join(';'),
                description: this.addDeviceForm.description,
                groupId: this.treeData.checkedList.id
              };
              this.$api.addDeviceUser(params).then(res => {
                if (res && res.code === 200) {
                  this.$refs[formName].resetFields();
                  this.getTableList();
                  this.addDeviceVisible = false;
                }
              })
            } else {
              return false;
            }
          });
          break;
        case 'addUserList':
          if(this.tempTemplate.imagePath) {
            this.$message.error('请先选择上传的文件!');
            return;
          }
          this.$api.groupUserImport(fileForm).then(res => {
            if (res && res.code === 200) {
              this.uploadingVisible = false;
            }
          });
          break;
        case 'exportDeviceUser':
          this.$api.downloadFile().then(res => {
            this.downloadFile(res);
          });
          break;
      }
    },
    //下载文件
    downloadFile (data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', 'excel.xls');
      document.body.appendChild(link);
      link.click();
    },
    //批量添加用户 - 上传
    handlePathChange(e) {
      let files = e.target.files;
      if (files) {
        fileForm = new FormData();
        fileForm.append('file', files[0]);
        this.tempTemplate.imagePath = files[0].name;
        if (!/\.(xls|xlsx|csv)$/.test(this.tempTemplate.imagePath)) {
          this.$message.error('文件类型只能为.xls、.xlsx、.csv中的一种');
          this.tempTemplate.imagePath = '';
          return false;
        }
      }
    },
    //获取用户标签下拉列表数据 - 添加设备用户弹窗
    getLabelList() {
      this.$api.getLabelList().then(res => {
        if (res && res.code === 200 && res.data) {
          this.addDeviceForm.userTagOpt = res.data || [];
        }
      })
    }
  },
  created() {
    this.getUserGroupList();
    this.getLabelList();
  },
  mounted() {
    //this.$refs.userGroupTree.setCurrentKey(0);
    //this.$refs.userGroupTree.setCurrentNode(this.userGroupList[0]);
  }
}
</script>

<style lang="scss" scoped>
.usergroup-container {
  .upload {
    display: flex;
  }
  .download {
    color: red;
    cursor: pointer;
  }
}
.note_sty{
  font-size: 8pt;
  color: red;
  margin-top: -23px;
}
</style>
