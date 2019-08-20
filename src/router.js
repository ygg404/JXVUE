import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
Vue.use(Router);

const router = new Router({
  mode:'history',
  routes:[
    {
      path:'/',
      name:'home',
      component:Home,
      meta:{ requiresAuth:true},    //添加requiresAuth该字段，表示进入这个路由需要登录
      children:[
        {
          //项目立项
          path:'projectsetup-management',
          name:'projectsetup-management',
          component:resolve=>require(['./components/ProjectSetUpManagement.vue'],resolve)
          // component:() => import('./components/ProjectSetUpManagement.vue')
        },
        {
          //项目安排
          path:'allocation-management',
          name:'allocation-management',
          component:resolve=>require(['./components/AllocationManagement.vue'],resolve)
          // component:() => import('./components/AllocationManagement.vue')
        },
        {
          //项目审定
          path:'authorize-management',
          name:'authorize-management',
          component:resolve=>require(['./components/AuthorizeManagement.vue'],resolve)
          // component:() => import('./components/AuthorizeManagement.vue')
        },
        {
          //项目作业
          path:'projectwork-management',
          name:'projectwork-management',
          component:resolve=>require(['./components/ProjectWorkManagement.vue'],resolve)
          // component:() => import('./components/ProjectWorkManagement.vue')
        },
        {
          //质量检查
          path:'quality-management',
          name:'quality-management',
          component:resolve=>require(['./components/QualityManagement.vue'],resolve)
          // component:() => import('./components/QualityManagement.vue')
        },
        {
          //产值核算
          path:'output-management',
          name:'output-management',
          component:resolve=>require(['./components/OutputManagement.vue'],resolve)
          // component:() => import('./components/OutputManagement.vue')
        },
        {
          //财务操作
          path:'finance-management',
          name:'finance-management',
          component:resolve=>require(['./components/FinanceManagement.vue'],resolve)
          // component:() => import('./components/FinanceManagement.vue')
        },
        {
          //项目处理
          path:'project-management',
          name:'project-management',
          component:resolve=>require(['./components/ProjectManagement.vue'],resolve)
          // component:() => import('./components/ProjectManagement.vue')
        },
        {
          //收费统计表
          path:'charge-chart',
          name:'charge-chart',
          component:resolve=>require(['./components/ChargeChart.vue'],resolve)
          // component:() => import('./components/ChargeChart.vue')
        },
        {
          //产值统计表
          path:'output-chart',
          name:'output-chart',
          component:resolve=>require(['./components/OutputChart.vue'],resolve)
          // component:() => import('./components/OutputChart.vue')
        },
        {
          //质量统计表
          path:'quality-chart',
          name:'quality-chart',
          component:resolve=>require(['./components/QualityChart.vue'],resolve)
          // component:() => import('./components/QualityChart.vue')
        },
        {
          //汇总产值统计表
          path:'collect-chart',
          name:'collect-chart',
          component:resolve=>require(['./components/CollectChart.vue'],resolve)
          // component:() => import('./components/CollectChart.vue')
        },
        {
          //业务汇总统计表
          path:'service-chart',
          name:'service-chart',
          component:resolve=>require(['./components/ServiceChart.vue'],resolve)
          // component:() => import('./components/ServiceChart.vue')
        },
        {
          //项目回收站
          path:'recycle-management',
          name:'recycle-management',
          component:resolve=>require(['./components/RecycleManagement.vue'],resolve)
          // component:() => import('./components/RecycleManagement.vue')
        },
        {
          //用户列表
          path:'user-management',
          name:'user-management',
          component:resolve=>require(['./components/UserManagement.vue'],resolve)
          // component:() => import('./components/UserManagement.vue')
        },
        {
          //角色组列表
          path:'group-management',
          name:'group-management',
          component:resolve=>require(['./components/GroupManagement.vue'],resolve)
          // component:() => import('./components/GroupManagement.vue')
        },
          // {
          //     //部门列表
          //     path:'organization-management',
          //     name:'organization-management',
          //     component:resolve=>require(['./components/OrganizationManagement.vue'],resolve)
          //     // component:() => import('./components/ProjectTypeManagement.vue')
          // },
        {
          //部门列表
          path:'workgroup-management',
          name:'workgroup-management',
          component:resolve=>require(['./components/WorkGroupManagement.vue'],resolve)
          // component:() => import('./components/WorkGroupManagement.vue')
        },
        {
          //项目类型列表
          path:'projecttype-management',
          name:'projecttype-management',
          component:resolve=>require(['./components/ProjectTypeManagement.vue'],resolve)
          // component:() => import('./components/ProjectTypeManagement.vue')
        },
        {
          //作业类型列表
          path:'worktype-management',
          name:'worktype-management',
          component:resolve=>require(['./components/WorkTypeManagement.vue'],resolve)
          // component:() => import('./components/WorkTypeManagement.vue')
        },
        {
          //快捷输入列表
          path:'shortcut-management',
          name:'shortcut-management',
          component:resolve=>require(['./components/ShortCutManagement.vue'],resolve)
          // component:() => import('./components/ShortCutManagement.vue')
        },
          {
              //文件类型列表
              path:'file-management',
              name:'file-management',
              component:resolve=>require(['./components/FileManagement.vue'],resolve)
              // component:() => import('./components/ShortCutManagement.vue')
          },
          {
              //文件管理
              path:'fileedit-management',
              name:'fileedit-management',
              component:resolve=>require(['./components/FileEditManagement.vue'],resolve)
              // component:() => import('./components/ShortCutManagement.vue')
          },
        {
          //合同管理
          path:'contract-management',
          name:'contract-management',
          component:resolve=>require(['./components/ContractManagement.vue'],resolve)
          // component:() => import('./components/ContractManagement.vue')
        },
        {
          //系统日志
          path:'syslog',
          name:'syslog',
          component:resolve=>require(['./components/SysLog.vue'],resolve)
          // component:() => import('./components/SysLog.vue')
        },
        {
          //回收站
          path:'recycle-management',
          name:'recycle-management',
          component:resolve=>require(['./components/RecycleManagement.vue'],resolve)
          // component:() => import('./components/RecycleManagement.vue')
        },
        {
          //编辑项目安排数据
          path:'editallocation',
          name:'editallocation',
          component:resolve=>require(['./components/EditAllocation.vue'],resolve)
          // component:() => import('./components/EditAllocation.vue')
        },
        {
          //编辑项目工作数据
          path:'editwork',
          name:'editwork',
          component:resolve=>require(['./components/EditWork.vue'],resolve)
          // component:() => import('./components/EditWork.vue')
        },
        {
          //编辑质量检查数据
          path:'editquality',
          name:'editquality',
          component:resolve=>require(['./components/EditQuality.vue'],resolve)
          // component:() => import('./components/EditQuality.vue')
        },
        {
          //编辑产值核算数据
          path:'editoutput',
          name:'editoutput',
          component:resolve=>require(['./components/EditOutput.vue'],resolve)
          // component:() => import('./components/EditOutput.vue')
        },
        {
          //编辑财务数据
          path:'editfinance',
          name:'editfinance',
          component:resolve=>require(['./components/EditFinance.vue'],resolve)
          // component:() => import('./components/EditFinance.vue')
        },
        {
          //编辑项目处理数据
          path:'editauthorize',
          name:'editauthorize',
          component:resolve=>require(['./components/EditAuthorize.vue'],resolve)
          // component:() => import('./components/EditAuthorize.vue')
        },
        {
          //已审定数据
          path:'audited-management',
          name:'audited-management',
          component:resolve=>require(['./components/AuditedManagement.vue'],resolve)
          // component:() => import('./components/AuditedManagement.vue')
        },
        {
          //已审定数据
          path:'editaudited',
          name:'editaudited',
          component:resolve=>require(['./components/EditAudited.vue'],resolve)
          // component:() => import('./components/EditAudited.vue')
        },
        {
          //进度管理
          path:'schedule-management',
          name:'schedule-management',
          component:resolve=>require(['./components/ScheduleManagement.vue'],resolve)
          // component:() => import('./components/ScheduleManagement.vue')
        },
        {
          //查看已审定数据
          path:'showproject',
          name:'showproject',
          component:resolve=>require(['./components/ShowProject.vue'],resolve)
          // component:() => import('./components/ShowProject.vue')
        },
        {
          //打印已审定数据
          path:'printproject',
          name:'printproject',
          component:resolve=>require(['./components/PrintProject.vue'],resolve)
          // component:() => import('./components/PrintProject.vue')
        },
        {
          //打印项目作业数据
          path:'printwork',
          name:'printwork',
          component:resolve=>require(['./components/PrintWork.vue'],resolve)
          // component:() => import('./components/PrintWork.vue')
        },
        {
          //打印已审定数据
          path:'editschedule',
          name:'editschedule',
          component:resolve=>require(['./components/EditSchedule.vue'],resolve)
          // component:() => import('./components/EditSchedule.vue')
        },
        {
          path:'showprojectsetup',
          name:'showprojectsetup',
          meta:{ requiresAuth: false},
          component:resolve=>require(['./components/ShowProjectSetUp.vue'],resolve)
          // component: () => import('./components/ShowProjectSetUp.vue')
        },
        {
          path:'tobackwork',
          name:'tobackwork',
          component:resolve=>require(['./components/BackWork.vue'],resolve)
          // component: () => import('./components/BackWork.vue')
        },
        {
          //质量评分
          path:'addQualityScore',
          name:'addQualityScore',
          component:resolve=>require(['./components/AddQualityScore.vue'],resolve)
          // component: () => import('./components/AddQualityScore.vue')
        },
        {
          //项目产值
          path:'project-output',
          name:'project-output',
          component:resolve=>require(['./components/ProjectOutPut.vue'],resolve)
          // component:() => import('./components/ProjectOutPut.vue')
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      meta:{ requiresAuth: false},
      component: () => import('./views/Login.vue')
    }
  ]
})

router.beforeEach((to,from,next)=>{
    let token = sessionStorage.getItem("token")
    if(to.path === "/"){
      if(!token){
        next({
          path: "/login",
          query: { redirect: to.fullPath}
        })
      }else{
        next()
      }
    }

    if(to.meta.requiresAuth){
      if(token){
        next()
      }else{
        next({
          path:"/login",
          query:{ redirect: to.fullPath}
        })
      }
    }else{
      next()
    }
})

export default router
