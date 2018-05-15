<template>
  <section>
    <template v-if="$route.meta.hasChild">
      <div class="page-main">
        <div class="handleArea">
          <div class="left">
            <el-form :inline="true"
                     :model="formInline">
              <el-form-item label="角色名称">
                <el-input v-model="formInline.user"
                          placeholder="角色名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-button type="primary"
                       @click="addVisible = true">添加</el-button>
          </div>
        </div>
        <el-table :data="tableData"
                  style="width: 100%"
                  class="customTable">
          <el-table-column prop="name"
                           label="角色名称">
          </el-table-column>
          <el-table-column prop="date"
                           label="创建时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="toAccredit">授权</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <router-view></router-view>
    <!-- 添加角色名称 -->
    <el-dialog title="添加角色"
               :visible.sync="addVisible"
               size="tiny">
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="addVisible = false">确 定</el-button>
        <el-button @click="addVisible = false">取 消</el-button>
      </span>
    </el-dialog>
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
      listQuery: {
        page: 1,
        size: 8
      },
      total: 10,
      formInline: {
        user: '',
        region: ''
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
      form: {
        name: ''
      },
      addVisible: false
    }
  },
  methods: {
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val
      console.log(this.listQuery)
    },
    toAccredit() {
      this.$router.push({ path: '/user/roleAccredit' })
    }
  }
}
</script>

