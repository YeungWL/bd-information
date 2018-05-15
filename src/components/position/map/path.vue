<template>
  <div>
    <div class="date-bar">
      <el-form :inline="true" 
               :model="formInline" 
               class="search-form">
        <el-form-item label="查看轨迹">
          <el-date-picker v-model="formInline.dateValue"
                      type="daterange"
                      placeholder="选择日期范围"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="search_btn"
                     size="small">查看轨迹</el-button>
        </el-form-item>
      </el-form>
    </div>
    轨迹定位
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        dateValue: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.date-bar{
  .search-form{
    padding-top: 10px;
  }
}
</style>
