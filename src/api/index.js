import axios from 'axios';
import cookie from '@/utils/cookie.js';
import router from '../router'

//请求的url地址
export const adminPort = process.env.BASE_API;
//请求发送前token处理 - 不需要序列化处理参数
axios.interceptors.request.use(config => {
  config.url = config.url || '';
  //token放置在请求头

  //登录页不需要token
  if (cookie.get('access_token')) {
    //判断token是否过期
    let nowTime = new Date().getTime();
    let timeDiffer = nowTime - parseFloat(cookie.get('loginTime'));
    let expires = parseFloat(cookie.get('expires'));
    if ((expires !== -1) && (expires - timeDiffer <= 15*60*1000)) {
      //过期，更新token

    }
    //全局配置头部信息
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    config.headers.common['authorization'] = cookie.get('userid') + '_' + cookie.get('access_token');
    //config.headers.post['Access-Control-Allow-Headers'] = '*';
  }
  return config;
}, error => {
  return Promise.reject(error);
});
//设置超时
 axios.create().defaults.timeout = 10000;
//添加响应拦截器
axios.interceptors.response.use(response=>{
  /*if(response.data.code == 401){
    //返回 401 清除token信息并跳转到登录页面
    cookie.remove('access_token');
    router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}
    })
  }*/
  return response.data;
}, error=> {
  if(!window.location.href.includes('login')){
    /*if (error.response.status== 401) {
      window.vm.$alert('由于您长时间没有操作，为保证账户安全，需重新登录', '重新登录', {
        confirmButtonText: '确定',
        close () {
          cookie.remove('userid');
          cookie.remove('access_token');
          window.location.reload();
        }
      });
      // 返回 401 清除token信息并跳转到登录页面
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
      });
    }*/
  }
  return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});

