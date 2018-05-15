<template>
  <div class="accredit-container page-main">
    <div class="handleArea">
      <div class="left"></div>
      <div class="right">
        <el-button type="primary">选择全部</el-button>
        <el-button type="primary">保存</el-button>
        <el-button type="primary"
                   @click="toRole">返回</el-button>
      </div>
    </div>
    <div class="accredit-name">
      <span>角色:</span>
      <span>233</span>
    </div>
    <el-card class="box-card"
             :body-style="{ padding: '0px' }">
      <div class="check-title">
        <el-checkbox>全选</el-checkbox>
      </div>
      <div class="check-body">
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedItems"
                           @change="handleCheckedCitiesChange"
                           class="checkgroup">
          <el-checkbox v-for="city in items"
                       :label="city"
                       :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="check-body">
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedItems"
                           @change="handleCheckedCitiesChange"
                           class="checkgroup">
          <el-checkbox v-for="city in items"
                       :label="city"
                       :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card class="box-card"
             :body-style="{ padding: '0px' }">
      <div class="check-title">
        <el-checkbox>全选</el-checkbox>
      </div>
      <div class="check-body">
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedItems"
                           @change="handleCheckedCitiesChange"
                           class="checkgroup">
          <el-checkbox v-for="city in items"
                       :label="city"
                       :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="check-body">
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedItems"
                           @change="handleCheckedCitiesChange"
                           class="checkgroup">
          <el-checkbox v-for="city in items"
                       :label="city"
                       :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="check-body">
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedItems"
                           @change="handleCheckedCitiesChange"
                           class="checkgroup">
          <el-checkbox v-for="city in items"
                       :label="city"
                       :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card class="box-card"
             :body-style="{ padding: '0px' }">
      <div class="check-title">
        <el-checkbox>全选</el-checkbox>
      </div>
      <div class="check-body">
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedItems"
                           @change="handleCheckedCitiesChange"
                           class="checkgroup">
          <el-checkbox v-for="city in items"
                       :label="city"
                       :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="check-body">
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedItems"
                           @change="handleCheckedCitiesChange"
                           class="checkgroup">
          <el-checkbox v-for="city in items"
                       :label="city"
                       :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="check-body">
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedItems"
                           @change="handleCheckedCitiesChange"
                           class="checkgroup">
          <el-checkbox v-for="city in items"
                       :label="city"
                       :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkAll: true,
      checkedItems: ['上海', '北京'],
      items: ['上海', '北京', '广州', '深圳'],
      isIndeterminate: true
    }
  },
  methods: {
    handleCheckAllChange(event) {
      this.checkedItems = event.target.checked ? this.items : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.items.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.items.length
    },
    toRole() {
      this.$router.push({ path: '/user/role' })
    }
  }
}
</script>

<style lang="scss" scoped>
.accredit-container {
  padding: 15px 20px;
  .accredit-name {
    padding-bottom: 15px;
  }
  .box-card {
    margin-bottom: 30px;
    .check-title {
      padding: 10px 20px;
      background: #f5f5f5;
      border-bottom: 1px solid #dddddd;
    }
    .check-body {
      padding: 10px 20px;
      .checkgroup {
        margin-top: 10px;
        padding-left: 50px;
      }
    }
  }
  .box-card:last-child {
    margin-bottom: 0;
  }
}
</style>
