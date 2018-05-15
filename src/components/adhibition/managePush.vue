<template>
  <section>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true"
                   :model="formInline">
            <el-form-item label="下发状态：">
              <el-select v-model="formInline.region"
                         placeholder="全部">
                <el-option label="全部"
                           value="1"></el-option>
                <el-option label="未下发"
                           value="2"></el-option>
                <el-option label="未安装"
                           value="3"></el-option>
                <el-option label="已安装"
                           value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备名称：">
              <el-input v-model="formInline.user"
                        placeholder="请填写设备名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
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
                style="width: 100%">
        <el-table-column prop="name"
                         label="设备名称"
                         width="400">
        </el-table-column>
        <el-table-column prop="status"
                         label="下发状态"
                         width="350">
          <template slot-scope="scope">{{ scope.row.status | filterStatus}}</template>
        </el-table-column>
        <el-table-column label="操作"
                         min-width="350">
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
        user: '',
        region: ''
      },
      tableData: [
        {
          name: '8692-A00 -- wangyong',
          status: '0'
        },
        {
          name: 'SM-A8000 -- zangy',
          status: '1'
        }
      ],
      listQuery: {
        page: 1,
        size: 8
      },
      total: 10
    }
  },
  created() {
    console.log(this.$route)
  },
  filters: {
    filterStatus(status) {
      const statusMap = {
        '0': '未下发',
        '1': '未安装',
        '2': '已安装'
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
    }
  }
}
</script>
<style lang="scss" scoped>
.handle-button {
  padding-bottom: 10px;
}
</style>