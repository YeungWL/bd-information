<template>
  <section>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true"
                   :model="formInline">
            <el-form-item label="通讯录状态：">
              <el-select v-model="formInline.status"
                         placeholder="全部">
                <el-option v-for="(item, index) in selectOption"
                           :label="item.label"
                           :key="index"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名称：">
              <el-input v-model="formInline.userName"
                        placeholder="请填写用户名称"></el-input>
            </el-form-item>
            <el-form-item label="设备名称：">
              <el-input v-model="formInline.deviceName"
                        placeholder="请填写设备名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="getAddressPushList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-button @click="goBack"
                     type="primary">返回</el-button>
        </div>
      </div>
      <el-table :data="tableData"
                stripe
                v-loading.body="loading"
                style="width: 100%">
        <el-table-column prop="deviceName"
                         label="设备名称"
                         min-width="150">
        </el-table-column>
        <el-table-column prop="userName"
                         label="设备用户名称"
                         min-width="120">
        </el-table-column>
        <el-table-column prop="groupname"
                         label="用户组名称"
                         min-width="120">
        </el-table-column>
        <el-table-column prop="status"
                         label="通讯录状态"
                         width="100">
          <template slot-scope="scope">{{ scope.row.status | filterStatus}}</template>
        </el-table-column>
        <el-table-column label="操作"
                         width="220">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status != 0"
                       type="text">取消推送</el-button>
            <el-button type="text">重新推送</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total"
                  :page="listQuery.page"
                  :size="listQuery.size"
                  @pageChange="pageChange"></pagination>
    </div>
  </section>
</template>
<script>
import Pagination from 'components/common/pagination/index'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      formInline: {
        userName: '',
        deviceName: '',
        status: ''
      },
      tableData: [],
      selectOption: [
        { label: '未下载', value: '0'},
        { label: '已下载', value: '1'},
        { label: '取消推送', value: '2'}
      ],
      listQuery: {
        page: 1,
        size: 0
      },
      total: 10,
      loading: true, // 页面加载
    }
  },
  created() {
    this.getAddressPushList();
    console.log(this.$route)
  },
  filters: {
    // 文件状态过滤器
    filterStatus(status) {
      const statusMap = {
        '0': '未下载',
        '1': '已下载',
        '2': '取消推送'
      }
      return statusMap[status]
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val
      console.log(this.listQuery)
      this.getAddressPushList();
    },
    // 获取通讯录日志列表
    getAddressPushList() {
      this.loading = true;
      let data = {
        pageNo: this.listQuery.page,
        contactsId: this.$route.params.contactsId,
      }
      for(let key in this.formInline) {
        if(this.formInline[key]) {
          data[key] = this.formInline[key]
        }
      }
      this.$api.getAddressPushList(data).then(res => {
        console.log(res);
        if(res.code == 200){
          this.tableData = res.data.Rows;
          this.listQuery.size = res.data.Size;
          this.total = res.data.Total;
          this.loading = false;
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.handle-button {
  padding-bottom: 10px;
}
</style>