<template>
  <div class="pagination"
       v-if="total > 0">
    <el-button class="first"
               @click="changePage(1)"
               :disabled="page===1">首页</el-button>
    <el-pagination layout="prev, pager, next"
                   :page-size="size"
                   :current-page.sync="currentPage"
                   :total="total"></el-pagination>
    <el-button class="end"
               @click="changePage(Math.ceil(total/size))"
               :disabled="page===Math.ceil(total/size)">末页</el-button>
  </div>
</template>
<script>
export default {
  name: 'pagination',
  props: {
    total: {
      type: Number,
      default: 1
    },
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 8
    }
  },
  data() {
    return {
      currentPage: this.page
    }
  },
  watch: {
    page(val) {
      this.currentPage = val
    },
    currentPage(val) {
      this.$emit('pageChange', val)
    }
  },
  methods: {
    changePage(val) {
      this.currentPage = val
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px auto;
  text-align: center;
  position: static;
  & > div {
    display: inline-block;
  }
  .first,
  .end {
    min-width: 32px;
    height: 32px;
    padding: 0 12px;
    margin: 0 5px;
    line-height: 1.4;
    text-align: center;
    background: none;
    border: 1px solid #ddd;
    border-radius: 3px;
    &:hover {
      color: #43adfe;
    }
    &.is-disabled {
      color: #e4e4e4;
      background: none;
    }
  }
  & /deep/ .el-pagination {
    padding: 0;
    vertical-align: top;
    font-weight: 400;
    margin-top: 0;
    .btn-prev,
    .btn-next {
      min-width: 32px;
      height: 32px;
      margin: 0 5px;
      border: 1px solid #ddd;
      border-radius: 3px;
    }
    .number,
    .number.active + .number {
      min-width: 32px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      margin: 0 5px;
      border: 1px solid #ddd;
      border-radius: 3px;
    }
    .number.active {
      border-color: #20a0ff;
      background-color: #20a0ff;
      color: #ffffff;
    }
  }
}
</style>