export default {
  /**
   * 接口名称：登录页 - 登录获取userId、token
   * 参数：account（用户名）password（密码）image_key（验证码标识）image_code（验证码）
   * 成功状态码200
   * 返回值：
   *          msg  接口处理描述
   *          code 200为成功 其他为失败
   *          data 返回内容，包括：userId（用户id）token（token）
   */
  logIn: data => {
    return axios.post(adminPort + "/api/user/login", data);
  },

  /**
   * 接口名称：退出登录
   * 参数：
   * 成功状态码200
   * 返回值：
   *          msg  接口处理描述
   *          code 200为成功 其他为失败
   *          data true/false
   */
  logOut: () => {
    return axios.post(adminPort + "/api/user/loginOut");
  },
  /*管理员管理 ->获取角色下拉列表*/
  listRole:()=>{
       return axios.get(adminPort+'/api/user/listRole');
  },
  /* 管理员管理->用户分页*/
  adminUserList:data=>{
    return axios.post(adminPort+'/api/user/list',data);
  },
  /*管理员管理 ->添加管理员*/
  saveAdminUser:data=>{
     return axios.post(adminPort+'/api/user/saveAdminUser',data);
  },
  /*管理员管理|用户组管理->根据id获取指定用户*/
  findById:data=>{
     return axios.post(adminPort+'/api/user/findById',data);
  },
  /*管理员管理->更新管理员用户接口*/
  updateAdminUser:data=>{
     return axios.post(adminPort+'/api/user/updateAdminUser',data);
  },
  /*管理员管理->修改他人登录密码*/
  updateOthersPwd:data=>{
     return axios.post(adminPort+'/api/user/updateOthersPwd',data);
  },
  /*管理员管理->分配角色*/
  updateUserRole:data=>{
    return axios.post(adminPort+'/api/user/updateUserRole',data);
  },
  /*管理员管理->分配部门*/
  updateAdminUserGroup:data=>{
    return axios.post(adminPort+'/api/user/updateAdminUserGroup',data);
  },
  /*用户组管理->获取用户组列表接口*/
  listGroup:()=>{
     return axios.get(adminPort+'/api/group/listGroup');
  },
  /**
   * 接口名称：用户登录 - 修改密码
   * */
  resetPwd: data => {
    return axios.post(adminPort + "/api/user/updatePersonalPwd", data);
  },
  /**
   * 接口名称：用户管理 - 用户组管理 - 获取列表
   * */
  getUserGroupManageList: data => {
    return axios.post(adminPort + "/api/user/listDeviceUser", data);
  },
  /**
  * 接口名称：用户管理 - 用户组管理 - 添加用户组
  * */
  addUserGroup: data => {
    return axios.post(adminPort + "/api/group/saveGroup", data);
  },
  /**
  * 接口名称：用户管理 - 用户组管理 - 修改用户组
  * */
  modifyUserGroup: data => {
    return axios.post(adminPort + "/api/group/updateGroup", data);
  },
  /**
  * 接口名称：用户管理 - 用户组管理 - 删除用户组
  * */
  deleteUserGroup: data => {
    return axios.post(adminPort + "/api/group/deleteGroup", data);
  },
  /**
   * 接口名称：用户管理 - 用户组管理 - 添加设备用户
   * */
  addDeviceUser: data => {
    return axios.post(adminPort + "/api/user/saveDeviceUser", data);
  },
  /**
  * 接口名称：用户管理 - 用户组管理 - 删除设备用户
  * */
  deleteDeviceUser: data => {
    return axios.post(adminPort + "/api/group/deleteUser", data);
  },
  /**
  * 接口名称： 用户管理 - 用户组管理 - 设备用户导出
  * */
  downloadFile: () => {
    return axios({
      method: "get",
      url: adminPort + "/api/group/downLoadImportTemplate",
      responseType: 'blob'
    });
  },
  /**
  * 接口名称：用户管理 - 用户组管理 - 批量添加用户
  * */
  groupUserImport: data => {
    return axios.post(adminPort + "/api/group/importDeviceUser", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  /**
  * 接口名称：用户管理 - 用户组管理 - 获取标签下拉列表
  * */
  getLabelList: () => {
    return axios.get(adminPort + "/api/label/getAllForSelect");
  },
  /**
  * 接口名称：用户管理 - 用户标签管理 - 列表
  * */
  getUserLabelList: data => {
    return axios.post(adminPort + "/api/label/list", data);
  },
  /**
  * 接口名称：用户管理 - 用户标签管理 - 修改/添加标签
  * */
  editUserLabel: data => {
    return axios.post(adminPort + data.url, data.params);
  },
  /**
  * 接口名称：用户管理 - 用户标签管理 - 删除用户标签
  * */
  deleteUserLabel: data => {
    return axios.post(adminPort + "/api/label/deleteLabel", data);
  },
  /**
  * 接口名称：合规策略 - 策略列表 - 列表
  * */
  getPolicyList: data => {
    return axios.post(adminPort + "/api/policy/list", data);
  },
  /**
  * 接口名称：合规策略 - 策略列表 - 获取策略下拉列表
  * */
  getPolicyOpt: data => {
    return axios.post(adminPort + "/api/policy/getAllForSelect", data)
  },
  /**
  * 接口名称：合规策略 - 策略列表 - 添加策略
  * */
  addPolicy: data => {
    return axios.post(adminPort + "/api/policy/savePolicy", data);
  },
  /**
   * 接口名称：合规策略 - 策略列表 - 修改策略（策略详情）
   */
  updatePolicy: data => {
    return axios.post(adminPort + "/api/policy/updatePolicy", data);
  },
  /**
   * 接口名称：合规策略 - 策略列表 - 查看历史策略
   */
  lookHistoryPolicy: data => {
    return axios.post(adminPort + "/api/policy/listHistoryPloicy", data);
  },
  /**
   * 接口名称：合规策略 - 策略列表 - 删除策略
   */
  deletePolicy: data => {
    return axios.post(adminPort + "/api/policy/deletePolicy", data);
  },
  /* 接口名称: 内容管理 - 文件管理 - 获取列表 */
  getFileList: data => {
    return axios.post(adminPort + "/api/space/list", data);
  },
  /* 接口名称: 内容管理 - 文件管理 - 添加文件夹 */
  createFolder: data => {
    return axios.post(adminPort + '/api/space/createFolder', data);
  },
  /* 接口名称: 内容管理 - 文件管理 - 上传文件 */
  uploadFile: data => {
    return axios.post(adminPort + '/api/space/uploadFile', data);
  },
  /* 接口名称: 内容管理 - 文件管理 - 空间使用情况 */
  getUseSpace: data => {
    return axios.post(adminPort + '/api/space/getUserSpace', data);
  },
  /* 接口名称: 内容管理 - 文件管理 - 删除文件或者文件夹 */
  deleteFile: data => {
    return axios.post(adminPort + '/api/space/deleteFile', data);
  },
  /* 接口名称: 内容管理 - 文件管理 - 获取文件推送列表 */
  getFileLogList: data => {
    return axios.post(adminPort + '/api/space/logList', data);
  },
  /* 接口名称: 内容管理 - 通讯录管理 - 获取通讯录列表分页 */
  getAddressList: data => {
    return axios.post(adminPort + '/api/contacts/list', data);
  },
  /* 接口名称: 内容管理 - 通讯录管理 - 下载通讯录模板 - 需要用from表单来做 */
  downloadXlsTemplate: data => {
    return axios.post(adminPort + '/api/contacts/downContactsTemplate', data);
  },
  /* 接口名称: 内容管理 - 通讯录管理 - 导出通讯录数据 - 需要用from表单来做 */
  // downloadContacts: data => {
  //   return axios.post(adminPort + '/api/contacts/downloadContacts', data);
  // },
  /* 接口名称: 内容管理 - 通讯录管理 - 删除通讯录 */
  deleteAddress: data => {
    return axios.post(adminPort + '/api/contacts/deleteFile', data);
  },
  /* 接口名称: 内容管理 - 通讯录管理 - 获取通讯录日志列表 */
  getAddressPushList: data => {
    return axios.post(adminPort + '/api/contacts/logList', data);
  },
  /* 接口名称: 内容管理 - 通讯录管理 - 导入通讯录文件 */
  uploandAddressFile: data => {
    return axios.post(adminPort + '/api/contacts/importContacts', data);
  }
}




/**
 * 接口名称：  用户名密码获取token
 * 参数：
 * login_name          string 必须   邮箱或手机号
 * login_pwd           string 必须   登录密码
 * image_key           string 否    图片验证码校验码
 * image_code          string 否    图片验证码
 * 成功状态码201
 * 返回值：
 *          message  接口处理描述
 *          code 0000为成功 其他为失败
 *          type 接口处理类型
 *          data 返回内容
 */
/*

login:data=>{
  return axios.post(adminPort + "/logins",qs.stringify(data));
},

组件内部调用接口方式：
  data需要传入接口的参数
  this.$api.login(data).then(res=>{
    从这里可以拿到成功的返回值
  }).catch(err=>{
    从这里可以拿到失败的返回值
  })
*/
