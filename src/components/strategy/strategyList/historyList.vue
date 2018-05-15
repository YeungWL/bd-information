<template>
  <div>
    <div class="page-main">
      <div class="handleArea">
        <div class="left"></div>
        <div class="right" style="padding-bottom:20px;">
          <el-button type="primary" @click="back">返回</el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="historyList"
        stripe
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column prop="create_time" label="时间" min-width="160"></el-table-column>
        <el-table-column prop="version" label="发布版本" width="200"></el-table-column>
        <el-table-column prop="person" label="发布人" min-width="160"></el-table-column>
        <el-table-column prop="description" label="描述" min-width="160" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="$router.push({path:'/strategy/list/strategyTemplate',query:{params:JSON.stringify(scope.row)}})">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :page="listQuery.page"
        :size="listQuery.size"
        @pageChange="pageChange"></pagination>
    </div>
    <!--对话框-->
    <!--<el-dialog title="重置密码" :visible.sync="dialogFormVisible" class="customDialog" >-->
    <!--<el-form :model="form" label-width="80px">-->
    <!--<h3 style="color:red;">注：此操作对于iOS设备的密码只能清除，不能重置</h3>-->
    <!--<el-form-item label="新密码">-->
    <!--<el-input v-model="form.name" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="确认密码" >-->
    <!--<el-input v-model="form.name" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->
  </div>
</template>
<style>

</style>
<script>
import Pagination from 'components/common/pagination/index'
export default {
  name: 'historyList',
  components: {
    Pagination
  },
  data() {
    return {
      groupName: '',
      desc: '',
      form: {
        name: ''
      },
      //dialogFormVisible:false,
      historyList: [
        {
          time: '2017-01-10 17:59:29',
          version: 1,
          person: '上海',
          desc: 'iOS默认策略默认发布'
        },
        {
          time: '2017-01-10 17:59:29',
          version: 1,
          person: '普陀',
          desc: 'iOS默认策略默认发布'
        }
      ],
      multipleSelection1: [],
      currentPage1: 1,
      multipleSelection2: [],
      currentPage2: 1,
      total: undefined,
      listQuery: {
        page: 1,
        size: 15
      }
    }
  },
  created() {
    this.getHistoryList();
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    //获取历史记录列表
    getHistoryList() {
      let params = {
        id: Number(this.$route.query.id),
        pageNo: this.listQuery.page
      };
      this.$api.lookHistoryPolicy(params).then(res => {
        if (res && res.code === 200 && res.data) {
          this.total = res.data.Total;
          this.historyList = res.data.Rows;
        }
      })
    },
    //分页
    pageChange(val) {
      this.listQuery.page = val
      this.getHistoryList();
    },
    //返回
    back() {
      this.$router.push({path: '/strategy/list'})
    }
  }
}
</script>
