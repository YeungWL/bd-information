<template>
  <div>
    <template v-if="$route.meta.hasChild">

      <div class="page-main">
        <div class="handleArea">
          <div class="left">
            <el-form :inline="true"
                     :model="formInline">
              <el-form-item label="围栏名称">
                <el-input v-model="formInline.name"
                          placeholder="请输入围栏名称"></el-input>
              </el-form-item>
              <el-form-item label="SSID">
                <el-input v-model="formInline.ssid"
                          placeholder="请输入SSID"></el-input>
              </el-form-item>
              <el-form-item label="MAC Address">
                <el-input v-model="formInline.MACAddress"
                          placeholder="请输入MAC Address"></el-input>
              </el-form-item>
              <el-form-item label="地理标注">
                <el-input v-model="formInline.label"
                          placeholder="请输入地理标注"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right"></div>
        </div>
        <el-button type="primary"
                   size="small"
                   @click="toWifiRail">基于wifi添加电子围栏</el-button>
        <el-button type="primary"
                   size="small"
                   @click="toMapRail">基于地理位置添加电子围栏</el-button>
        <el-table :data="tableData"
                  style="width: 100%"
                  class="customTable">
          <el-table-column prop="name"
                           label="围栏名称">
          </el-table-column>
          <el-table-column prop="name"
                           label="围栏简要">
          </el-table-column>
          <el-table-column prop="name"
                           label="已下发/推送总数">
            <template slot-scope="scope">
              <el-button type="text">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="date"
                           label="创建人">
          </el-table-column>
          <el-table-column prop="date"
                           label="更新时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text">推送</el-button>
              <el-button type="text"
                         @click="deleteRail">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total"
                    :page="listQuery.page"
                    :size="listQuery.size"
                    @pageChange="pageChange"></pagination>
      </div>
    </template>
    <router-view></router-view>
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
        ssid: '',
        MACAddress: '',
        label: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎'
        },
        {
          date: '2016-05-04',
          name: '王小虎'
        },
        {
          date: '2016-05-01',
          name: '王小虎'
        }
      ],
      total: undefined,
      listQuery: {}
    }
  },
  methods: {
    deleteRail() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(_ => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
    },
    toWifiRail() {
      this.$router.push({ path: '/position/rail/wifi' })
    },
    toMapRail() {
      this.$router.push({ path: '/position/rail/map' })
    },
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val
      console.log(this.listQuery)
    }
  }
}
</script>
