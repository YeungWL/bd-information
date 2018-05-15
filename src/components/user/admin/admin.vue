<template>
  <section>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true"
                   :model="formInline">
            <el-form-item label="登录名">
              <el-input v-model="formInline.account" clearable
                        placeholder="登录名"></el-input>
            </el-form-item>
            <el-form-item label="角色" clearable>
              <el-select v-model="formInline.roleId"
                         placeholder="角色">
                <el-option :label="item.name" v-for="(item,index) in roleList" :key="index"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-button type="primary"
                     @click="addMaster">添加管理员</el-button>
        </div>
      </div>

      <el-table :data="tableData"
                style="width: 100%"
                class="customTable">
        <el-table-column prop="account"
                         label="登录名"
                         min-width="140">
        </el-table-column>
        <el-table-column
                         label="用户名"
                         width="90">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="showAmendDialog(scope.row)">{{scope.row.username}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="creator"
                         label="创建人"
                         width="90">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱"
                         width="140">
        </el-table-column>
        <el-table-column
                         label="角色"
                         width="100">
             <template slot-scope="scope">
                <span>{{getRoleName(scope.row.type)}}</span>
             </template>
        </el-table-column>
        <el-table-column prop="status"
                         label="状态"
                         width="90">
             <template slot-scope="scope">
                  <span style="color:rgb(0, 128, 0);">{{getStatusName(scope.row.status)}}</span>
             </template>
        </el-table-column>
        <el-table-column prop="create_time"
                         label="创建时间"
                         min-width="140">
        </el-table-column>
        <el-table-column label="操作"
                         min-width="240">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="showPasswordDialog(scope.row)">修改密码</el-button>
            <el-button type="text"
                       @click="showSectionDialog(scope.row)">分配部门</el-button>
            <el-button type="text"
                       @click="showRoleDialog(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total"
                  :page="formInline.pageNo"
                  :size="listQuery.size"
                  @pageChange="pageChange"></pagination>
    </div>
    <!-- 修改管理员 -->
    <el-dialog title="修改管理员"
               :visible.sync="amendVisible"
               size="tiny">
      <el-form ref="updateForm"
               :rules="rules"
               :model="updateAdminUserParam"
               label-width="80px">
        <el-form-item label="登录名" prop="account">
          <el-input v-model="updateAdminUserParam.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateAdminUserParam.email"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="updateAdminUserParam.username"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="updateAdminUserParam.contacts"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio class="radio"
                    v-model="updateAdminUserParam.status"
                    :label="1" value="1">激活</el-radio>
          <el-radio class="radio"
                    v-model="updateAdminUserParam.status"
                    :label="0"  value="0">未激活</el-radio>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="updateAdminUserParam.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="submit('updateForm')">确 定</el-button>
        <el-button @click="amendVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 分配部门 -->
    <el-dialog title="分配部门"
               :visible.sync="sectionVisible"
               size="tiny">
      <span>
        <el-tree :data="treeData"
                 show-checkbox
                 :props="defaultProps"
                 ref="sectionTree"
                 @check-change="handleCheckChange">
        </el-tree>
      </span>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="assignDepartment">确 定</el-button>
        <el-button @click="sectionVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色"
               :visible.sync="roleVisible"
               size="tiny">
      <div>
        <el-form :inline="true"
                 :model="assignRole"
                 class="search-form">
          <el-form-item label="角色名">
            <el-input v-model="assignRole.name"
                      placeholder="角色名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="searchRoleList">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="assignRoleList"
                  ref="multipleTable"
                  style="width: 100%;height:200px;overflow: auto;"
                  @selection-change="handleSelectionChange"
                  class="customTable">
          <el-table-column type="selection"
                           width="150">
          </el-table-column>
          <el-table-column prop="name"
                           label="角色名">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="assignRoleSubmit">确 定</el-button>
        <el-button @click="roleVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 添加管理员 -->
    <el-dialog title="添加管理员"
               :visible.sync="addVisible"
               size="tiny">
      <el-form  ref="ruleForm"
                :rules="rules"
               :model="addAdminUser"
               label-width="80px">
        <el-form-item label="登录名" prop="account">
          <el-input v-model="addAdminUser.account"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"  prop="email">
          <el-input v-model="addAdminUser.email"></el-input>
        </el-form-item>
        <el-form-item label="用户名"  prop="username">
          <el-input v-model="addAdminUser.username"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" >
          <el-input v-model="addAdminUser.contacts"></el-input>
        </el-form-item>
        <el-form-item label="状态"  prop="status">
          <el-radio class="radio"
                    v-model="addAdminUser.status"
                    label='1' value="1">激活</el-radio>
          <el-radio class="radio"
                    v-model="addAdminUser.status"
                    label='0' value="0">未激活</el-radio>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="addAdminUser.description"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="addVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog title="修改密码"
               :visible.sync="passwordVisible"
               size="tiny">
      <el-form ref="updatePasswordForm"
               :rules="rules"
               :model="updatePassword"
               label-width="80px">
        <el-form-item label="新密码" prop="newpassword">
          <el-input type="password" v-model="updatePassword.newpassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordConfirm">
          <el-input type="password" v-model="updatePassword.passwordConfirm"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="updatePasswordSubmit('updatePasswordForm')">确 定</el-button>
        <el-button @click="passwordVisible = false">取 消</el-button>
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
    var  validatePass=(rule, value, callback)=>{
     // console.log(value);
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value !== this.updatePassword.newpassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      roleList:[],
      assignRoleList:[],
      formInline: {
        account: '',
        roleId: -1,
        pageNo:1
      },
      tableData: [
//        {
//          date: '2016-05-02',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1518 弄',
//          status: '在线',
//          role: '管理员',
//          creator: '张三',
//          email: '11131@qq.com'
//        },
//        {
//          date: '2016-05-04',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1517 弄',
//          status: '在线',
//          role: '管理员',
//          creator: '张三',
//          email: '11131@qq.com'
//        },
//        {
//          date: '2016-05-01',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1519 弄',
//          status: '在线',
//          role: '管理员',
//          creator: '张三',
//          email: '13231@qq.com'
//        },
//        {
//          date: '2016-05-03',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1516 弄',
//          status: '在线',
//          role: '管理员',
//          creator: '张三',
//          email: '23231@qq.com'
//        }
      ],
      //添加管理员
      addAdminUser:{
        account:'',
        email:'',
        username:'',
        contacts:'',
        status:'',
        description:''
      },
      rules: {
        account: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
        ],
        email: [
          { type: 'email',required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        passwordConfirm:[
//          {required:true,message:'请输入密码',trigger:'blur'},
          {validator:validatePass, trigger: 'blur'}
        ],
        username: [
          {  required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        status: [
          {  required: true, message: '请选择状态', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写描述', trigger: 'blur' }
        ]
      },

      //修改管理员
      updateAdminUserParam:{
        id:'',
        account:'',
        email:'',
        username:'',
        contacts:'',
        status:1,
        description:''
      },
      //修改密码
      updatePassword:{
        id:'',
        newpassword:'',
        passwordConfirm:'',
      },
  //分配角色
      assignRole:{
        id:'',
        roleIds:''
      },
      //选择的角色
      multipleSelection:[],
      roleListArr:[],
      form: {
        name: '',
        radio: '1'
      },
      treeData: [
//        {
//          label: '一级 1',
//          children: [
//            {
//              label: '二级 1-1'
//            }
//          ]
//        },
//        {
//          label: '一级 2',
//          children: [
//            {
//              label: '二级 2-1'
//            }
//          ]
//        }
      ],
      updateUserGroup:{
        id:'',
        groupIds:''
      },
      selectedUserGroup:[],
      defaultProps: {
        // 树形控件规则
        children: 'children',
        label: 'label',
        id:'id',
        pid:'pid'
      },
      amendVisible: false,
      sectionVisible: false,
      roleVisible: false,
      addVisible: false,
      passwordVisible: false,
      listQuery: {
        size: 20
      },
      total: 10
    }
  },
  mounted(){
    this.listRole();
    this.adminUserList(this.formInline);
    this.listGroup();
  },
  methods: {
    //分配提交
    assignDepartment(){
      if(this.selectedUserGroup.length){
        this.selectedUserGroup.forEach((item,index)=>{
          if(index){
            this.updateUserGroup.groupIds+=';'+item.id;
          }else{
            this.updateUserGroup.groupIds+=item.id;
          }
        })
        this.updateAdminUserGroup(this.updateUserGroup);
      }else{
        this.$message({
          showClose: false,
          message: '您未选择组',
          type: 'info'
        });
      }
    },
    //分布部门
    updateAdminUserGroup(data){
      this.$api.updateAdminUserGroup(data).then(res=>{
         if(res.code==200){
            this.sectionVisible=false;
           this.$message({
             showClose: false,
             message: '分配部门成功',
             type: 'success'
           });
           this.adminUserList(this.formInline);
           this.$refs.sectionTree.setCheckedKeys([]);
         }
      })
    },
     //获取用户组列表
    listGroup(){
      this.$api.listGroup().then(res=>{
         if(res.code==200){
          this.treeData=this.$tree(res.data);
          //console.log(this.treeData);
         }
      })
    },
    //分配角色
    updateUserRole(data){
      this.$api.updateUserRole(data).then(res=>{
        if(res.code==200){
          this.roleVisible = false;
          this.$message({
            showClose: false,
            message: '角色修改成功',
            type: 'success'
          });
          this.$refs.multipleTable.clearSelection();
          this.adminUserList(this.formInline);
        }
      })
    },
    assignRoleSubmit(){
      this.assignRole.roleIds='';
      if(this.multipleSelection.length){
        this.multipleSelection.forEach((item,index)=>{
         if(index){
           this.assignRole.roleIds+=';'+item.id;
         }else{
           this.assignRole.roleIds+=item.id;
         }
        });
        this.updateUserRole(this.assignRole);
//        console.log(this.assignRole);
      }else{
        this.$message({
          showClose: false,
          message: '您未选择角色',
          type: 'info'
        });
      }
    },
    //
    searchRoleList(){
      this.assignRoleList=[];
      if(this.assignRole.name==''){
        this.assignRoleList=this.roleListArr;
      }else{
        this.assignRoleList=this.roleListArr.filter((item)=>{
          if(item.name==this.assignRole.name){
            return item;
          }})
      }

     // console.log(this.assignRoleList);
    },
    //选择角色
    handleSelectionChange(v){
       this.multipleSelection=v;
       // console.log(v);
    },
    //角色下拉列表
    listRole(){
      this.$api.listRole().then(res=>{
         if(res.code==200){
           this.assignRoleList=JSON.parse(JSON.stringify(res.data));
           this.roleListArr=JSON.parse(JSON.stringify(res.data));
           //console.log(this.assignRoleList);
           this.roleList=JSON.parse(JSON.stringify(res.data));
           this.roleList.unshift({name:'请选择',id:-1})
         }
      })
    },
    //修改密码
    updatePasswordSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
//          alert('submit!');
          this.updateOthersPwd(this.updatePassword);
        } else {
          return false;
        }
      });
    },
    //修改登录密码
    updateOthersPwd(data){
      this.$api.updateOthersPwd(data).then(res=>{
         if(res.code==200){
           this.passwordVisible = false;
           this.$message({
             showClose: false,
             message: '密码修改成功',
             type: 'success'
           });
         }
      })
    },
    //更新
    submit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('hello');
//          this.addVisible=false;
          this.updateAdminUser(this.updateAdminUserParam);
//          alert('submit!');
        } else {
          return false;
        }
      });
    },
    //更新用户
    updateAdminUser(data){
      this.$api.updateAdminUser(data).then(res=>{
         if(res.code==200){
           this.amendVisible=false;
           this.$message({
             showClose: false,
             message: '管理员修改成功',
             type: 'success'

           });
           this.adminUserList(this.formInline);
         }else{
           this.$message.error(res.message);
         }
      })
    },
    //根据id获取指定用户
    findById(data){
      this.$api.findById(data).then(res=>{
         if(res.code==200){
            this.updateAdminUserParam=res.data;
         }
      })
    },
    addMaster(){
      this.addVisible = true;
      this.addAdminUser={
        account:'',
          email:'',
          username:'',
          contacts:'',
          status:'',
          description:''
      }
    },
    //添加
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addVisible=false;
          this.saveAdminUser(this.addAdminUser);
