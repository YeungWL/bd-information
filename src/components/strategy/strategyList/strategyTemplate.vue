<template>
  <div class="page-main">
    <div class="handleArea">
      <div class="left">
        <el-form :model="form"
                 label-width="280px"
                 :inline="true"
                 label-position="left">
          <el-form-item label="">
            <!--<el-input v-model="form.name" auto-complete="off"></el-input>-->
            <span style="color:#333;font-weight:bold">iOS默认策略</span>
          </el-form-item>
          <el-form-item label="是否可以删除描述文件 (只支持iOS7版本)">
            <el-select v-model="form.isDelete"
                       placeholder="请选择删除方式">
              <el-option v-for="(item,index) in deleteList"
                         :label="item.label"
                         :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <el-button type="primary"
                   @click="store">保存</el-button>
        <el-button type="primary"
                   @click="$router.push({path:'/strategy/list'})">返回</el-button>
      </div>
    </div>

    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="设备密码"
                   name="devicePwd">
        <el-collapse v-model="active1"
                     accordion
                     @change="handleChange">
          <el-collapse-item title="配置密码策略"
                            name="1">
            <el-form :model="form"
                     label-width="600px"
                     label-position="left">
              <el-form-item label="密码类型 (列表中居上的密码类型支持其下的所有类型,如:图案支持数字, 字母, 数字和字母)">
                <el-select v-model="devicePwd.pwdType"
                           placeholder="请选择密码类型">
                  <el-option v-for="(item,index) in pwdTypeList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="密码最小长度（4-16个字符）">
                <el-input v-model="devicePwd.pwdLength"
                          placeholder="请输入密码长度"
                          style="width:193px;"></el-input>
              </el-form-item>
              <el-form-item label="密码有效期（天）">
                <el-input v-model="devicePwd.effectiveDay"
                          placeholder="请输入有效天数"
                          style="width:193px;"></el-input>
              </el-form-item>
              <el-form-item label="自动锁屏时间（客户端可以在当前选中的锁屏时间内选择使用锁屏时间）">
                <el-select v-model="devicePwd.autoLockScreen"
                           placeholder="请选择密码类型">
                  <el-option v-for="(item,index) in autoLockScreenList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label=" 密码历史（不允许和最近使用的密码重复的间隔次数）">
                <el-input v-model="devicePwd.pwdHistory"
                          placeholder="请输入次数"
                          style="width:193px;"></el-input>
              </el-form-item>
              <el-form-item label=" 密码失败次数（密码输入超过失败次数，将擦除设备数据）">
                <el-input v-model="devicePwd.pwdErrorTime"
                          placeholder="请输入次数"
                          style="width:193px;"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="设备限制"
                   name="deviceLimit">
        <el-collapse v-model="active2"
                     accordion
                     @change="handleChange">
          <el-collapse-item title="设备限制策略"
                            name="2">
            <el-form :model="form"
                     label-width="400px"
                     label-position="left">
              <el-form-item label="自动同步数据">
                <el-select v-model="deviceLimit.autoSynchroData"
                           placeholder="请选择同步规则">
                  <el-option v-for="(item,index) in autoSynchroDataList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="相机">
                <el-select v-model="deviceLimit.camera"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in cameraList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="蓝牙">
                <el-select v-model="deviceLimit.bluetooth"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in bluetoothList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="使用网络时间">
                <el-select v-model="deviceLimit.networkTime"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in networkTimeList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="使用无线网络/谷歌定位">
                <el-select v-model="deviceLimit.location"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in networkTimeList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="使用GPS定位">
                <el-select v-model="deviceLimit.GPS"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in networkTimeList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="允许模拟地点">
                <el-select v-model="devicePwd.simulation"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in networkTimeList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="使用时间方案">
                <el-input v-model="devicePwd.timeProgramme"
                          placeholder="默认方案"
                          style="width:193px;"
                          disabled></el-input>
                <el-checkbox v-model="checked"
                             @change="handleCheckAllChange">高级</el-checkbox>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="网络限制"
                   name="networkLimit">
        <el-collapse v-model="active3"
                     accordion
                     @change="handleChange">
          <el-collapse-item title="网络限制策略"
                            name="3">
            <el-form :model="networkLimit"
                     label-width="580px"
                     label-position="left">
              <el-form-item label="允许只能打紧急电话">
                <el-checkbox v-model="networkLimit.checked"></el-checkbox>
              </el-form-item>
              <el-form-item label="允许Wi-Fi (该选项优先级低于'移动热点'设置,如果允许使用'移动热点',该选项设置无效)">
                <el-select v-model="networkLimit.allowWifi"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in allowWifiList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="SSID黑名单(使用此功能,‘SSID白名单’不可操作)">
                <el-row v-for="(item,index) in networkLimit.blackNameSheetList"
                        :key="index">
                  <el-col>
                    <el-input v-model="item.blackName"
                              placeholder="SSID黑名单"
                              style="width:193px;float:left;"></el-input>
                    <div style="float:left;height:38px;">
                      <span class="add"
                            @click='addBlackNameSheet(item)'
                            style="float: left; margin:3px;z-index:100;"></span>
                      <span class="remove"
                            @click='removeBlackNameSheet'
                            style="float:left;margin:3px;"></span>
                      <el-checkbox v-model="item.checked"
                                   @change="handleCheckAllChange1">对应MAC地址</el-checkbox>
                    </div>
                  </el-col>
                  <el-col v-for="(item1,index1) in item.children"
                          :key="index1"
                          v-if="item.checked">
                    <el-input v-model="item1.mac"
                              placeholder="mac地址"
                              class="mac"></el-input>
                    <div style="float:left;height:38px;">
                      <span class="add"
                            @click='addMac(item1,index,index1)'
                            style="float: left; margin:3px;z-index:100;"></span>
                      <span class="remove"
                            @click='removeMac(item1,index,index1)'
                            style="float:left;margin:3px;"></span>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="SSID白名单(使用此功能,‘SSID黑名单’不可操作)">
                <el-row v-for="(item,index) in networkLimit.whiteNameSheetList"
                        :key="index">
                  <el-col>
                    <el-input v-model="item.whiteName"
                              placeholder="SSID白名单"
                              style="width:193px;float:left;"></el-input>
                    <div style="float:left;height:38px;">
                      <span class="add"
                            @click='addWhiteNameSheet(item)'
                            style="float: left; margin:3px;z-index:100;"></span>
                      <span class="remove"
                            @click='removeWhiteNameSheet'
                            style="float:left;margin:3px;"></span>
                      <el-checkbox v-model="item.checked"
                                   @change="handleCheckAllChange1">对应MAC地址</el-checkbox>
                    </div>
                  </el-col>
                  <el-col v-for="(item1,index1) in item.children"
                          :key="index1"
                          v-if="item.checked">
                    <el-input v-model="item1.mac"
                              placeholder="mac地址"
                              class="mac"></el-input>
                    <div style="float:left;height:38px;">
                      <span class="add"
                            @click='addMac1(item1,index,index1)'
                            style="float: left; margin:3px;z-index:100;"></span>
                      <span class="remove"
                            @click='removeMac1(item1,index,index1)'
                            style="float:left;margin:3px;"></span>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label=" 允许数据网络(如果选择不允许，则会导致网络数据断开)">
                <el-select v-model="networkLimit.allowDataNet"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in allowDataNetList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="移动热点(该选项优先级高于'允许Wi-Fi'设置,如果允许使用该选项,'允许Wi-Fi'设置无效)">
                <el-select v-model="networkLimit.mobileHotpoint"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in mobileHotpointList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="USB共享">
                <el-select v-model="networkLimit.usbShare"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in usbShareList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="允许使用短信和彩信">
                <el-select v-model="networkLimit.SMSOrMMS"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in SMSOrMMSList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="允许数据漫游">
                <el-select v-model="networkLimit.dataRoaming"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in dataRoamingList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="本地应用"
                   name="localUse">
        <el-collapse v-model="active4"
                     accordion
                     @change="handleChange">
          <el-collapse-item title="本地应用策略"
                            name="4">
            <el-form :model="localUse"
                     label-width="580px"
                     label-position="left">
              <el-form-item label="允许Google Play">
                <el-checkbox v-model="localUse.googlePlay"></el-checkbox>
              </el-form-item>
              <el-form-item label="允许Youtube应用程序">
                <el-checkbox v-model="localUse.Youtube"></el-checkbox>
              </el-form-item>
              <el-form-item label="允许email">
                <el-checkbox v-model="localUse.email"></el-checkbox>
              </el-form-item>
              <el-form-item label="允许浏览器">
                <el-checkbox v-model="localUse.Browser"></el-checkbox>
              </el-form-item>
              <el-form-item label="允许设置">
                <el-checkbox v-model="localUse.setting"></el-checkbox>
              </el-form-item>
              <el-form-item label="允许图库">
                <el-checkbox v-model="localUse.gallery"></el-checkbox>
              </el-form-item>
              <el-form-item label="允许gmail">
                <el-checkbox v-model="localUse.gmail"></el-checkbox>
              </el-form-item>
              <el-form-item label="允许google地图和导航">
                <el-checkbox v-model="localUse.googleMap"></el-checkbox>
              </el-form-item>
              <el-form-item label="允许语音拨号">
                <el-checkbox v-model="localUse.voiceDial"></el-checkbox>
              </el-form-item>
              <el-form-item label="使用时间方案">
                <el-input v-model="devicePwd.timeScheme"
                          placeholder="默认方案"
                          style="width:193px;"
                          disabled></el-input>
                <el-checkbox v-model="checked"
                             @change="handleCheckAllChange">高级</el-checkbox>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="WI-FI"
                   name="wifi">
        <el-collapse v-model="active5"
                     accordion
                     @change="handleChange">
          <el-collapse-item title="无线应用策略"
                            name="5">
            <el-form label-width="400px"
                     label-position="left"
                     v-for="(item,index) in wifiList"
                     :key="index"
                     style="border-bottom:1px dotted #ddd">
              <el-form-item label="Wifi基本配置">
                <span class="add"
                      @click="add(item)"></span>
                <span class="remove"
                      @click="remove(item)"></span>
              </el-form-item>
              <el-form-item label="服务标识SSID">
                <el-input v-model="item.serviceSSID"
                          placeholder="请输入密码长度"
                          style="width:193px;"></el-input>
              </el-form-item>
              <el-form-item label="广播SSID">
                <el-checkbox v-model="item.broadcastSSID"></el-checkbox>
              </el-form-item>
              <el-form-item label="Wi-Fi类 ">
                <el-select v-model="item.wifiClass"
                           placeholder="请选择">
                  <el-option v-for="(item,index) in wifiClassList"
                             :label="item.label"
                             :value="item.value"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="秘钥">
                <el-input v-model="item.secretKey"
                          placeholder="请输入密码长度"
                          style="width:193px;"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="WEB快捷方式"
                   name="web">
        <el-collapse v-model="active6"
                     accordion
                     @change="handleChange">
          <el-collapse-item title="web快捷方式策略"
                            name="6">
            <el-form label-width="400px"
                     label-position="left"
                     v-for="(item,index) in wifiList"
                     :key="index"
                     style="border-bottom:1px dotted #ddd">
              <el-form-item label="web快捷方式配置">
                <el-checkbox v-model="webShortCut.setting"></el-checkbox>
              </el-form-item>
              <el-form-item label="快捷方式名称:">
                <el-input v-model="webShortCut.webShortCutName"
                          placeholder="请输入快捷方式名称"
                          style="width:193px;"></el-input>
              </el-form-item>
              <el-form-item label="web路径">
                <el-input v-model="webShortCut.webPath"
                          placeholder="请输入web路径"
                          style="width:193px;"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="消息提醒"
                   name="message">
        <el-collapse v-model="active7"
                     accordion
                     @change="handleChange">
          <el-collapse-item title="消息提醒"
                            name="7">
            <el-form label-width="400px"
                     label-position="left"
                     v-for="(item,index) in wifiList"
                     :key="index"
                     style="border-bottom:1px dotted #ddd">
              <el-form-item label="提醒级别">
                <el-input v-model="message"
                          placeholder="提醒级别"
                          style="width:193px;"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="knox"
                   name="knox">
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="titleName"
               :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="4">
          <el-select v-model="deviceLimit.timeProgramme"
                     placeholder="请选择">
            <el-option v-for="(item,index) in programmeList"
                       :label="item.label"
                       :value="item.value"
                       :key="index"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-form :model="forms"
               label-width="200px"
               label-position="right">
        <el-form-item label="方案名称">
          <el-input v-model="forms.programmeName"
                    auto-complete="off"
                    style="width:390px;"
                    required></el-input>
        </el-form-item>
        <el-form-item label="方案描述">
          <el-input v-model="forms.programmeDesc"
                    auto-complete="off"
                    style="width:390px;"></el-input>
        </el-form-item>
        <el-form-item label="生效时间段(24小时制)">
          <el-time-picker is-range
                          v-model="forms.value4"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          placeholder="选择时间范围">
          </el-time-picker>
          <el-time-picker is-range
                          arrow-control
                          v-model="forms.value5"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          placeholder="选择时间范围">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="生效星期">
          <el-checkbox-group v-model="forms.effectiveWeek">
            <el-checkbox label="一"
                         value="1"></el-checkbox>
            <el-checkbox label="二"
                         value="2"></el-checkbox>
            <el-checkbox label="三"
                         value="3"></el-checkbox>
            <el-checkbox label="四"
                         value="4"></el-checkbox>
            <el-checkbox label="五"
                         value="5"></el-checkbox>
            <el-checkbox label="六"
                         value="6"></el-checkbox>
            <el-checkbox label="日"
                         value="0"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="生效日期">
          <el-date-picker v-model="forms.effective"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">使用此方案</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'strategyTemplate',
  components: {},
  data() {
    return {
      active1: '',
      active2: '2',
      active3: '3',
      active4: '4',
      active5: '5',
      active6: '6',
      active7: '7',
      activeName: 'devicePwd',
      form: {
        isDelete: ''
      },
      //设备密码
      devicePwd: {
        pwdType: '',
        pwdLength: '',
        effectiveDay: '',
        autoLockScreen: '',
        pwdHistory: '',
        pwdErrorTime: '',
        GPS: '',
        simulation: ''
      },
      deleteList: [
        { label: '可以删除', value: 'delete' },
        { label: '不可以删除', value: 'no' },
        { label: '密码删除', value: 'pwd' }
      ],
      pwdTypeList: [
        { label: '图案', value: '图案' },
        { label: '数字', value: '数字' },
        { label: '字母', value: '字母' },
        { label: '数字和字母', value: '数字和字母' },
        { label: '其他', value: '其他' }
      ],
      autoLockScreenList: [
        { label: '15s', value: '15s' },
        { label: '30s', value: '3s' },
        { label: '1min', value: '1min' },
        { label: '2min', value: '2min' },
        { label: '10min', value: '10min' },
        { label: '30min', value: '30min' }
      ],
      //设备限制
      deviceLimit: {
        autoSynchroData: '',
        camera: '',
        bluetooth: '',
        networkTime: '',
        location: '',
        timeProgramme: '默认方案'
      },
      checked: false,
      autoSynchroDataList: [
        { label: '允许', value: '允许' },
        { label: '不允许', value: '不允许' },
        { label: '用户控制', value: '用户控制' }
      ],
      cameraList: [
        { label: '允许', value: '允许' },
        { label: '不允许', value: '不允许' }
      ],
      bluetoothList: [
        { label: '允许', value: '允许' },
        { label: '不允许', value: '不允许' },
        { label: '用户控制', value: '用户控制' }
      ],
      networkTimeList: [
        { label: '允许', value: '允许' },
        { label: '不允许', value: '不允许' },
        { label: '用户控制', value: '用户控制' }
      ],
      programmeList: [
        { label: '默认方案', value: '默认方案' },
        { label: '自定义方案', value: '自定义方案' }
      ],
      titleName: '',
      dialogFormVisible: false,

      forms: {
        programmeName: '默认方案',
        programmeDesc: '默认方案',
        value4: [new Date(2018, 4, 16, 9, 0), new Date(2018, 4, 16, 12, 0)],
        value5: [new Date(2018, 4, 16, 13, 0), new Date(2018, 4, 16, 18, 0)],
        effectiveWeek: ['一'],
        effectiveDate: []
      },
      //wifi限制
      wifiList: [
        {
          serviceSSID: '',
          broadcastSSID: true,
          wifiClass: '',
          secretKey: ''
        }
      ],
      wifiClassList: [
        { label: 'open', value: 'open' },
        { label: 'WEP', value: 'WEP' },
        { label: 'WPA/WPA2 PSK', value: 'WPA/WPA2 PSK' }
      ],
      //网络限制
      networkLimit: {
        checked: false,
        allowWifi: '',
        blackNameSheetList: [
          { blackName: '', checked: false, children: [{ mac: '' }] }
        ],
        whiteNameSheetList: [
          { whiteName: '', checked: false, children: [{ mac: '' }] }
        ],
        allowDataNet: '',
        usbShare: '',
        SMSOrMMS: '',
        dataRoaming: ''
      },
      allowWifiList: [
        { label: '允许', value: '允许' },
        { label: '不允许', value: '不允许' },
        { label: '用户控制', value: '用户控制' }
      ],
      allowDataNetList: [
        { label: '允许', value: '允许' },
        { label: '不允许', value: '不允许' },
        { label: '用户控制', value: '用户控制' }
      ],
      mobileHotpointList: [
        { label: '允许', value: '允许' },
        { label: '不允许', value: '不允许' },
        { label: '用户控制', value: '用户控制' }
      ],
      usbShareList: [
        { label: '允许', value: '允许' },
        { label: '不允许', value: '不允许' },
        { label: '用户控制', value: '用户控制' }
      ],
      SMSOrMMSList: [
        { label: '开启', value: '开启' },
        { label: '禁用', value: '禁用' }
      ],
      dataRoamingList: [
        { label: '允许', value: '允许' },
        { label: '不允许', value: '不允许' },
        { label: '用户控制', value: '用户控制' }
      ],
      //本地应用
      localUse: {
        googlePlay: false,
        Youtube: false,
        email: false,
        Browser: false,
        setting: false,
        gallery: false,
        gmail: false,
        googleMap: false,
        voiceDial: false,
        timeScheme: false
      },
      webShortCut: {
        setting: true,
        webPath: 'http://www.163.com',
        webShortCutName: '主页'
      },
      message: '消息提示'
    }
  },
  created() {
    console.log(this.$route.query.policyItem);
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    handleChange(v) {
      console.log(v)
    },
    //
    back() {
      console.log('1')
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleCheckAllChange(v) {
      this.titleName = '时间方案高级'
      console.log(v.target.checked)
      this.dialogFormVisible = true
    },
    add(item) {
      let element = {
        serviceSSID: '',
        broadcastSSID: true,
        wifiClass: '',
        secretKey: ''
      }
      this.wifiList.splice(this.wifiList.indexOf(item), 0, element)
    },
    remove(item) {
      console.log(this.wifiList.indexOf(item))
      if (this.wifiList.indexOf(item) == 0) {
        return
      } else {
        this.wifiList.splice(this.wifiList.indexOf(item), 1)
      }
    },
    store() {},
    handleCheckAllChange1(v) {},
    addBlackNameSheet(item) {
      // console.log('1');
      this.networkLimit.blackNameSheetList.splice(
        this.networkLimit.blackNameSheetList.indexOf(item) + 1,
        0,
        { blackName: '', checked: false, children: [{ mac: '' }] }
      )
    },
    removeBlackNameSheet(item) {
      if (this.networkLimit.blackNameSheetList.length > 1) {
        this.networkLimit.blackNameSheetList.splice(
          this.networkLimit.blackNameSheetList.indexOf(item),
          1
        )
      }
    },
    addMac(item, index, index1) {
      // console.log(index);
      this.networkLimit.blackNameSheetList[index].children.splice(
        index1 + 1,
        0,
        { mac: '' }
      )
    },
    removeMac(item, index, index1) {
      this.networkLimit.blackNameSheetList[index].children.splice(index1, 1)
    },
    addWhiteNameSheet(item) {
      this.networkLimit.whiteNameSheetList.splice(
        this.networkLimit.whiteNameSheetList.indexOf(item) + 1,
        0,
        { whiteName: '', checked: false, children: [{ mac: '' }] }
      )
    },
    removeWhiteNameSheet(item) {
      if (this.networkLimit.whiteNameSheetList.length > 1) {
        this.networkLimit.whiteNameSheetList.splice(
          this.networkLimit.whiteNameSheetList.indexOf(item),
          1
        )
      }
    },
    addMac1(item, index, index1) {
      // console.log(index);
      this.networkLimit.whiteNameSheetList[index].children.splice(
        index1 + 1,
        0,
        { mac: '' }
      )
    },
    removeMac1(item, index, index1) {
      this.networkLimit.whiteNameSheetList[index].children.splice(index1, 1)
    }
  }
}
</script>
