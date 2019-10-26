<template>
  <div id="app">
    <v-app id="inspire" light>
      <!--顶部工具栏-->
      <v-toolbar app fixed clipped-left color="blue-grey" dark>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>测绘项目管理系统</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-btn icon @click="editPass()">
          <v-icon title="修改密码">inbox</v-icon>修改密码
        </v-btn>
        &nbsp;&nbsp;
        &nbsp;&nbsp;
        &nbsp;&nbsp;
        <v-btn icon @click="logout">
          <v-icon title="退出">logout</v-icon>退出
        </v-btn>
      </v-toolbar>

     <v-dialog max-width="500px" v-model="eidtUserPass" persistent>
                <v-card>
                    <v-card-title><span class="title">修改用户</span></v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="useraccount" label="登录账号:" disabled></v-text-field>
                                <v-text-field v-model="oldPass" label="旧密码:"></v-text-field>
                                <v-text-field v-model="newPass" label="新密码:"></v-text-field>
                            </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="colseEditUserDialog">取消</v-btn>
                        <v-btn color="info" @click="editUserPass()">修改</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

      <v-content >
        <transition name="slide-fade" >
          <router-view></router-view>
        </transition>
      </v-content>

      <v-navigation-drawer clipped fixed v-model="drawer" app   style="width: 240px;" >
        <v-list>
            <v-list-tile to="contract-management" v-if="permissions.includes('all_permission') || permissions.includes('project_contract')">
                <v-list-tile-action>
                    <v-icon>folder</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>合同管理</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

          <v-list-group v-model="projectManageMenu.active" prepend-icon="account_balance">
              <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{projectManageMenu.title}}</v-list-tile-title>
              </v-list-tile-content>
              </v-list-tile>
            <!--<v-list-tile to="contract-management" v-if="permissions.includes('all_permission') || permissions.includes('project_contract')">-->
              <!--<v-list-tile-action>-->
                <!--<v-icon></v-icon>-->
              <!--</v-list-tile-action>-->
              <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>{{projectManageMenu.submenu[0].name}}</v-list-tile-title>-->
              <!--</v-list-tile-content>-->
            <!--</v-list-tile>-->
              <!--项目立项-->
              <v-list-tile to="projectsetup-management" v-if="permissions.includes('all_permission') || permissions.includes('put_project')">
                <v-list-tile-action>
                  <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{projectManageMenu.submenu[1].name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <!--项目安排-->
              <v-list-tile to="allocation-management" v-if="permissions.includes('all_permission') || permissions.includes('make_project')">
                <v-list-tile-action>
                  <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{projectManageMenu.submenu[2].name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <!--项目作业-->
              <v-list-tile to="projectwork-management" v-if="permissions.includes('all_permission') || permissions.includes('start_project')">
                <v-list-tile-action>
                  <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{projectManageMenu.submenu[3].name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <!--质量检查-->
              <v-list-tile to="quality-management" v-if="permissions.includes('all_permission') || permissions.includes('inspect_quality')">
                <v-list-tile-action>
                  <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{projectManageMenu.submenu[4].name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <!--产值核算-->
              <v-list-tile to="output-management" v-if="permissions.includes('all_permission') || permissions.includes('adjust_output')">
                <v-list-tile-action>
                  <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{projectManageMenu.submenu[5].name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <!--项目审定-->
              <v-list-tile to="authorize-management" v-if="permissions.includes('all_permission') || permissions.includes('leader_authorize')">
                <v-list-tile-action>
                  <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{projectManageMenu.submenu[6].name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <!--已审定-->
              <v-list-tile to="audited-management" v-if="permissions.includes('all_permission') || permissions.includes('authorized')">
                <v-list-tile-action>
                  <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{projectManageMenu.submenu[7].name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <!--项目进度-->
              <v-list-tile to="schedule-management" v-if="permissions.includes('all_permission') || permissions.includes('project_schedule')">
                  <v-list-tile-action>
                      <v-icon></v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                      <v-list-tile-title>{{projectManageMenu.submenu[8].name}}</v-list-tile-title>
                  </v-list-tile-content>
              </v-list-tile>
              <!--项目产值-->
              <v-list-tile to="project-output" v-if="permissions.includes('all_permission') || permissions.includes('start_project')">
                  <v-list-tile-action>
                      <v-icon></v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                      <v-list-tile-title>{{projectManageMenu.submenu[9].name}}</v-list-tile-title>
                  </v-list-tile-content>
              </v-list-tile>


          </v-list-group>

            <!--项目回收站-->
            <v-list-tile to="recycle-management" v-if="permissions.includes('all_permission') || permissions.includes('get_recycler')">
                <v-list-tile-action>
                    <v-icon>delete</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>项目回收站</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

          <v-list-group v-model="contractManageMenu.active" prepend-icon="timeline" v-if="permissions.includes('all_permission') || permissions.includes('project_chart')">
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{contractManageMenu.title}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <!--收费统计表-->
              <v-list-tile to="charge-chart" v-if="permissions.includes('all_permission') || permissions.includes('account_chart')">
                <v-list-tile-action>
                  <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{contractManageMenu.submenu[0].name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <!--产值统计表-->
              <v-list-tile to="output-chart" v-if="permissions.includes('all_permission') || permissions.includes('output_chart')">
                <v-list-tile-action>
                  <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{contractManageMenu.submenu[1].name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
               <!--质量统计表-->
              <v-list-tile to="quality-chart" v-if="permissions.includes('all_permission') || permissions.includes('quality_chart')">
                <v-list-tile-action>
                  <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{contractManageMenu.submenu[2].name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <!--汇总产值统计表-->
              <v-list-tile to="collect-chart" v-if="permissions.includes('all_permission') || permissions.includes('all_output_chart')">
                <v-list-tile-action>
                  <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{contractManageMenu.submenu[3].name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <!--业务汇总统计表-->
              <v-list-tile to="service-chart" v-if="permissions.includes('all_permission') || permissions.includes('all_business')">
                <v-list-tile-action>
                  <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{contractManageMenu.submenu[4].name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
          </v-list-group>

            <!--财务操作-->
            <v-list-group  prepend-icon="inbox" v-if="permissions.includes('all_permission') || permissions.includes('finance')">
                <v-list-tile slot="activator">
                    <v-list-tile-content>
                        <v-list-tile-title>财务管理</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!--财务操作-->
                <v-list-tile to="finance-management" v-if="permissions.includes('all_permission') || permissions.includes('all_business')">
                    <v-list-tile-action >
                        <v-icon></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>财务操作</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!--收费统计表-->
                <v-list-tile to="charge-chart" v-if="permissions.includes('all_permission') || permissions.includes('account_chart')">
                    <v-list-tile-action>
                        <v-icon></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{contractManageMenu.submenu[0].name}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!--业务汇总统计表-->
                <v-list-tile to="service-chart" v-if="permissions.includes('all_permission') || permissions.includes('all_business')">
                    <v-list-tile-action>
                        <v-icon></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{contractManageMenu.submenu[4].name}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
              <!--<v-list-tile to="finance-management" v-if="permissions.includes('all_permission') || permissions.includes('finance')">-->
                <!--<v-list-tile-action>-->
                  <!--<v-icon>inbox</v-icon>-->
                <!--</v-list-tile-action>-->
                <!--<v-list-tile-content>-->
                  <!--<v-list-tile-title>财务操作</v-list-tile-title>-->
                <!--</v-list-tile-content>-->
              <!--</v-list-tile>-->

            <v-list-tile to="fileedit-management">
                <v-list-tile-action>
                    <v-icon>folder_open</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>文件管理</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

          <v-list-group v-model="sysSettingMenu.active" prepend-icon="build" v-if="permissions.includes('all_permission') || permissions.includes('sys_setting')">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{sysSettingMenu.title}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <!--用户列表-->
            <v-list-tile to="user-management">
              <v-list-tile-action>
                <v-icon></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{sysSettingMenu.submenu[0].name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <!--角色组列表-->
            <v-list-tile to="group-management">
              <v-list-tile-action>
                <v-icon></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{sysSettingMenu.submenu[1].name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
              <!--&lt;!&ndash;部门列表&ndash;&gt;-->
              <!--<v-list-tile to="organization-management">-->
                  <!--<v-list-tile-action>-->
                      <!--<v-icon></v-icon>-->
                  <!--</v-list-tile-action>-->
                  <!--<v-list-tile-content>-->
                      <!--<v-list-tile-title>{{sysSettingMenu.submenu[2].name}}</v-list-tile-title>-->
                  <!--</v-list-tile-content>-->
              <!--</v-list-tile>-->
            <!--部门列表-->
            <v-list-tile to="workgroup-management">
              <v-list-tile-action>
                <v-icon></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{sysSettingMenu.submenu[3].name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <!--项目类型列表-->
            <v-list-tile to="projecttype-management">
              <v-list-tile-action>
                <v-icon></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{sysSettingMenu.submenu[4].name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <!--作业类型列表-->
            <v-list-tile to="worktype-management">
              <v-list-tile-action>
                <v-icon></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{sysSettingMenu.submenu[5].name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <!--快捷输入列表-->
            <v-list-tile to="shortcut-management">
              <v-list-tile-action>
                <v-icon></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{sysSettingMenu.submenu[6].name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
              <!--文件类型列表-->
              <v-list-tile to="file-management">
                  <v-list-tile-action>
                      <v-icon></v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                      <v-list-tile-title>{{sysSettingMenu.submenu[7].name}}</v-list-tile-title>
                  </v-list-tile-content>
              </v-list-tile>
          </v-list-group>

          <v-list-tile to="syslog" v-if="permissions.includes('all_permission') || permissions.includes('check_log')">
            <v-list-tile-action>
              <v-icon>date_range</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>系统日志</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-app>
       <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
            {{snackbarText}}
        </v-snackbar>
  </div>

</template>

<script>
import store from "@/store.js"
export default {
  data: () => ({
      drawer: true,
    eidtUserPass:false,
    useraccount: localStorage.getItem('userAccount'),
    oldPass:'',
    newPass:'',
    snackbar:false,
    snackbarColor:'',
    snackbarText:'',
    snackbarTimeout:2000,

     projectController:{
      active:false,
      title: '项目管理',
      submenu:[
        {name:'项目处理'},
        {name:'项目进度'},
        {name:'项目产值'},
        {name:'项目回收站'}
      ]
    },
    projectManageMenu:{
      active:false,
      title: '项目管理',
      submenu:[
        {name:'合同管理'},
        {name:'项目立项'},
        {name:'项目安排'},
        {name:'项目作业'},
        {name:'质量检查'},
        {name:'产值核算'},
        {name:'项目审定'},
        {name:'已审定'},
         {name:'项目状态'},
         {name:'项目产值'},
         {name:'项目回收站'}
      ]
    },
    contractManageMenu:{
      active:false,
      title:'统计报表',
      submenu:[
        {name:'收费统计表'},
        {name:'产值统计表'},
        {name:'质量统计表'},
        {name:'汇总产值统计表'},
        {name:'业务汇总统计表'}
      ]
    },
    sysSettingMenu:{
      active:false,
      title:'系统设置',
      submenu:[
        {name:'用户列表'},
        {name:'角色列表'},
          {name:'部门列表'},
        {name:'作业组列表'},
        {name:'项目类型列表'},
        {name:'作业类型列表'},
        {name:'快捷输入列表'},
          {name:'文件类型列表'}
      ]
    },
    permissions:store.state.permissions,
  }),
  methods:{
      colseEditUserDialog(){
            this.oldPass = ''
            this.useraccount = localStorage.getItem('userAccount')
            this.newPass = ''
            this.eidtUserPass = false
        },
    editPass(){
      this.eidtUserPass = true
    },
    logout:function(){
      sessionStorage.removeItem("token")
      localStorage.removeItem('permissions')
      this.$router.replace({path:"/login"})
    },
    getPermissions(){
      return new Promise((resolve,reject) =>{
        axios({
          method: 'GET',
          url: 'users/permissions/',
          headers:{
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          }
        }).then(response => {
          resolve(response)
          this.permissions = response.data
          localStorage.setItem('permissions',JSON.stringify(response.data))
          store.commit('setPermission', response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserId(){
        return new Promise((resolve,reject) =>{
            axios({
              method: 'GET',
              url:'/user/'+ localStorage.getItem('userAccount') +'/',
              headers:{
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
              }
            }).then(response =>{
              resolve(response)
              console.log(response.data)
            }).catch(error =>{
              reject(error)
            })
      })
    },
    editUserPass(){
      return new Promise((resolve,reject) =>{
            axios({
              method: 'POST',
              url:'users/',
              headers:{
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
              },
              data:{
                      userAccount: this.useraccount,
                      oldPassWord: this.oldPass,
                      newPassWord: this.newPass
                    }
            }).then(response =>{
              resolve(response)
                    this.snackbar = true
                    this.snackbarText = '修改成功'
                    this.snackbarColor = 'success'
                    this.eidtUserPass = false
            }).catch(error =>{
              reject(error)
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = error.response.data.message
            })
      })
    }
  },
  created(){
    this.getPermissions()
    .then(success =>{

    })
    this.getUserId()
    .then(success =>{
        localStorage.setItem('userId',success.data.id)
        localStorage.setItem('userName',success.data.username)
        localStorage.setItem('userGroup',success.data.groupId)
    })
  }
}
</script>

<style>
/* width*/
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #cfd8dc;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b0bec5;
}

table.v-table tbody td{
    height: 32px;
}
</style>
