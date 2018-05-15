<template>
  <section style="padding:20px;">
    <div class="handle-button">
      <el-button type="primary"
                 size="small"
                 @click="goBack">返回</el-button>
    </div>
    <div class="components-container">
      <div>
        <tinymce :height="300"
                 v-model="content"></tinymce>
      </div>
      <div class="editor-content"
           v-html="content"></div>
    </div>
  </section>

</template>

<script>
import Tinymce from 'components/common/Tinymce'

export default {
  name: 'tinymce-demo',
  components: { Tinymce },
  data() {
    return {
      content: `<h1 style="text-align: center;">哈哈哈哈哈哈哈</h1>
      <ul>
        <li>哈哈</li>
        <li>哈哈，回家吃饭啦</li>
        <li>回家吃饭啦</li>
      </ul>
      `
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>


