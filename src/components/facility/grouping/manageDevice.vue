<template>
  <div>
    <div class="page-main">
      <div class="handleArea">
        <div class="left"></div>
        <div class="right">
          <el-button type="primary"
                     @click="back">返回</el-button>
        </div>
      </div>

      <div style="background-color:#f5f5f5;padding:10px;margin-top:10px;">
        <el-row style="padding:5px 0;">
          <el-col :span="2"
                  style="color:#000;">组名称</el-col>
          <el-col :span="20">{{deviceGrpName}}</el-col>
        </el-row>
        <el-row style="padding:5px 0;">
          <el-col :span="2"
                  style="color:#000;">描述:</el-col>
          <el-col :span="20">{{description}}</el-col>
        </el-row>
      </div>
      <!--1-->
      <el-row>
        <el-col :span="24"
                class="table-title"
                style="margin-bottom:5px;">本组设备&nbsp;>&nbsp;本组设备信息</el-col>
      </el-row>
      <div style="padding-bottom:5px;">
        <el-button type="success"
                   @click="removeDevice"
                   style="padding:8px 12px;">移除设备</el-button>
        <el-button type="success"
                   @click="systemLockScreen"
                   style="padding:8px 12px;">系统锁屏</el-button>
        <el-button type="success"
                   @click="resetPwd"
                   style="padding:8px 12px;">重置密码</el-button>
      </div>
      <el-table ref="multipleTable"
                :data="tableData1"
                stripe
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange1">
        <el-table-column type="selection"
                         width="50">
        </el-table-column>
        <el-table-column label="设备名称"
                         min-width="200">
          <template slot-scope="scope">{{ scope.row.modelName }}</template>
        </el-table-column>
        <el-table-column prop="ownership"
                         label="拥有人"
                         width="200">
        </el-table-column>
        <el-table-column prop="model"
                         label="设备型号"
                         width="200"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operationSystem"
                         label="设备系统"
                         width="200">
        </el-table-column>
        <el-table-column prop="lastReport"
                         label="最后上报时间"
                         min-width="200"
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <pagination :total="total1"
                  :page="groupParam.pageNo"
                  :size="listQuery.size"
                  @pageChange="pageChange1"></pagination>
      </el-pagination>
      <!--2-->
      <el-row>
        <el-col :span="24"
                class="table-title"
                style="margin-bottom:5px;">本组设备&nbsp;>&nbsp;可分组设备信息</el-col>
      </el-row>
      <div>
        <el-form ref="form"
                 label-position="right"
                 :inline="true"
                 label-width="90px">
          <el-form-item label="设备组名称:">
            <el-input v-model="noGroupParam.modelName"
                      placeholder="请输入设备组名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       style="padding:8px 20px;" @click="searchNoGroup">查询</el-button>
            <el-button type="success"
                       style="padding:8px 20px;"
                       @click="addDevice">添加设备</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table ref="multipleTable"
                :data="tableData2"
                stripe
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange2">
        <el-table-column type="selection"
                         width="50">
        </el-table-column>
        <el-table-column label="设备名称"
                         min-width="200">
          <template slot-scope="scope">{{ scope.row.modelName }}</template>
        </el-table-column>
        <el-table-column prop="ownership"
                         label="拥有人"
                         width="200">
        </el-table-column>
        <el-table-column prop="model"
                         label="	设备型号"
                         width="200"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operationSystem"
                         label="设备系统"
                         width="200">
        </el-table-column>
        <el-table-column prop="lastReport"
                         label="最后上报时间"
                         min-width="200"
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <pagination :total="total2"
                  :page="noGroupParam.pageNo"
                  :size="listQuery.size"
                  @pageChange="pageChange2"></pagination>
    </div>
    <!--对话框-->
    <el-dialog title="重置密码"
               :visible.sync="dialogFormVisible"
               class="customDialog">
      <el-form :model="form"
                :rules="rules"
               ref="resetPasswordForm"
               label-width="80px">
        <h3 style="color:red;">注：此操作对于iOS设备的密码只能清除，不能重置</h3>
        <el-form-item label="新密码" prop="passwork">
          <el-input v-model="form.password" type="password"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordConfirm">
          <el-input v-model="form.passwordConfirm" type="password"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="resetPasswordSubmit('resetPasswordForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="密码未成功重置" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="deviceId" label="序列号" width="150"></el-table-column>
        <el-table-column property="deviceModelNameMsg" label="原因"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
  </div>
</template>
<style>

