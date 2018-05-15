<template>
  <el-row class="map-container page-main">
    <el-col :span="4"
            class="map-nav">
      <div class="search">
        <el-autocomplete v-model="searchValue"
                         :fetch-suggestions="querySearch"
                         placeholder="请输入内容"
                         @select="handleSelect"></el-autocomplete>
      </div>
      <ul class="position-list">
        <li></li>
      </ul>
      <div class="nav-bottom">
        <el-button type="primary"
                   class="fr clear-button"
                   size="small">清空列表</el-button>
      </div>
    </el-col>
    <el-col :span="20"
            style="padding-left: 10px;"
            class="map-content">
      <!-- <el-radio-group v-model="positionValue" @change="changePosition">
        <el-radio label="realtime">实时定位</el-radio>
        <el-radio label="path">轨迹定位</el-radio>
      </el-radio-group> -->
      <div class="position-bar">
        <span>实时定位</span>
        <el-switch v-model="positionValue"
                   on-text=""
                   off-text=""
                   off-color="#13CE66"
                   class="switch"
                   @change="changePosition(positionValue)"></el-switch>
        <span>轨迹定位</span>
      </div>
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'mapIndex',
  data() {
    return {
      restaurants: [
        { value: 'a8692-A00 -- wangyong（王勇）' },
        { value: 'aMI 3C -- liangjunfeng（梁骏锋）' }
      ], // 搜索列表数据
      searchValue: '',
      // positionValue: 'realtime',
      positionValue: false
    }
  },
  watch: {
    $route() {
      if (this.$route.path === '/position/equipment/path') {
        this.positionValue = true
      } else {
        this.positionValue = false
      }
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelect(item) {
      console.log(item)
    },
    changePosition(item) {
      let positionValue = item ? 'path' : 'realtime'
      this.$router.push({ path: '/position/equipment/' + positionValue })
    }
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  padding: 10px;
  height: calc(100vh - 110px);
  box-sizing: border-box;
  .map-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    border: 1px solid #f1f1f1;
    .search {
      width: 100%;
      height: 36px;
      background: #dedede;
      text-align: center;
      padding: 5px 0;
    }
    .position-list {
      width: 100%;
      height: 87%;
    }
    .nav-bottom {
      padding: 5px;
      width: 100%;
      background: #dedede;
      // height: 60px;
      box-sizing: border-box;
      .clear-button {
        margin: 0;
      }
    }
  }
  .position-bar {
    .switch {
      transform: scale(0.8);
    }
  }
}
</style>
