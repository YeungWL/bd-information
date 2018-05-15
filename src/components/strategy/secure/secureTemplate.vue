<template>
  <div class="add-container">
    <div class="button-bar">
      <el-button type="primary"
              size="small">保存</el-button>
      <el-button type="primary"
              size="small">返回</el-button>
    </div>
    <el-tabs v-model="activeName" 
             type="card"
             @tab-click="handleClick"
             class="self_tabs">
      <el-tab-pane label="一般设定" name="common">
        <el-form ref="commonForm" :model="commonForm" label-width="120px">
          <el-form-item label="应用平台">
            <el-checkbox-group v-model="commonForm.checkList">
              <el-checkbox label="Android"></el-checkbox>
              <el-checkbox label="iOS"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="规则名称">
            <el-input v-model="commonForm.name" class="rule-name"></el-input>
          </el-form-item>
          <el-form-item label="提醒邮箱">
            <el-button type="primary"
              size="small">添加当前用户邮箱</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="强制性规则" name="constraint">
        <el-collapse accordion>
          <!-- 设备系统版本限制 -->
          <el-collapse-item>
            <template slot="title">
              <el-checkbox label="设备系统版本限制"></el-checkbox>
            </template>
            <el-form ref="form" :model="constraintForm" label-width="250px">
              <el-form-item label="最低Android版本">
                <el-select v-model="constraintForm.android" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="当有设备违规后">
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="输入提示信息以提醒违规设备用户">
                <el-input type="textarea"
                  class="tips"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="constraintForm.tips">
                </el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!-- 禁止设备越狱和Root -->
          <el-collapse-item>
            <template slot="title">
              <el-checkbox label="禁止设备越狱和Root"></el-checkbox>
            </template>
            <el-form ref="form" :model="rootForm" label-width="250px">
              <el-form-item label="当有设备违规后">
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="输入提示信息以提醒违规设备用户">
                <el-input type="textarea"
                  class="tips"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="constraintForm.tips">
                </el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!-- 设备策略监管 -->
          <el-collapse-item>
            <template slot="title">
              <el-checkbox label="设备策略监管"></el-checkbox>
            </template>
            <el-form ref="form" :model="rootForm" label-width="250px">
              <el-form-item label="当有设备违规后">
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="输入提示信息以提醒违规设备用户">
                <el-input type="textarea"
                  class="tips"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="constraintForm.tips">
                </el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!-- 必备应用安装检查 -->
          <el-collapse-item>
            <template slot="title">
              <el-checkbox label="必备应用安装检查"></el-checkbox>
            </template>
            <el-form ref="form" :model="rootForm" label-width="250px">
              <el-form-item label="当有设备违规后">
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="输入提示信息以提醒违规设备用户">
                <el-input type="textarea"
                  class="tips"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="constraintForm.tips">
                </el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!-- 黑名单应用检查 -->
          <el-collapse-item>
            <template slot="title">
              <el-checkbox label="黑名单应用检查"></el-checkbox>
            </template>
            <el-form ref="form" :model="rootForm" label-width="250px">
              <el-form-item label="当有设备违规后">
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="输入提示信息以提醒违规设备用户">
                <el-input type="textarea"
                  class="tips"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="constraintForm.tips">
                </el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!-- 白名单应用检查 -->
          <el-collapse-item>
            <template slot="title">
              <el-checkbox label="白名单应用检查"></el-checkbox>
            </template>
            <el-form ref="form" :model="rootForm" label-width="250px">
              <el-form-item label="当有设备违规后">
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="输入提示信息以提醒违规设备用户">
                <el-input type="textarea"
                  class="tips"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="constraintForm.tips">
                </el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="监督性规则" name="supervision">
        <el-collapse accordion>
          <!-- 设备SIM卡监管 -->
          <el-collapse-item>
            <template slot="title">
              <el-checkbox label="设备SIM卡监管"></el-checkbox>
            </template>
            <el-form ref="form" :model="constraintForm" label-width="250px">
              <el-form-item label="当有设备违规后">
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="输入提示信息以提醒违规设备用户">
                <el-input type="textarea"
                  class="tips"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="constraintForm.tips">
                </el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!-- 操作系统变更 -->
          <el-collapse-item>
            <template slot="title">
              <el-checkbox label="操作系统变更"></el-checkbox>
            </template>
            <el-form ref="form" :model="constraintForm" label-width="250px">
              <el-form-item label="当有设备违规后">
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="输入提示信息以提醒违规设备用户">
                <el-input type="textarea"
                  class="tips"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="constraintForm.tips">
                </el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!-- 设备连接状况监管 -->
          <el-collapse-item>
            <template slot="title">
              <el-checkbox label="设备连接状况监管"></el-checkbox>
            </template>
            <el-form ref="form" :model="constraintForm" label-width="250px">
              <el-form-item label="失联天数">
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="当有设备违规后">
                <el-select v-model="constraintForm.isDisobey" placeholder="请选择">
                  <el-option label="4.0" value="4.0"></el-option>
                  <el-option label="4.3" value="4.3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="输入提示信息以提醒违规设备用户">
                <el-input type="textarea"
                  class="tips"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="constraintForm.tips">
                </el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'common',
      commonForm: {
        name: '',
        checkList: ['Android','iOS']
      },
      constraintForm: {
        android: '',
        isDisobey: '',
        tips: ''
      },
      rootForm: {
        isDisobey: '',
        tips: ''
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="scss" scoped>
.add-container{
  .rule-name{
    width: 200px;
  }
  .tips{
    width: 400px;
  }
}
</style>