//          alert('submit!');
        } else {
          return false;
        }
      });
    },
    //添加管理员
    saveAdminUser(data){
      let _this=this;
      this.$api.saveAdminUser(data).then(res=>{
         if(res.code==200){

           _this.$message({
             showClose: false,
             message: '添加管理员成功',
             type: 'success'
           });
           _this.adminUserList(_this.formInline);
         }else{
           _this.$message.error(res.data);
         }
      })
    },
    //查询类别
    search(){
      this.adminUserList(this.formInline);
    },
    //管理员列表
    adminUserList(data){
       this.$api.adminUserList(data).then(res=>{
           if(res.code==200){
              this.tableData=res.data.Rows;
              this.total=res.data.Total;
           }else{
              this.$message.error(res.data);
           }
       })
    },
    //获取状态名称
    getStatusName(status){
       return status?'激活':'未激活';
    },
    //获取角色名称
    getRoleName(type){
      return type==1?'管理员':'设备用户';
    },
    // 分页改变
    pageChange(val) {
      this.formInline.pageNo = val;
      this.adminUserList(this.formInline);
//      console.log(this.listQuery)
    },
    showAmendDialog(object) {
      this.amendVisible = true
      this.findById({id:object.id});
      //console.log(object)
    },
    showSectionDialog(object) {
      this.sectionVisible = true
     this.updateUserGroup.id=object.id;
      console.log(object)
    },
    showPasswordDialog(object) {
      this.passwordVisible = true
      this.updatePassword={
        id:object.id,
        newpassword:'',
        passwordConfirm:''
      };
    },
    showRoleDialog(item) {
      this.roleVisible = true
      this.assignRole.id=item.id;
    },
    handleCheckChange(data,selected) {
      if(selected){
      //  console.log(data);
        this.selectedUserGroup.push(data);
      }else{
        this.selectedUserGroup.splice(this.selectedUserGroup.indexOf(data),1);
      }
      //console.log(this.selectedUserGroup);
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-container {
  .addbutton {
    border: 0;
    background: #4074e1;
    color: #ffffff;
  }
}
</style>
