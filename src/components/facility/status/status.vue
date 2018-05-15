<template>
  <div>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true">
            <el-form-item label="在线状态：">
              <el-select v-model="statusParam.isOnline" style="width:170px;"
                         placeholder="请选择在线状态">
                <el-option label="在线"
                           value="1"></el-option>
                <el-option label="离线"
                           value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备名称：">
              <el-input v-model="statusParam.modelName"
                        placeholder="请填写设备名称" style="width:170px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchStatusList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-button type="primary"
                     @click="onSubmit">扫描</el-button>
          <el-button type="primary"
                     @click="brushList">刷新列表</el-button>
        </div>
      </div>
      <el-table :data="tableData"
                stripe
                style="width: 100%">
        <el-table-column prop="modelName"
                         label="设备名称"
                         width="180">
        </el-table-column>
        <el-table-column prop="ownership"
                         label="拥有人"
                         width="90">
        </el-table-column>
        <el-table-column prop="deviceSerialNumber"
                         label="SN号"
                         width="180"
        >
        </el-table-column>
        <el-table-column prop="model"
                         label="设备型号"
                         width="100">
        </el-table-column>
        <el-table-column prop="operationSystem"
                         label="设备系统"
                         width="180">
        </el-table-column>
        <el-table-column prop="viewDate"
                         label="扫描时间"
                         width="180">
        </el-table-column>
        <el-table-column prop="lastReport"
                         label="响应时间"
                         width="180">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="text">{{status(scope.row.isonline)}}</el-button>
            <!-- <span :class="{'bg-success':scope.row.status,'bg-danger':!scope.row.status}">{{status(scope.row.status)}}</span> -->
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total"
                  :page="statusParam.pageNo"
                  :size="listQuery.size"
                  @pageChange="pageChange"></pagination>
    </div>
  </div>
</template>
<script>
import Pagination from 'components/common/pagination/index'
export default {
  name: 'index',
  components: {
    Pagination
  },
  data() {
    return {
      statusParam: {
        isOnline: '',
        modelName: '',
        pageNo:1
      },
      tableData: [
//        {
//          deviceName: 'MI 3C -- liangjunfen..',
//          owner: '梁骏锋',
//          sn: '93a595fe',
//          deviceModel: 'MI 3C',
//          deviceSystem: 'Android 6.0.1 (MMB29M)',
//          scanTime: '2018-04-12 11:17:13',
//          responseTime: '2018-04-12 11:17:13',
//          status: 1
//        },
//        {
//          deviceName: 'MI 3C -- liangjunfen..',
//          owner: '梁骏锋',
//          sn: '93a595fe',
//          deviceModel: 'MI 3C',
//          deviceSystem: 'Android 6.0.1 (MMB29M)',
//          scanTime: '2018-04-12 11:17:13',
//          responseTime: '2018-04-12 11:17:13',
//          status: 0
//        },
//        {
//          deviceName: 'MI 3C -- liangjunfen..',
//          owner: '梁骏锋',
//          sn: '93a595fe',
//          deviceModel: 'MI 3C',
//          deviceSystem: 'Android 6.0.1 (MMB29M)',
//          scanTime: '2018-04-12 11:17:13',
//          responseTime: '2018-04-12 11:17:13',
//          status: 1
//        },
//        {
//          deviceName: 'MI 3C -- liangjunfen..',
//          owner: '梁骏锋',
//          sn: '93a595fe',
//          deviceModel: 'MI 3C',
//          deviceSystem: 'Android 6.0.1 (MMB29M)',
//          scanTime: '2018-04-12 11:17:13',
//          responseTime: '2018-04-12 11:17:13',
//          status: 0
//        }
      ],
      listQuery: {
        size:10
      },
      total: 10
    }
  },
  mounted(){
    this.onlineDeviceList(this.statusParam);
  },
  methods: {
    //刷新列表
    brushList(){
      this.statusParam={
        isOnline: '',
        modelName: '',
        pageNo:1
      }
      this.onlineDeviceList(this.statusParam);
    },
    //搜索
    searchStatusList(){
      this.onlineDeviceList(this.statusParam);
    },
    //在线设备
    onlineDeviceList(data){
      this.$api.onlineDeviceList(data).then(res=>{
         if(res.code==200){
           this.tableData=res.data.Rows;
           this.total=res.data.Total;
         }
      })
    },

    // 分页改变
    pageChange(val) {
      this.statusParam.pageNo = val;
      this.onlineDeviceList(this.statusParam);
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
    }
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
