import Vue from 'vue'
import Router from 'vue-router'
import store from 'store'

Vue.use(Router)

const routerMap = [
  {
    name: '首页',
    path: '/home',
    component: _ => import('../components/common/index.vue'),
    redirect: '/index',
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/index',
        component: _ => import('../components/index/index.vue')
      },
      {
        name: '设备',
        path: '/facility',
        component: _ => import('../components/facility/index.vue'),
        redirect: '/facility/status',
        meta: {
          requireAuth: true
        },
        children: [
          {
            path: '/facility/status',
            name: '设备状态',
            component: _ => import('../components/facility/status/status.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/facility/activation',
            name: '激活设备',
            component: _ =>
              import('../components/facility/activation/activation.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: '设备分组',
            path: '/facility/grouping',
            component: _ =>
              import('../components/facility/grouping/grouping.vue'),
            meta: {
              requireAuth: true,
              hasChild: true
            },
            children: [
              {
                name: '管理设备',
                path: '/facility/grouping/manageDevice',
                component: _ =>
                  import('../components/facility/grouping/manageDevice.vue'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          }
        ]
      },
      {
        name: '用户',
        path: '/user',
        component: _ => import('../components/user/index.vue'),
        redirect: '/user/admin',
        meta: {
          requireAuth: true
        },
        children: [
          {
            name: '管理员管理',
            path: '/user/admin',
            component: _ => import('../components/user/admin/admin.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: '角色管理',
            path: '/user/role',
            component: _ => import('../components/user/role/role.vue'),
            meta: {
              requireAuth: true,
              hasChild: true
            },
            children: [
              {
                name: '用户授权',
                path: '/user/roleAccredit',
                component: _ =>
                  import('../components/user/role/roleAccredit.vue'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          },
          {
            name: '用户组管理',
            path: '/user/usergroup',
            component: _ =>
              import('../components/user/usergroup/usergroup.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: '用户标签管理',
            path: '/user/usertag',
            component: _ => import('../components/user/usertag/usertag.vue'),
            meta: {
              requireAuth: true
            }
          }
        ]
      },
      {
        name: '策略',
        path: '/strategy',
        component: _ => import('../components/strategy/index.vue'),
        redirect: '/strategy/list',
        meta: {
          requireAuth: true
        },
        children: [
          {
            name: '策略列表',
            path: '/strategy/list',
            component: _ =>
              import('../components/strategy/strategyList/strategyList.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: '安全规则列表',
            path: '/strategy/secure',
            component: _ => import('../components/strategy/secure/secure.vue'),
            meta: {
              requireAuth: true,
              hasChild: true
            },
            children: [
              {
                name: '添加安全规则',
                path: '/strategy/secure/add',
                component: _ =>
                  import('../components/strategy/secure/secureTemplate.vue'),
                meta: {
                  requireAuth: true
                }
              },
              {
                name: '编辑安全规则',
                path: '/strategy/secure/edit',
                component: _ =>
                  import('../components/strategy/secure/secureTemplate.vue'),
                meta: {
                  requireAuth: true
                }
              },
              {
                name: '有效下发/违规/推送总数',
                path: '/strategy/secure/detail',
                component: _ =>
                  import('../components/strategy/secure/secureDetails.vue'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          },
          {
            name: '历史记录',
            path: '/strategy/list/historyList',
            component: _ =>
              import('../components/strategy/strategyList/historyList.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: '策略详情',
            path: '/strategy/list/strategyTemplate',
            component: _ =>
              import('../components/strategy/strategyList/strategyTemplate.vue'),
            meta: {
              requireAuth: true
            }
          }
        ]
      },
      {
        name: '应用',
        path: '/adhibition',
        component: _ => import('components/adhibition/index'),
        redirect: '/adhibition/management',
        meta: {
          requireAuth: true
        },
        children: [
          {
            name: '应用管理',
            path: '/adhibition/management',
            component: _ => import('components/adhibition/manage'),
            meta: {
              requireAuth: true,
              hasChild: true
            },
            children: [
              {
                name: '应用推送详情',
                path: '/adhibition/managepush',
                component: _ => import('components/adhibition/managePush'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          },
          {
            name: '应用标签管理',
            path: '/adhibition/label',
            component: _ => import('components/adhibition/label'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: '黑明单管理',
            path: '/adhibition/blacklist',
            component: _ => import('components/adhibition/blacklist'),
            meta: {
              requireAuth: true,
              hasChild: true
            },
            children: [
              {
                name: '黑名单推送详情',
                path: '/adhibition/blacklistpush',
                component: _ => import('components/adhibition/blacklistPush'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          },
          {
            name: '白名单管理',
            path: '/adhibition/whitelist',
            component: _ => import('components/adhibition/whitelist'),
            meta: {
              requireAuth: true,
              hasChild: true
            },
            children: [
              {
                name: '白名单推送详情',
                path: '/adhibition/whitelistpush',
                component: _ => import('components/adhibition/whitelistPush'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          }
        ]
      },
      {
        name: '内容',
        path: '/content',
        component: _ => import('components/content/index'),
        redirect: '/content/file',
        meta: {
          requireAuth: true,
          hasChild: true
        },
        children: [
          {
            name: '文件管理',
            path: '/content/file',
            component: _ => import('components/content/file'),
            meta: {
              requireAuth: true,
              hasChild: true
            },
            children: [
              {
                name: '文件推送详情',
                path: '/content/filepush/:fileId',
                component: _ => import('components/content/filePush'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          },
          {
            name: '通讯录',
            path: '/content/addresslist',
            component: _ => import('components/content/addresslist'),
            meta: {
              requireAuth: true,
              hasChild: true
            },
            children: [
              {
                name: '通讯录推送详情',
                path: '/content/addersspush/:contactsId',
                component: _ => import('components/content/addressPush'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          },
          {
            name: '消息推送',
            path: '/content/message',
            component: _ => import('components/content/message'),
            meta: {
              requireAuth: true,
              hasChild: true
            },
            children: [
              {
                name: '消息推送详情',
                path: '/content/messagepush',
                component: _ => import('components/content/messagePush'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          },{
            name: '编辑消息',
            path: '/content/editor',
            component: _ => import('components/content/messageEditor'),
          },
          {
            name: '目录加密',
            path: '/content/catalog',
            component: _ => import('components/content/catalog'),
            meta: {
              requireAuth: true,
              hasChild: true
            },
            children: [
              {
                name: '加密详情',
                path: '/content/catalogpush',
                component: _ => import('components/content/catalogPush'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          }
        ]
      },
      {
        name: '定位管理',
        path: '/position',
        component: _ => import('../components/position/index.vue'),
        meta: {
          requireAuth: true
        },
        redirect: '/position/equipment',
        children: [
          {
            name: '设备定位',
            path: '/position/equipment',
            component: _ =>
              import('../components/position/equipment/equipment.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: '定位',
            path: '/position/equipment/index',
            component: _ => import('../components/position/map/index.vue'),
            meta: {
              requireAuth: true
            },
            redirect: '/position/equipment/realtime',
            children: [
              {
                name: '实时定位',
                path: '/position/equipment/realtime',
                component: _ =>
                  import('../components/position/map/realtime.vue'),
                meta: {
                  requireAuth: true
                }
              },
              {
                name: '轨迹定位',
                path: '/position/equipment/path',
                component: _ => import('../components/position/map/path.vue'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          },
          {
            name: '定时策略',
            path: '/position/timing',
            component: _ => import('../components/position/timing/timing.vue'),
            meta: {
              requireAuth: true,
              hasChild: true
            },
            children: [
              {
                name: '有效下发/推送总数',
                path: '/position/timing/push',
                component: _ =>
                  import('../components/position/timing/timingPush.vue'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          },
          {
            name: '电子围栏',
            path: '/position/rail',
            component: _ => import ('../components/position/rail/rail.vue'),
            meta: {
              requireAuth: true,
              hasChild: true
            },
            children: [
              {
                name: '基于wifi添加电子围栏',
                path: '/position/rail/wifi',
                component: _ => import('../components/position/rail/wifiRail.vue'),
                meta: {
                  requireAuth: true
                }
              },
              {
                name: '基于地理位置添加电子围栏',
                path: '/position/rail/map',
                component: _ => import ('../components/position/rail/mapRail.vue'),
                meta: {
                  requireAuth: true
                }
              }
            ]
          }
        ]
      },
      {
        name: '报表审计',
        path: '/statistic',
        component: _ => import('../components/statistic/index.vue'),
        meta: {
          requireAuth: true
        },
        redirect: '/statistic/onlineStatistic',
        children: [
          {
            name: '设备在线统计',
            path: '/statistic/onlineStatistic',
            component: _ => import('../components/statistic/onlineStatistic/deviceOnlineStatistic.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: '设备状况统计',
            path: '/statistic/statusStatistic',
            component: _ => import ('../components/statistic/statusStatistic/statusStatistic.vue'),
            meta: {
              requireAuth: true
            }
          }
        ]
      },
      {
        name: '日志管理',
        path: '/log',
        component: _ => import('../components/log/index.vue'),
        meta: {
          requireAuth: true
        },
        redirect: '/log/loginLog',
        children: [
          {
            name: '用户登录登出日志',
            path: '/log/loginLog',
            component: _ => import('../components/log/userLog/userLogin.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: '管理员操作日志',
            path: '/log/administrator',
            component: _ =>
              import('../components/log/administrator/administratorLog.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: '管理员操作日志明细',
            path: '/log/administrator/detail',
            component: _ =>
              import('../components/log/administrator/administratorLogDetail.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: '客户端通讯日志',
            path: '/log/client',
            component: _ => import('../components/log/client/clientLog.vue'),
            meta: {
              requireAuth: true
            }
          }
        ]
      },
      {
        name: '设置管理',
        path: '/setup',
        component: _ => import('../components/setup/index.vue'),
        meta: {
          requireAuth: true
        },
        redirect: '/setup/paramsSetup',
        children: [
          {
            name: '参数设置',
            path: '/setup/paramsSetup',
            component: _ =>
              import('../components/setup/paramsSetup/paramsSetting.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: 'LOGO设置',
            path: '/setup/logoSet',
            component: _ =>
              import('../components/setup/logoSet/logoSetting.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: 'ios证书',
            path: '/setup/iosCertificate',
            component: _ =>
              import('../components/setup/iosCertificate/iosCertificateCreate.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: 'ios证书',
            path: '/setup/iosCertificate/createNewCertificate',
            component: _ =>
              import('../components/setup/iosCertificate/createNewCertificate.vue'),
            meta: {
              requireAuth: true
            }
          },
          {
            name: '时间方案管理',
            path: '/setup/timeScheme',
            component: _ =>
              import('../components/setup/timeScheme/timeSchemeManager'),
            meta: {
              requireAuth: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: _ => import('components/login')
  },
  {
    path: '*',
    redirect: '/home'
  }
]

// 路由器配置
const router = new Router({
  routes: routerMap
})

// 路由守卫
/*router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})*/

export default router
