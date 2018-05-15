<template>
  <div>
    <template v-if="$route.meta.hasChild">
      <div class="header-search">
        <el-form :inline="true" :model="formInline" class="search-form">
          <el-form-item label="规则名称">
            <el-input v-model="formInline.user" placeholder="规则名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="search_btn" size="small"></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="page-main">
        <div class="button-bar">
          <el-button type="primary"
                size="small" 
                @click="toAdd">添加</el-button>
          <el-button type="primary"
                size="small">刷新</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" class="customTable">
          <el-table-column prop="name" label="规则名称">
            <template slot-scope="scope">
              <el-button type="text" @click="toEdit(scope.row)">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="平台">
          </el-table-column>
          <el-table-column prop="name" label="有效下发/违规/推送总数">
            <template slot-scope="scope">
              <el-button type="text" @click="toDetail">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="创建时间" >
          </el-table-column>
          <el-table-column prop="date" label="最近修改时间" >
          </el-table-column>
          <el-table-column prop="date" label="最新推送时间" >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text">推送</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data (){
    return {
      formInline: {
        user: ''
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        },
        {
          date: "2016-05-01",
          name: "王小虎"
        }
      ],
    }
  },
  methods: {
    toAdd() {
      this.$router.push({path: '/strategy/secure/add'})
    },
    toEdit() {
      this.$router.push({path: '/strategy/secure/edit'})
    },
    toDetail() {
      this.$router.push({path: '/strategy/secure/detail'})
    }
  }
}
</script>

