<template>
  <section>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true"
                   :model="formInline">
            <el-form-item label="用户组名称：">
              <el-input v-model="formInline.user"
                        placeholder="请填写用户组名称"></el-input>
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
                         min-width="150">
        </el-table-column>
        <el-table-column prop="groupname"
                         label="用户组名称"
                         min-width="120">
        </el-table-column>
        <el-table-column prop="status"
                         label="加解密指令状态"
                         min-width="100">
          <template slot-scope="scope">{{ scope.row.status | filterStatus}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">取消推送</el-button>
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
          username: '张三',
          groupname: '张三组',
          status: '0',
          time: '2018-04-25 15:17:06'
        },
        {
          name: 'SM-A8000 -- zangy',
          status: '1',
          username: '李四',
          groupname: '李四组',
          time: '2018-04-25 15:17:06'
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
        '0': '未读',
        '1': '已读'
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