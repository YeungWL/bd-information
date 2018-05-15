<template>
  <div>

    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true"
                   :model="formInline">

            <el-form-item label="操作日期：">
              <div style="display: inline-block">
                <el-date-picker v-model="formInline.startTime"
                                type="datetime"
                                placeholder="选择日期时间">
                </el-date-picker>
              </div>
              <span>-</span>
              <div style="display: inline-block">
                <el-date-picker v-model="formInline.endTime"
                                type="datetime"
                                placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="用户名：">
              <el-input v-model="formInline.user"
                        placeholder="请填写用户名"></el-input>
            </el-form-item>
            <el-form-item label="操作标识：">
              <el-select v-model="formInline.region"
                         placeholder="--所有操作--">
                <el-option label="用户登录"
                           value="1"></el-option>
                <el-option label="用户退出"
                           value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary"
                         @click="onSubmit">导出日志</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right"></div>
      </div>
      <el-table :data="tableData"
                stripe
                style="width: 100%">
        <el-table-column prop="userName"
                         label="用户名称"
                         width="250">
        </el-table-column>
        <el-table-column prop="ip"
                         label="用户IP"
                         width="230">
        </el-table-column>
        <el-table-column prop="identification"
                         label="操作标识"
                         width="225">
        </el-table-column>
        <el-table-column prop="status"
                         label="操作状态"
                         width="250">
        </el-table-column>
        <el-table-column prop="time"
                         label="操作日期"
                         width="250">
        </el-table-column>

      </el-table>
      <pagination :total="total"
                  :page="listQuery.page"
                  :size="listQuery.size"
                  @pageChange="pageChange"></pagination>
    </div>
  </div>
</template>
<style>

</style>
<script>
import Pagination from 'components/common/pagination/index'
export default {
  name: 'userLoginLog',
  components: {
    Pagination
  },
  data() {
    return {
      formInline: {
        startTime: '',
        endTime: '',
        region: '',
        user: ''
      },
      tableData: [
        {
          userName: '测试组1',
          ip: '127.0.0.1',
          identification: '用户登录',
          status: '成功',
          time: '2018-04-12 11:17:13'
        },
        {
          userName: '测试组1',
          ip: '127.0.0.1',
          identification: '用户登录',
          status: '成功',
          time: '2018-04-12 11:17:13'
        },
        {
          userName: '测试组1',
          ip: '127.0.0.1',
          identification: '用户登录',
          status: '成功',
          time: '2018-04-12 11:17:13'
        },
        {
          userName: '测试组1',
          ip: '127.0.0.1',
          identification: '用户登录',
          status: '成功',
          time: '2018-04-12 11:17:13'
        }
      ],
      listQuery: {
        page: 1,
        size: 8
      },
      total: 10
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    onSubmit() {},
    pageChange(v) {}
  }
}
</script>
