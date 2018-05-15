<template>
  <div>
    <div class="page-main">
      <div class="handleArea">
        <div class="handleArea">
          <div class="left">
            <el-form :inline="true"
                     :model="formInline">
              <el-form-item label="策略名称">
                <el-input v-model="formInline.name"
                          placeholder="策略名称"></el-input>
              </el-form-item>
              <el-form-item label="下发状态">
                <el-select v-model="formInline.state"
                           placeholder="选择">
                  <el-option label="未下发"
                             value="30"></el-option>
                  <el-option label="已下发"
                             value="60"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-button type="primary">返回</el-button>
            <el-button type="primary">刷新</el-button>
          </div>
        </div>
      </div>

      <el-table :data="tableData"
                style="width: 100%"
                class="customTable">
        <el-table-column prop="name"
                         label="设备名称">
        </el-table-column>
        <el-table-column prop="name"
                         label="设备平台">
        </el-table-column>
        <el-table-column prop="date"
                         label="下发状态">
        </el-table-column>
        <el-table-column prop="date"
                         label="有效状态">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">授权</el-button>
            <el-button type="text">修改</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total"
                  :page="listQuery.page"
                  :size="listQuery.size"
                  @pageChange="pageChange"></pagination>
    </div>
  </div>
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
        name: '',
        state: ''
      },
      tableData: [],
      total: 0,
      listQuery: {}
    }
  },
  methods: {
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val
      console.log(this.listQuery)
    }
  }
}
</script>
