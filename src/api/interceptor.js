import cookie from '@/utils/cookie.js';
import {tokenName} from './api';
export default {
  request:config => {
    //获取token，排除不需要token的页面，例如登录页面
    if (cookie.get(tokenName)) {
      //get请求下config.data全等于undefined
      if(config.method == 'get'){
        //如果接口没有传access_token这个参数，那么给接口默认一个token
        if(!config.params){
          config.params = {};
        }
        if(!config.params.access_token){
          config.params.access_token = cookie.get(tokenName);
        }
      }else if(config.method == 'post'){
        //如果用户没有传access_token，那么给接口默认一个token
        if(!config.data){
          config.data = ''
        }else{
          if((typeof config.data) == 'object'){
              return config
          }
        }
        if(!config.data.includes('access_token')){
          config.data = config.data + '&access_token=' + cookie.get(tokenName);
        }
      }
    }
    return config
  },
  requestErr:error => {
    return Promise.reject(error);
  },
  response:response => {
    if (response.status == 401) {
      cookie.remove(tokenName);
      // 返回 401 清除token信息并跳转到登录页面
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    // 对响应数据做点什么
    return response.data;
  },
}
