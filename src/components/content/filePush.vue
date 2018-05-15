<template>
  <section>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true"
                   :model="formInline">
            <el-form-item label="文件状态：">
              <el-select v-model="formInline.status"
                         placeholder="请选择"
                         clearable>
                <el-option v-for="(item, index) in selectOption"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备用户名称：">
              <el-input v-model="formInline.groupName"
                        placeholder="请填写用户名称"></el-input>
            </el-form-item>
            <el-form-item label="设备名称：">
              <el-input v-model="formInline.deviceImei"
                        placeholder="请填写设备名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="getFileLogList()">查询</el-button>
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
        <el-table-column prop="groupName"
                         label="用户组名称"
                         width="100">
        </el-table-column>
        <el-table-column prop="status"
                         label="文件状态"
                         width="100">
          <template slot-scope="scope">{{ scope.row.status | filterStatus}}</template>
        </el-table-column>
        <el-table-column prop="update_time"
                         label="修改时间"
                         min-width="180">
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
  data() {
    return {
      formInline: {
        groupName: '',
        deviceImei: '',
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
      total: undefined,
      loading: true, // 页面加载
    }
  },
  created() {
    this.getFileLogList();
    console.log(this.$route)
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val;
      this.getFileLogList();
    },
    // 获取文件推送详情列表
    getFileLogList() {
      this.loading = true;
      let data = {
        pageNo: this.listQuery.page,
        baseId: this.$route.params.fileId,
      };
      for(let key in this.formInline) {
        if(this.formInline[key]) {
          data[key] = this.formInline[key]
        }
      }
      this.$api.getFileLogList(data).then(res => {
        // console.log(res);
        if(res.code == 200){
          this.tableData = res.data.Rows;
          this.total = res.data.Total;
          this.listQuery.size = res.data.Size;
          this.loading = false;
        }else {
          this.$message.error(res.msg)
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