</style>
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
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        password:[{ required: true, message: '请输入密码', trigger: 'blur' }],
        passwordConfirm: [
          {validator: validatePass, trigger: 'blur'}
        ]
      },
      listQuery: {
        page: 1,
        size: 8
      },
      total1: 0,
      total2: 0,
      deviceGrpName: JSON.parse(this.$route.query.groupData).deviceGrpName,
      description: JSON.parse(this.$route.query.groupData).description,
      groupParam:{
        deviceGroupId: JSON.parse(this.$route.query.groupData).id,
        pageNo:1
      },
      noGroupParam:{
        modelName:'',
        pageNo:1
      },
      form: {
        password: '',
        passwordConfirm:''
      },
      removeGroupParam:{
        db_list:[]
      },
      addNoGroupParam:{
        db_list:[]
      },
      closeScreenParam:{
        db_list:[]
      },
      resetPwdParam:{
        db_list:[]
      },
      dialogFormVisible: false,
      tableData1:[],
      tableData2: [
//        {
//          id: '2016-05-03',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1518 弄'
//        },
//        {
//          date: '2016-05-02',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1518 弄'
//        }
      ],
      multipleSelection1: [],
      currentPage1: 1,
      multipleSelection2: [],
      currentPage2: 1,
      dialogTableVisible:false,
      gridData: [
//        {
//        deviceId: '2016-05-02',
//        deviceModelName: '上海市普陀区金沙江路 1518 弄'
//      }
      ],
    }
  },
  created() {},
  mounted() {
    this.yesDevice(this.groupParam);
    this.selectNotGroup(this.noGroupParam);
  },
  computed: {},
  watch: {},
  methods: {
    //提交重置密码
    resetPasswordSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.gridData=[];
          this.resetPwdParam.db_list.forEach((item,index)=>{
             item.devicePassword=this.form.password;
          })
          this.dialogFormVisible = false;
          this.resetPassword(this.resetPwdParam);
        //  this.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
    },
    //重置密码
    resetPassword(data){
      this.$api.resetPassword(data).then(res=>{
         if(res.code==200){
           if(res.data.length){

             this.dialogTableVisible=true;
             this.gridData=res.data;
           }else{
             this.$message({
               type: 'success',
               message: '重置密码成功'
             })
           }
           this.$refs['resetPasswordForm'].resetFields();
           this.yesDevice(this.groupParam);
         }
      })
    },
    //系统锁屏
    updateCloseScreen(data){
      this.$api.updateCloseScreen(data).then(res=>{
         if(res.code==200){
             this.$message({
               type: 'success',
               message: '系统锁屏成功'
             })
         }
      })
    },
    //设备已分组移除设备
    deleteFromGroup(data){
      this.$api.deleteFromGroup(data).then(res=>{
         if(res.code==200){
           this.$message({
             type: 'success',
             message: '移除设备成功'
           })
           this.yesDevice(this.groupParam);
           this.selectNotGroup(this.noGroupParam);
           this.multipleSelection1=[];
         }
      })
    },
    //设备组未分配设备
    updateSelectingGroup(data){
      this.$api.updateSelectingGroup(data).then(res=>{
         if(res.code==200){
           this.$message({
             type: 'success',
             message: '添加设备成功'
           })
           this.yesDevice(this.groupParam);
           this.selectNotGroup(this.noGroupParam);
           this.multipleSelection2=[];
         }
      })
    },
    //设备组未分配组查询
    selectNotGroup(data){
      this.$api.selectNotGroup(data).then(res=>{
         if(res.code==200){
           this.tableData2=res.data.Rows;
           this.total2=res.data.Total;
         }
      })
    },
    //列表信息
    yesDevice(data){
      this.$api.yesDevice(data).then(res=>{
         if(res.code==200){
           this.tableData1=res.data.Rows;
           this.total1=res.data.Total;
         }
      })
    },
    resetPwd() {
      this.resetPwdParam.db_list=[];
      this.form={
        password: '',
        passwordConfirm:''
      };
      if (this.multipleSelection1.length) {
        this.dialogFormVisible = true
        this.multipleSelection1.forEach((item,index)=>{
          this.resetPwdParam.db_list.push({
            deviceId:item.id,
            devicePassword:'',
          })
        })

      } else {
        this.$message({
          type: 'warning',
          message: '请选中要重置密码的设备'
        })
      }
    },
    //back
    back() {
      this.$router.push({ path: '/facility/grouping' })
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val
    },
    handleCurrentChange1(v) {},
    handleCurrentChange2(v) {},
    removeDevice() {
     // console.log(this.multipleSelection1)
      if (this.multipleSelection1.length) {
        this.multipleSelection1.forEach((item,index)=>{
          this.removeGroupParam.db_list.push({
            id:item.id
          })
        })
       // console.log(this.removeGroupParam.db_list);
        this.deleteFromGroup(this.removeGroupParam);
      } else {
        this.$message({
          type: 'warning',
          message: '请选中要移除的设备'
        })
      }
    },
    systemLockScreen() {
      if (this.multipleSelection1.length) {
        this.$confirm('你确定要锁屏吗?', '提示', {
          confirmButtonText: '锁屏',
          cancelButtonText: '取消',
          type: 'error'
        })
          .then(() => {
            this.multipleSelection1.forEach((item,index)=>{
              this.closeScreenParam.db_list.push({
                id:item.id
              })
            })
            this.updateCloseScreen(this.closeScreenParam);
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消锁屏'
            })
          })



      } else {
        this.$message({
          type: 'warning',
          message: '请选中要锁屏的设备'
        })
      }

    },
    addDevice() {
//      console.log(this.multipleSelection2.length);
      if (this.multipleSelection2.length!=0) {
//          console.log(this.multipleSelection2);
        this.multipleSelection2.forEach((item,index)=>{
            this.addNoGroupParam.db_list.push({
              id:item.id,
              deviceGroupId:JSON.parse(this.$route.query.groupData).id
            })
        })
        console.log(this.addNoGroupParam.db_list);
        this.updateSelectingGroup(this.addNoGroupParam);
      }else{
        this.$message({
          type: 'warning',
          message: '请选中添加的设备'
        })
      }
    },
    // 分页改变
    pageChange1(val) {
      this.groupParam.pageNo = val
      this.yesDevice(this.groupParam);
    },
    pageChange2(val) {
      this.noGroupParam.pageNo = val
      this.selectNotGroup(this.noGroupParam);
    },
    searchNoGroup(){
      this.selectNotGroup(this.noGroupParam);
    }
  }
}
</script>
