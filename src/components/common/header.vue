<template>
  <!-- header start -->
  <div class="main-header">
    <a class="navbar-brand logo float_l dh200" href="#">
      <img src="../../assets/logo.png" alt="logo" />
    </a>
    <h1 class="navbar-title float_l">蓝盾企业移动信息化管理系统</h1>
    <div class="navbar-inner  clearfix">
      <!-- user -->
      <div id="navbarUser" class="navbar-user float_r">
        <div class="user j-hoverdown" :class="[isShowPersonal ? 'active':'']"
             @mouseenter="isShowPersonal=true"
             @mouseleave="isShowPersonal=false">
          <a href="javascript:void(0);" class="user_box">
            <img src="../../assets/images/user_img.png" alt="" class="user_img">
            <span class="user_name">{{account}}</span>
            <i class="iconfont icon-arrow"></i>
          </a>
          <ul class="dropbox j-downitem"
              :style="{opacity: isShowPersonal ? '1':'0',visibility: isShowPersonal ? 'visible': 'hidden'}">
            <!-- <li><router-link to="/usercenter" class="link f-c6">个人中心</router-link></li> -->
            <li class="user-content">
              <div>公司标识:batest</div>
              <div>用户ID:admin</div>
              <div>用户角色:客户管理员</div>
              <div>服务器版本:2.3.1.10</div>
            </li>
            <li class="link-button">
              <a class="link f-c6" href="javascript:void(0);" @click="resetPassword">修改密码</a>
              <span class="line"></span>
              <a class="link f-c6" href="javascript:void(0);" @click="logOut">退出</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- bigmenu -->
      <div id="navbar-collapse"
           class="navbar-collapses float_r">
        <!--<ul class="navbar-nav nav">
                    <li>
                        <router-link to="/console">
                            <a href="javaScript:void(0);" class="nav-item">
                              <i class="iconfont  icon-kzt"></i>
                              <span>控制台</span>
                            </a>
                        </router-link>
                    </li>
                </ul>-->
        <!--<ul class="navbar-nav nav">-->
        <!--<li>-->
        <!--<router-link to="/usercenter" class="nav-item">-->
        <!--<i class="iconfont  icon-kzt"></i>-->
        <!--<span>个人中心</span>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--</ul>-->
      </div>
    </div>
    <el-dialog title="密码修改" :visible.sync="dialogVisible" size="tiny" class="newpsd">
      <div>
        新密码：
        <el-input v-model="newPassword" type="password" placeholder="请输入新密码"></el-input>
      </div>
      <div>
        确认密码：
        <el-input v-model="newPasswordRe" type="password" placeholder="请确认新密码"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  <!-- header end -->
</template>

<script>
let CryptoJS = require('crypto-js')
export default {
  data() {
    return {
      isShowPersonal: false,
      account: '用户名',
      dialogVisible: false,
      newPassword: '',
      newPasswordRe: ''
    }
  },
  methods: {
    //退出登陆
    logOut() {
      this.$confirm('退出当前用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$api.logOut().then(res => {
            //去掉缓存数据
            this.$cookie.remove('userid');
            this.$cookie.remove('access_token');
            this.$cookie.remove('password');
            this.$router.push({ path: '/login' });
            this.$message({
              type: 'success',
              message: '退出成功！',
              duration: 1000
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    },
    //修改密码
    resetPassword() {
      this.dialogVisible = true;
    },
    //修改密码确认
    setPassword() {
      if (!this.newPassword) {
        this.$message.error('请输入新密码。');
        return;
      }
      if (!this.newPasswordRe) {
        this.$message.error('请输入确认密码。');
        return;
      }
      if (this.newPassword !== this.newPasswordRe) {
        this.$message.error('密码不一致，请重新输入。');
        return;
      }
      this.$api.resetPwd({oldpassword: this.$cookie.get('password'), newpassword: this.newPassword}).then(res => {
        if (res && res.code === 200) {
          this.$message({message: '修改密码成功。', showClose: true, type: 'success'});
          this.dialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        this.$message.error(err.msg);
      })
    }
  },
  props: ['page']
}
</script>

<style lang="scss" scoped>
.main-header {
  .navbar-user {
    width: 180px;
    padding-right: 16px;
  }
  .user-content {
    padding: 10px 0;
    height: 120px;
    color: #000000;
    line-height: 30px;
    text-align: center;
  }
  .link-button {
    display: flex;
    justify-content: space-between;
  }
  .link {
    width: 49%;
    box-sizing: border-box;
    text-align: center;
  }
  .line {
    width: 1px;
    height: 100%;
    background: #e3e3e3;
  }
}
</style>

