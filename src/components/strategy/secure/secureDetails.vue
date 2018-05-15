<template>
  <section>
    
    <div class="header-search">
      <el-form :inline="true" :model="formInline" class="search-form">
        <el-form-item label="规则名称">
          <el-input v-model="formInline.user" placeholder="设备名称"></el-input>
        </el-form-item>
        <el-form-item label="平台">
          <el-select v-model="formInline.pt" placeholder="请选择">
            <el-option label="4.0" value="4.0"></el-option>
            <el-option label="4.3" value="4.3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合规状态">
          <el-select v-model="formInline.pt" placeholder="请选择">
            <el-option label="4.0" value="4.0"></el-option>
            <el-option label="4.3" value="4.3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效状态">
          <el-select v-model="formInline.pt" placeholder="请选择">
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search_btn" size="small"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-main">
      <div class="button-bar">
        <el-button type="primary"
                size="small">返回</el-button>
        <el-button type="primary"
                size="small">刷新</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" class="customTable">
        <el-table-column prop="name" label="设备名称">
        </el-table-column>
        <el-table-column prop="name" label="平台">
        </el-table-column>
        <el-table-column prop="name" label="合规状态">
        </el-table-column>
        <el-table-column prop="date" label="有效状态" >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">取消推送</el-button>
            <el-button type="text">重新推送</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: '',
        pt: ''
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
      ]
    }
  },
  methods: {

  }
}
</script>
