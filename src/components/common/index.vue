<template>
  <div class="index-container">
    <vHeader></vHeader>
    <div class="main-container">
      <vAside></vAside>
      <router-view style="min-width:944px;overflow-y: auto;height: calc(100vh - 56px);"
                   :key="key"></router-view>
    </div>
    <!-- <vFooter></vFooter> -->
  </div>
</template>

<script>
import vHeader from './header'
import vFooter from './footer'
import vAside from './aside'
export default {
  name: 'index',
  components: { vHeader, vFooter, vAside },
  created() {
    // console.log(1)
  },
  computed: {
    //解决缓存
    key() {
      return this.$route.meta.noAlive ? this.$route.name + +new Date() : ''
    }
  }
}
</script>

<style scoped>
.index-container {
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

/*.index-container .sidebar-container {
  flex: 0 0 68px;
}*/

/* .index-container>div:last-child {
  flex: 0 0 20px;
} */

/*.main-container {
  width: 100%;
}

.main-container .submenu-container {
  height: 100%;
}*/
</style>
