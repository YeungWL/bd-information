<template>
    <div>
      <el-row>
        <el-col :span="4"
                style="text-align: center;line-height: 88px;"><img src="~@/assets/images/android.png"
                                                                   alt=""></el-col>
        <el-col :span="20">
          <el-row class="row">
            <el-col :span="5">拥有者</el-col>
            <el-col :span="5">{{baseInfo.ownership}}</el-col>
            <el-col :span="5">IMEI号</el-col>
            <el-col :span="5">{{baseInfo.deviceImei}}</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="5">最后上报时间</el-col>
            <el-col :span="5">{{baseInfo.lastReport}}</el-col>
            <el-col :span="5">客户端版本</el-col>
            <el-col :span="5">{{baseInfo.oSVersion}}</el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="5">激活状态</el-col>
            <el-col :span="5">{{activeStatus(baseInfo.managedStatus)}}</el-col>
            <el-col :span="5">激活时间</el-col>
            <el-col :span="5">{{baseInfo.creatTime}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-button type="primary"
                     @click="brushDevice"
                     style="padding:8px 12px;">刷新设备</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
                     @click="systemLockScreen"
                     style="padding:8px 12px;">系统锁屏</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
                     @click="safeLockScreen"
                     style="padding:8px 12px;">安全锁屏</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger"
                     @click="resetPw"
                     style="padding:8px 12px;">重置密码</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger"
                     @click="resumeOutOfFactory"
                     style="padding:8px 12px;">恢复出厂</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="danger"
                     @click="wipeAllData"
                     style="padding:8px 19px;">擦除全部数据</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="danger"
                     @click="wipeCompanyData"
                     style="padding:8px 19px;">擦除企业数据</el-button>
        </el-col>
      </el-row>
      <!--对话框-->
      <el-dialog title="重置密码"
                 :visible.sync="dialogFormVisible"
                 class="customDialog">
        <el-form :model="orderDeviceParams"
                  :rules="rules"
                 ref="resetPwds"
                 label-width="80px">
          <el-form-item label="新密码" prop="devicePassword">
            <el-input v-model="orderDeviceParams.devicePassword" type="password"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordConfirm">
            <el-input type="password" v-model="orderDeviceParams.passwordConfirm"
                      auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="resertPwdForm('resetPwds')"
                     >确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<style>
</style>
<script>
    export default {
        name:'baseInfo',
        props:{
          baseInfo:{
            type:Object,
            default:{}
          },
          deviceId:{
            type:Number,
            default:null
          }
        },
        data() {
          var  validatePass=(rule, value, callback)=>{
            // console.log(value);
            if (value === '') {
              callback(new Error('请输入密码'));
            } else if (value !== this.orderDeviceParams.devicePassword) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
            return {
              dialogFormVisible:false,
              form:{
                name:'123',
              },
              orderDeviceParams:{
                deviceId:null,
                operater:this.$cookie.get('userid'),
                operateOrder:0,
                devicePassword:'',
                passwordConfirm:''
              },
              rules: {
                devicePassword:[{ required: true, message: '请输入密码', trigger: 'blur' }],
                passwordConfirm: [
                  {validator: validatePass, trigger: 'blur'}
                ]
              }
            }
        },
        created() {

        },
        mounted() {
           this.orderDeviceParams.deviceId=this.deviceId;
//           console.log(this.orderDeviceParams);
        },
        computed: {},
        watch: {},
        methods: {
          resertPwdForm(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.dialogFormVisible = false
                this.orderDeviceParams.operateOrder=4;
                this.orderDevice(this.orderDeviceParams);
              } else {
                return false;
              }
            });
          },
          //一系列操作
          orderDevice(data){
            this.$api.orderDevice(data).then(res=>{
              if(res.code==200){
                this.$message({
                  type: 'success',
                  message: res.msg
                });
                this.orderDeviceParams.devicePassword='';
                this.orderDeviceParams.passwordConfirm='';
              }
            })
          },
            //
          activeStatus(item) {
            let activeStatusName
            if (item == 1) {
              activeStatusName = '已激活'
            } else if(item==2) {
              activeStatusName = '取消激活'
            }else{
              activeStatusName = '未激活'
            }
            return activeStatusName
          },
          //刷新设备
          brushDevice() {
            this.$confirm('你要刷新设备?', '提示', {
              confirmButtonText: '刷新',
              cancelButtonText: '取消',
              type: 'error'
            })
              .then(() => {
                this.orderDeviceParams.operateOrder=1;
               this.orderDevice(this.orderDeviceParams);

              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消刷新'
                })
              })
          },
          systemLockScreen() {
            this.$confirm('你确定要锁屏吗?', '提示', {
              confirmButtonText: '锁屏',
              cancelButtonText: '取消',
              type: 'error'
            })
              .then(() => {
                this.orderDeviceParams.operateOrder=2;
                this.orderDevice(this.orderDeviceParams);
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消锁屏'
                })
              })
          },
          safeLockScreen() {
            this.$prompt('请输入解锁密码（密码为6位）', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /^[0-9a-zA-Z]{6}$/,
              inputErrorMessage: '密码格式不正确'
            })
              .then(({ value }) => {
                this.orderDeviceParams.devicePassword=value;
                this.orderDeviceParams.operateOrder=3;
                this.orderDevice(this.orderDeviceParams);
//                this.$message({
//                  type: 'success',
//                  message: '你的密码是: ' + value
//                })
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入'
                })
              })
          },
          resumeOutOfFactory() {
            this.$confirm('你确定要恢复出厂吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'error'
            })
              .then(() => {
                this.orderDeviceParams.operateOrder=5;
                this.orderDevice(this.orderDeviceParams);
                this.$message({
                  type: 'success',
                  message: '恢复出厂成功!'
                })
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消恢复'
                })
              })
          },
          wipeAllData() {
            this.$confirm('你确定要擦除全部数据吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'error'
            })
              .then(() => {
                this.orderDeviceParams.operateOrder=6;
                this.orderDevice(this.orderDeviceParams);
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消擦除'
                })
              })
          },
          wipeCompanyData() {
            this.$confirm('你确定要擦除企业数据吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'error'
            })
              .then(() => {
                this.orderDeviceParams.operateOrder=7;
                this.orderDevice(this.orderDeviceParams);
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消擦除'
                })
              })
          },
          resetPw() {
            this.dialogFormVisible = true

          },
        }
    }
</script>
