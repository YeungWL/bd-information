//引入vue
import Vue from 'vue'
//引入入口模块
import App from './App'
//引入路由插件
import router from './router'
// 引入vuex
import store from 'store'
//引入element-ui插件
import ElementUI from 'element-ui'
//引入element-ui插件样式表
import 'element-ui/lib/theme-default/index.css'
//引入axios插件
import es6promise from 'es6-promise'
//引入公共样式
import './styles/public.css'
// import './styles/element-ui.css' ->搬到App.vue页面引入
import '../static/images/icon/css/font-awesome.min.css'
// 引入filter
import * as filters from './filter'
//对未支持promise的浏览器进行兼容
es6promise.polyfill()
//引入api接口
import api from './api'
//引入cookie
import cookie from './utils/cookie'
// 添加echarts
import echarts from 'echarts'

//添加到vue原型中
Vue.prototype.$api = api
Vue.prototype.$cookie = cookie
Vue.prototype.$echarts = echarts

Vue.prototype.$tree=function(data){
  // 删除 所有 children,以防止多次调用
  data.forEach(function (item) {
    delete item.children;
  });
  data.forEach((item)=>{
    item.label=item.name;
    delete item.name
  })
  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  let map = {};
  data.forEach(function (item) {
    map[item.id] = item;
  });
//        console.log(map);

  let val = [];
  data.forEach(function (item) {

    // 以当前遍历项，的pid,去map对象中找到索引的id
    let parent = map[item.pid];

    // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {

      (parent.children || ( parent.children = [] )).push(item);

    } else {
      //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item);
    }
  });

  return val;
},
//添加filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
//引入vuex目录
// import store from './store'

//关闭生产模式下给出的提示
Vue.config.productionTip = false
//使用element-ui
Vue.use(ElementUI)

/**
 * new Vue实例化了vue对象
 * el指定vue通过#app这个标签来渲染vue
 * 实例中如果组件和引入的文件模块同名，那么就可以省略后面部分，比如router部分可以写为router:router，因为同名，所以直接写router也是可以的
 * '<App/>'指代app.vue，template就是选择vue实例要加载哪个模板，也就是声明了App.vue是主程序，其他所有的.vue都是放在App.vue中
 * components: { App } 声明这个主入口是用的上面引入的App模块。
 */
window.vm = new Vue({
  el: '#app',
  store,
  router,
  // store,
  template: '<App/>',
  components: { App }
})
