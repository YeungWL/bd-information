<template>
  <div>
    <template v-if="deviceListShow">
      <div class="page-main">
        <div class="handleArea">
          <div class="left">
            <el-form :inline="true">
              <el-form-item label="设备名称：">
                <el-input v-model="params.modelName"
                          placeholder="请填写设备名称"  style="width:170px;"></el-input>
              </el-form-item>
              <el-form-item label="IMEI号：">
                <el-input v-model="params.deviceImei"
                          placeholder="请填写IMEI号"></el-input>
              </el-form-item>
              <!--<el-form-item label="活动区域：">-->
                <!--<el-select v-model="params.region"-->
                           <!--placeholder="请选择活动区域"-->
                           <!--style="width:170px;"-->
                          <!--&gt;-->
                  <!--<el-option label="广州"-->
                             <!--value="1"></el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
              <el-form-item label="级联搜索：">
                <el-select v-model="params.isCascadeSearch"
                           placeholder="请选择搜索方式"
                           style="width:170px;">
                  <el-option label="是"
                             value="1"></el-option>
                  <el-option label="否"
                             value="0"></el-option>
                </el-select>
              </el-form-item>


              <el-form-item label="是否破解：">
                <el-select v-model="params.isBreak"
                           placeholder="请选择搜索方式"
                           style="width:170px;">
                  <el-option label="破解"
                             value="1"></el-option>
                  <el-option label="未破解"
                             value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-checkbox v-model="selectedCondition.isSeven" @change="isSevenParam">7天内注册</el-checkbox>
              </el-form-item>
              <el-form-item label="">
                <el-checkbox v-model="selectedCondition.isAirLine" @change="isAirLineParam">在漫游</el-checkbox>
              </el-form-item>
              <el-form-item label="">
                <el-checkbox v-model="selectedCondition.isAndoridPolicy" @change="isAndoridPolicyParam">违法安卓策略</el-checkbox>
              </el-form-item>
              <el-form-item label="">
                <el-checkbox v-model="selectedCondition.isSevenOverContr" @change="isSevenOverContrParam">7天内失去控制</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchActiveList">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right"></div>
        </div>
        <div class="grid-content bg-purple-light">
          <div class="">
            <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple bg-purple"
                     style="border:1px solid #4074e1;">
                  <h3 class="title"
                      style="background-color:#4074e1;">选择用户组</h3>
                  <el-tree :data="treeData"
                           :props="defaultProps"
                            node-key="id"
                           ref="sectionTree"
                           :current-node-key="selectedKey"
                           highlight-current
                           @node-click="handleNodeClick"
                  >
                  </el-tree>
                </div>
              </el-col>
              <el-col :span="20"
                      style="padding-left:10px;">
                <el-table :data="tableData"
                          stripe
                          style="width: 100%">
                  <el-table-column label="设备名称"
                                   width="150">
                    <template slot-scope="scope">
                      <a @click="getDeviceInfo(scope.row)"
                         style="color:#2a6496;cursor: pointer;">{{scope.row.modelName}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ownership"
                                   label="拥有人"
                                   width="80">
                  </el-table-column>
                  <el-table-column label="激活状态"
                                   width="100">
                    <template slot-scope="scope">
                      <el-button type="text">{{activeStatus(scope.row.managedStatus)}}</el-button>
                      <!-- <span :class="{'bg-success':scope.row.activeStatus,'bg-warning':!scope.row.activeStatus}">{{activeStatus(scope.row.activeStatus)}}</span> -->
                    </template>
                  </el-table-column>
                  <el-table-column label="辅助状态"
                                   width="100">
                    <template slot-scope="scope">
                      <!--<el-button type="text">{{assistStatus(scope.row.lostStatus)}}</el-button>-->
                       <span :class="{'danger':scope.row.lostStatus,'success':!scope.row.lostStatus}">{{assistStatus(scope.row.lostStatus)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="oSVersion"
                                   label="客户端版本"
                                   width="150">
                  </el-table-column>
                  <el-table-column prop="model"
                                   label="设备型号"
                                   width="120">
                  </el-table-column>
                  <el-table-column prop="operationSystem"
                                   label="设备系统"
                                   width="140">
                  </el-table-column>
                  <el-table-column prop="deviceorder"
                                   label="操作"
                                   min-width="150">
                    <template slot-scope="scope">
                      <!-- <span class="bg-danger"
                            style="cursor: pointer"
                            @click="remove(scope.row,1)">删除</span>
                      <span class="bg-success"
                            style="cursor: pointer"
                            @click="missing(scope.row,0)">报失</span> -->
                      <el-button type="text"
                                 @click="remove(scope.row)">删除</el-button>
                      <el-button type="text"
                                 @click="missing(scope.row)">{{operateState(scope.row.lostStatus)}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <pagination :total="total1"
                        :page="params.pageNo"
                        :size="listQuery.size"
                        @pageChange="pageChange1"></pagination>
          </div>
        </div>
      </div>

    </template>

    <div class="page-main"
         v-if="!deviceListShow">
      <div class="handleArea">
        <div class="left">

        </div>
        <div class="right">
          <el-button type="primary"
                     @click="back">返回</el-button>
        </div>
      </div>
      <el-tabs v-model="activeName2"
               type="card"
               @tab-click="handleClick">
        <el-tab-pane label="基本信息"
                     name="base">
          <baseInfo :device-id="activeId" :base-info="baseInfo"></baseInfo>

          <el-row>
            <el-col :span="24"
                    class="table-title">硬件信息</el-col>

          </el-row>
          <table class="custom">
            <tr>
              <td>生产商</td>
              <td>{{baseInfo.productName}}</td>
              <td>型号</td>
              <td>{{baseInfo.oSVersion}}</td>
            </tr>
            <tr>
              <td>操作系统</td>
              <td> {{baseInfo.operationSystem}}</td>
              <td>剩余内存</td>
              <td>{{baseInfo.lastReMem}}</td>
            </tr>
          </table>
          <el-row>
            <el-col :span="24"
                    class="table-title">网络信息</el-col>

          </el-row>
          <table class="custom">
            <tr>
              <td>手机号</td>
              <td>{{baseInfo.telephoneNum}}</td>
              <td>手机是否在漫游</td>
              <td>{{baseInfo.isRoamingPhone}}</td>
            </tr>
          </table>
          <el-row>
            <el-col :span="24"
                    class="table-title">安全策略</el-col>

          </el-row>
          <table class="custom">
            <tr>
              <td>是否ROOT</td>
              <td>{{baseInfo.isRoot}}</td>
              <td>策略</td>
              <td>{{baseInfo.policyName}}</td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="硬件信息"
                     name="hardware">
          <baseInfo :base-info="baseInfo"></baseInfo>

          <el-row>
            <el-col :span="24"
                    class="table-title">硬件详情</el-col>

          </el-row>
          <table class="custom">
            <tr>
              <td>生产商</td>
              <td>{{hardInfo.productname}}</td>
              <td>型号</td>
              <td>{{hardInfo.cpuno}}</td>
            </tr>
            <tr>
              <td>设备序列号</td>
              <td>{{hardInfo.deviceserialno}}</td>
              <td>账户</td>
              <td>{{hardInfo.accountno}}</td>
            </tr>
            <tr>
              <td>处理器名称</td>
              <td></td>
              <td>处理器速度</td>
              <td>{{hardInfo.cpuspeed}}</td>
            </tr>
            <tr>
              <td>处理器个数</td>
              <td>{{hardInfo.cpuno}}</td>
              <td>	运行内存</td>
              <td>{{hardInfo.runningmem}}</td>
            </tr>
            <tr>
              <td>总共内存</td>
              <td>{{hardInfo.memtotal}}</td>
              <td>剩余内存</td>
              <td>{{hardInfo.lastremem}}</td>
            </tr>
            <tr>
              <td>总共外加内存</td>
              <td>{{hardInfo.memexcludtotalplus}}</td>
              <td>剩余外加内存</td>
              <td>{{hardInfo.memexcludreplus}}</td>
            </tr>
            <tr>
              <td>应用数据</td>
              <td>{{hardInfo.appldata}}</td>
              <td>屏幕分辨率</td>
              <td>{{hardInfo.screendensity}}</td>
            </tr>
            <tr>
              <td>系统语言</td>
              <td>{{hardInfo.systemlan}}</td>
              <td>屏幕尺寸</td>
              <td>{{hardInfo.screensize}}</td>
            </tr>
            <tr>
              <td>时区</td>
              <td>{{hardInfo.timezone}}</td>
              <td>拥有人</td>
              <td>{{hardInfo.ownership}}</td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="网络信息"
                     name="network">
          <el-row>
            <baseInfo :base-info="baseInfo"></baseInfo>
          </el-row>
          <el-row>
            <el-col :span="24"
                    class="table-title">移动网络信息</el-col>
          </el-row>
          <table class="custom">
            <tr>
              <td>电话号码</td>
              <td>{{networkInfo.telephoneNum}}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>手机是否在漫游</td>
              <td>{{isRoaming(networkInfo.isroamingphone)}}</td>
              <td>用户识别码</td>
              <td>{{networkInfo.useridenticode}}</td>
            </tr>
            <tr>
              <td>SIM卡运营商</td>
              <td>{{networkInfo.simcardoper}}</td>
              <td>网络运营商</td>
              <td>{{networkInfo.networkoper}}</td>
            </tr>
            <tr>
              <td>国籍</td>
              <td>{{networkInfo.nationality}}</td>
              <td>所在国家</td>
              <td>{{networkInfo.countrylocating}}</td>
            </tr>
            <tr>
              <td>是否打开网络</td>
              <td>{{isOpenNet(networkInfo.isnetwork)}}</td>
              <td>网络类型</td>
              <td>{{networkInfo.networktype}}</td>
            </tr>
          </table>
          <el-row>
            <el-col :span="24"
                    class="table-title">Wi-Fi网络信息</el-col>
          </el-row>
          <table class="custom">
            <tr>
              <td>Wifi Mac地址</td>
              <td>{{networkInfo.wifimacadd}}</td>
              <td>最后连接时间</td>
              <td>{{networkInfo.wifilastcontime}}</td>
            </tr>
            <tr>
              <td>IP 地址</td>
              <td>{{networkInfo.wifiipadd}}</td>
              <td>服务集标识符</td>
              <td>{{networkInfo.servicesetid}}</td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="系统信息"
                     name="system">
          <baseInfo :base-info="baseInfo"></baseInfo>
          <el-row>
            <el-col :span="24"
                    class="table-title">系统详细信息</el-col>
          </el-row>
          <table class="custom">
            <tr>
              <td>操作系统</td>
              <td>{{systemInfo.opersystem}}</td>
              <td>系统版本</td>
              <td>{{systemInfo.systemversion}}</td>
            </tr>
            <tr>
              <td>内核版本</td>
              <td style="width:30%;">{{systemInfo.ketnelversion}}</td>
              <td>接口版本</td>
              <td>{{systemInfo.interfaceversion}}</td>
            </tr>
            <tr>
              <td>基带版本</td>
              <td>{{systemInfo.basebandversion}}</td>
              <td>版本号</td>
              <td>{{systemInfo.versionno}}</td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="安全信息"
                     name="safe">
          <baseInfo :base-info="baseInfo"></baseInfo>
          <el-row>
            <el-col :span="24"
                    class="table-title">设备安全信息</el-col>

          </el-row>
          <table class="custom">
            <tr>
              <td style="width:25%;">是否ROOT</td>
              <td style="width:25%;">{{rootState(safeInfo.isroot)}}</td>
              <td style="width:25%;">-</td>
              <td>-</td>
            </tr>
          </table>
          <el-row>
            <el-col :span="24"
                    class="table-title">策略信息</el-col>

          </el-row>
          <table class="custom">
            <tr>
              <td style="width:25%;">所属策略名称</td>
              <td style="width:25%;">{{safeInfo.policyname}}</td>
              <td style="width:25%;">策略安装状态</td>
              <td>{{policyStateName(safeInfo.policyinstallstate)}}</td>
            </tr>
            <tr>
              <td>策略发布版本</td>
              <td>{{safeInfo.poliypubversion}}</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </table>
          <el-row>
            <el-col :span="24"
                    class="table-title">密码策略</el-col>

          </el-row>
          <table class="custom">
            <tr>
              <td style="width:25%;">密码是否满足策略规则</td>
              <td style="width:25%;">{{isPwdPolicy(safeInfo.passwordispolicy)}}</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="服务信息"
                     name="service">
          <baseInfo :base-info="baseInfo"></baseInfo>
          <el-table :data="serviceInfo"
                    stripe
                    style="width: 100%;margin-top:10px;">
            <el-table-column prop="serName"
                             label="应用名称"
                             min-width="200">
            </el-table-column>
            <el-table-column prop="serviceName"
                             label="服务名称"
                             width="200">
            </el-table-column>
            <el-table-column prop="serPackName"
                             label="应用包名"
                             min-width="200">
            </el-table-column>
            <el-table-column prop="runningMem"
                             label="运行内存"
                             width="200">
            </el-table-column>
            <el-table-column prop="runningTime"
                             label="时间"
                             min-width="200">
            </el-table-column>
          </el-table>
          <pagination :total="total2"
                      :page="serviceParam.pageNo"
                      :size="listQuery.size"
                      @pageChange="pageChange2"></pagination>
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="软件信息"
                     name="software">
          <baseInfo :base-info="baseInfo"></baseInfo>
          <el-table :data="softwareInfo"
                    stripe
                    style="width: 100%;margin-top:10px;">
            <el-table-column prop="appName"
                             label="应用名称"
                             min-width="200">
            </el-table-column>
            <el-table-column prop="appPackName"
                             label="应用包名"
                             width="200">
            </el-table-column>
            <el-table-column prop="version"
                             label="版本"
                             min-width="200">
            </el-table-column>
            <el-table-column prop="appSize"
                             label="	应用大小"
                             width="200">
            </el-table-column>
            <el-table-column prop="appDataSize"
                             label="数据大小"
                             min-width="200">
            </el-table-column>
            <el-table-column prop="appType"
                             label="应用类型"
                             min-width="200">
            </el-table-column>
          </el-table>
          <pagination :total="total3"
                      :page="softwareParam.page"
                      :size="listQuery.size"
                      @pageChange="pageChange3"></pagination>
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="位置信息"
                     name="position">
          <baseInfo :base-info="baseInfo"></baseInfo>
          <baiduMap :height="height" :longitude="longitude" :latitude="latitude"></baiduMap>
        </el-tab-pane>
      </el-tabs>
    </div>


  </div>
</template>
<script>
import Pagination from 'components/common/pagination/index'
import baseInfo from 'components/facility/activation/baseInfo'
import baiduMap from 'components/common/map/map'
export default {
  name: 'activation',
  components: {
    Pagination,
    baseInfo,
    baiduMap
  },
  data() {
    return {
      activeId:null,
      formInline: {
        user: '',
        region: '',
        checked:1
      },
      treeData:[],
      selectedKey:'',
      //列表查询条件
      params:{
        pageNo:1,
        groupId:null,
        deviceImei:'',
        modelName:'',
        isBreak:null,
        isSevenOverContr:null,
        isAirLine:null,
        isAndoridPolicy:null,
        isSeven:null
      },
      selectedCondition:{
        isSevenOverContr:null,
        isAirLine:null,
        isAndoridPolicy:null,
        isSeven:null
      },
      listQuery: {
        page: 1,
        size: 10
      },
      total: 0,
      total1:0,
      total2:0,
      total3:0,
      //找回保守参数
      updateLostParam:{
        id:null,
        deviceOrder:null
      },
      deviceListShow: true,
//      data: [
//        {
//          label: '组织机构1',
//          children: [
//            {
//              label: '二级 1-1'
//            },
//            {
//              label: '二级 1-2'
//            },
//            {
//              label: '二级 1-3'
//            }
//          ]
//        },
//        {
//          label: '组织机构2',
//          children: [
//            {
//              label: '二级 2-1'
//            },
//            {
//              label: '二级 2-2'
//            }
//          ]
//        }
//      ],
      defaultProps: {
        children: 'children',
        label: 'label',
        id:'id',
        pid:'pid'
      },
      baseInfo:{},
      hardInfo:{},
      networkInfo:{},
      systemInfo:{},
      safeInfo:{},
      serviceInfo:[],
      softwareInfo:[],
      serviceParam:{
        pageNo:1,
        deviceId:null
      },
      softwareParam:{
         pageNo:1,
        deviceId:null
      },
      form: {
        name: '',
        screen: '',
        IMEI: '',
        online: true
      },
      screenList: [
        { label: '7天内失去控制', value: '7天内失去控制' },
        { label: '在漫游', value: '在漫游' },
        { label: '违法安卓策略', value: '违法安卓策略' },
        { label: '7天内注册', value: '7天内注册' }
      ],
      tableData: [
//        {
//          deviceName: 'MI 3C -- liangjunfen..',
//          owner: '梁骏锋',
//          activeStatus: 1,
//          assistStatus: 0,
//          clientVersion: '93a595fe',
//          deviceModel: 'MI 3C',
//          deviceSystem: 'Android 6.0.1 (MMB29M)'
//        },
//        {
//          deviceName: 'MI 3C -- liangjunfen..',
//          owner: '梁骏锋',
//          activeStatus: 0,
//          assistStatus: 1,
//          clientVersion: '93a595fe',
//          deviceModel: 'MI 3C',
//          deviceSystem: 'Android 6.0.1 (MMB29M)'
//        },
//        {
//          deviceName: 'MI 3C -- liangjunfen..',
//          owner: '梁骏锋',
//          activeStatus: 1,
//          assistStatus: 1,
//          clientVersion: '93a595fe',
//          deviceModel: 'MI 3C',
//          deviceSystem: 'Android 6.0.1 (MMB29M)'
//        },
//        {
//          deviceName: 'MI 3C -- liangjunfen..',
//          owner: '梁骏锋',
//          activeStatus: 0,
//          assistStatus: 0,
//          clientVersion: '93a595fe',
//          deviceModel: 'MI 3C',
//          deviceSystem: 'Android 6.0.1 (MMB29M)'
//        }
     ],

      currentPage1: 1,
      //选项卡
      activeName2: 'base',
      applyData: [
        {
          applyName: '手机管家',
          serviceName: 'com.huawei.syst...',
          applyPackage: 'com.huawei.systemmanager',
          memory: '33MB',
          time: '1615分钟'
        },
        {
          applyName: '手机管家',
          serviceName: 'com.huawei.syst...',
          applyPackage: 'com.huawei.systemmanager',
          memory: '33MB',
          time: '1615分钟'
        },
        {
          applyName: '手机管家',
          serviceName: 'com.huawei.syst...',
          applyPackage: 'com.huawei.systemmanager',
          memory: '33MB',
          time: '1615分钟'
        },
        {
          applyName: '手机管家',
          serviceName: 'com.huawei.syst...',
          applyPackage: 'com.huawei.systemmanager',
          memory: '33MB',
          time: '1615分钟'
        }
      ],
      dialogFormVisible: false,
      height:450,
      longitude:116.404,
      latitude:39.915
    }
  },
  mounted(){
    this.listGroup();
    this.activeList(this.params);
  },
  methods: {

    isPwdPolicy(data){
      return data?'是':'否';
    },
    //
    rootState(data){
      return data?'是':'否';
    },
    //策略安装状态
    policyStateName(data){
      let msg;
      switch(data){
        case 1:
          msg='未安装';
          break;
        case 2:
          msg='安装中';
          break;
        default:
          msg='已安装'
      }
      return msg;
    },
    //是否漫游
    isRoaming(data){
      return data?'在漫游':'不在漫游';
    },
    //是否打开网络
    isOpenNet(data){
      return data?'是':'否';
    },
    //硬件信息
    deviceHardInfo(data){
      this.$api.deviceHardInfo(data).then(res=>{
         if(res.code==200){
            this.hardInfo=res.data;
         }
      })
    },
    //基本信息
    deviceInfo(data){
      this.$api.deviceInfo(data).then(res=>{
         if(res.code==200){
            this.baseInfo=res.data;
         }
      })
    },
    //删除设备
    deleteById(data){
      this.$api.deleteById(data).then(res=>{
        if(res.code==200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.activeList(this.params);
        }
      })
    },
    //设备找回报失
    updateLostStatus(data){
      this.$api.updateLostStatus(data).then(res=>{
         if(res.code==200){
           this.$message({
             type: 'success',
             message:res.msg
           });
           this.activeList(this.params);
         }
      })
    },
    //
    operateState(item){
      return item?'找回':'报失';
    },
    searchActiveList(){
      this.activeList(this.params);
    },
    //分页
    pageChange1(v){
     // console.log(v);
      this.params.pageNo=v;
      this.activeList(this.params);
    },
    pageChange2(v){
      this.serviceParam.pageNo=v;
      this.deviceServiceInfo( this.serviceParam);
    },
    pageChange3(v){

    },
    //激活设备下拉列表
    activeList(data){
      this.$api.activeList(data).then(res=>{
         if(res.code==200){
              this.tableData=res.data.Rows;
               this.total1=res.data.Total;
         }
      })
    },
    listGroup(){
      this.$api.listGroup().then(res=>{
         if(res.code==200){
          //  let data=[{"id":1,"name":"组织机构","pid":0},{"id":2,"name":"测试1","pid":1},{"id":3,"name":"测试2","pid":1},{"id":6,"name":"测试3","pid":1}];
           this.treeData=this.$tree(res.data);

          // console.log(this.treeData[0].children[0]);
          // this.$refs.sectionTree.setCheckedKeys([2]);
          // console.log(this.$refs.sectionTree);
           //  document.getElementsByClassName('el-tree-node')[0].classList.add('is-current');
           this.$nextTick(function () {
            // this.$refs.sectionTree.setCheckedKeys(['2']);
            this.selectedKey=this.treeData[0].id
//             var i=0;
//             function getChildren(elem){
////               console.log(elem);
//                if(elem[0]&&elem[0].children&&elem[0].children.length>1){
//                  i++;
////                  console.log(elem);
//                  getChildren(elem[0].children[1].children)
//                }
//                  return i;
//
//             }
//             let dom=this.$refs.sectionTree.$el.children;
//
//             getChildren(dom)
//              //console.log(i);
////             console.log(this.$refs.sectionTree.$el.children[0].children.length);
////             console.log(this.$refs.sectionTree.$el.children[0].children[1].children[0].children.length);
////             console.log(this.$refs.sectionTree.$el.children[0].children[1].children[0].children[1].classList.add('is-current'));
//              //  console.log(this.$refs.sectionTree.$el.children[0].children[1].children[1].children[0].classList.add('is-current'));
//             //console.log(document.getElementsByClassName('el-tree-node'))
//          // console.log(document.getElementsByClassName('el-tree-node'));
//           document.getElementsByClassName('el-tree-node')[i-1].classList.add('is-current');
           })

         }
      })
    },
    //7天登录值
    isSevenParam(v){
      this.params.isSeven=v.target.checked?1:0;
    },
    //是否要漫游
    isAirLineParam(v){
      this.params.isAirLine=v.target.checked?1:0;
    },
    //违法安卓策略
    isAndoridPolicyParam(v){
      this.params.isAndoridPolicy=v.target.checked?1:0;
    },
    //7日内失去控制
    isSevenOverContrParam(v){
      this.params.isSevenOverContr=v.target.checked?1:0;
    },
    getDeviceInfo(item) {
      this.deviceListShow = false;
//       console.log(item);
      this.activeId=item.id;
      this.deviceInfo({id:this.activeId});
    },


    // 分页改变
    pageChange(val) {
      this.listQuery.page = val
      console.log(this.listQuery)
    },
    //返回
    back() {
      this.deviceListShow = true
    },
    //查询网络信息
    deviceNetInfo(data){
      this.$api.deviceNetInfo(data).then(res=>{
         if(res.code==200){
            this.networkInfo=res.data;
         }
      })
    },
    //查询系统信息
    deviceSystemInfo(data){
      this.$api.deviceSystemInfo(data).then(res=>{
         if(res.code==200){
            this.systemInfo=res.data;
         }
      })
    },
    //查询安全信息
    deviceSecInfo(data){
      this.$api.deviceSecInfo(data).then(res=>{
         if(res.code==200){
            this.safeInfo=res.data;
         }
      })
    },
    //查询服务信息
    deviceServiceInfo(data){
      this.$api.deviceServiceInfo(data).then(res=>{
         if(res.code==200){
            this.serviceInfo=res.data.Rows;
            this.total2=res.data.Total;
         }
      })
    },
    //查询软件信息
    deviceAppInfo(data){
      this.$api.deviceAppInfo(data).then(res=>{
         if(res.code==200){
           this.softwareInfo=res.data.Rows;
           this.total3=res.data.Total;
         }
      })
    },
    //查询位置信息
    deviceLocateInfo(data){
      this.$api.deviceLocateInfo(data).then(res=>{
         if(res.code==200){
           if(res.data.longitude&&res.data.latitude){
             this.longitude=parseFloat(res.data.longitude);
             this.latitude=parseFloat(res.data.latitude);
           }

         }
      })
    },
    //查询
    handleClick(tab, event) {
      console.log(tab.label);
      switch(tab.label){
        case '硬件信息':
          this.deviceHardInfo({id:this.activeId});
          break;
        case '网络信息':
          this.deviceNetInfo({id:this.activeId});
          break;
        case '系统信息':
          this.deviceSystemInfo({id:this.activeId});
          break;
        case '安全信息':
          this.deviceSecInfo({id:this.activeId});
          break;
        case '服务信息':
          this.serviceParam.deviceId=this.activeId;
          this.deviceServiceInfo( this.serviceParam);
          break;
        case '软件信息':
          this.softwareParam.deviceId=this.activeId;
          this.deviceAppInfo(this.softwareParam);
          break;
        case '位置信息':
          this.deviceLocateInfo({id:this.activeId});
          break;
        default:
          this.deviceSecInfo({id:this.activeId});
      }
    },
    //删除
    remove(item) {
      this.$confirm(
        '此操作将删除设备:' + item.modelName + ' 是否继续?',
        '提示',
        {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'error'
        }
      )
        .then(() => {
          this.deleteById({id:item.id});
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    missing(item) {
      let btnName=item.lostStatus?'找回':'报失';
      this.updateLostParam={id:item.id,deviceOrder:item.deviceOrder};
      this.$confirm('您确定要报失设备:' + item.modelName + '?', '提示', {
        confirmButtonText: btnName,
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(() => {
          this.updateLostStatus(this.updateLostParam);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'+btnName
          })
        })
    },
    //
    handleNodeClick(data,selected) {
     // console.log(data);
      this.selectedKey=''
      if(selected){
//        this.$refs.sectionTree.setCheckedKeys([data.id]);
        this.selectedKey=data.id;
        console.log(data.id);
        this.params={
            pageNo:1,
            groupId:data.id,
            deviceImei:'',
            modelName:'',
            isBreak:null,
            isSevenOverContr:null,
            isAirLine:null,
            isAndoridPolicy:null,
            isSeven:null
          };
        this.activeList(this.params);
      }

//      if(data.length==1){
//        this.selectedKey[0]=data.id;
//      }

    },
    onSubmit() {
      console.log('submit!')
    },
    status(item) {
      let statusName
      if (item == 1) {
        statusName = '在线'
      } else {
        statusName = '离线'
      }
      return statusName
    },
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
    assistStatus(item) {
      let assistStatusName
      if (item == 1) {
        assistStatusName = '报失'
      } else {
        assistStatusName = '正常'
      }
      return assistStatusName
    }
  }
}
</script>
