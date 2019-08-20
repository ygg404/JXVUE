<template>
    <v-container fluid>
        <v-card width="100%">
            <v-flex xs2>
                <v-btn slot="activator" color="primary" class="addUser" @click="addUser">添加用户</v-btn>
            </v-flex>

            <v-dialog max-width="500px" v-model="addUserDialog" persistent>
                <v-card>
                    <v-card-title><span class="title">添加用户</span></v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="user.userName" label="姓名:"></v-text-field>
                                <v-text-field v-model="user.userAccount" label="登录账号:"></v-text-field>
                                <v-text-field v-model="user.userPassword" label="登录密码:"></v-text-field>
                                <v-select v-model="addRoleGroup" :items="roles" label="角色组" multiple item-value="id" item-text="name"></v-select>
                                <v-select v-model="addWorkGroup" :items="works" label="工作组"  item-value="id" item-text="gName"></v-select>
                            </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="colseAddUserDialog">取消</v-btn>
                        <v-btn color="info" @click="addGroupApi">添加作业组</v-btn>
                        <v-btn color="info" @click="addUserToApi">新增</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

              <v-dialog max-width="500px" v-model="editUserDialog" persistent>
                <v-card>
                    <v-card-title><span class="title">修改用户</span></v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="user.userName" label="姓名:"></v-text-field>
                                <v-text-field v-model="user.userAccount" label="登录账号:" disabled></v-text-field>
                                <v-text-field v-model="user.userPassword" label="登录密码:"></v-text-field>
                                <v-select v-model="addRoleGroup" :items="roles" label="角色组" multiple  item-value="id" item-text="name"></v-select>
                                <v-select v-model="addWorkGroup" :items="works" label="工作组"  item-value="id" item-text="gName"></v-select>
                            </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="colseEditUserDialog">取消</v-btn>
                        <v-btn color="info" @click="editUserToApi()">修改</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog max-width="500px" v-model="addGroupDialog" persistent>
                <v-card>
                    <v-card-title>
                        <span class="title">添加作业组</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout wrap>
                                <v-flex md12>
                                    <v-text-field v-model="newGroupName" label="组名:" prepend-icon="group_work"></v-text-field>
                                    <!--<v-select v-model="newHead" label="队长:" :rules="noteRules" :items="users" item-text="userName" item-value="userName" prepend-icon="people"></v-select>
                                    <v-select v-model="newDeputy" label="副队长:" :rules="noteRules" :items="users" item-text="userName" item-value="userName" prepend-icon="people"></v-select>-->
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="addGroupDialog = false">取消</v-btn>
                        <v-btn color="info"  @click="addGroup">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-data-table :headers="headers" :items="users" :loading="loading" :total-items="totalUsers" :pagination.sync="pagination" must-sort>
                <template slot="items" slot-scope="props">
                    <td>{{props.item.userName}}</td>
                    <td>{{props.item.userAccount}}</td>
                    <td>{{props.item.role}}</td>
                    <td>{{props.item.group}}</td>
                    <td>{{props.item.lastLoginTime}}</td>
                    <td>
                        <v-btn  color="blue darken-1" flat class="userBtn" @click="editUserDialogData(props.item)"><v-icon small> edit</v-icon>编辑</v-btn>
                        <v-btn  color="error" flat   @click="deleteUser(props.item)"><v-icon small color="error">delete</v-icon>删除</v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card>

        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
            {{snackbarText}}
        </v-snackbar>

    </v-container>    
</template>

<script>
import store from '@/store.js'
export default {
    data:()=>({
        loading:false,
        users:[],
        user:{
            userName:'',
            userAccount:'',
            userPassword:'', 
            },
        roles:[],
        rolesId:[],
        works:[],
        workId:'',
        newGroupName:'',
        newHead:'',
        newDeputy:'',
        addRoleGroup:[],
        addWorkGroup:'',
        totalUsers:0,
        pagination:{},
        addUserDialog: false,
        editUserDialog: false,
        addGroupDialog: false,
        snackbar:false,
        snackbarColor:'',
        snackbarText:'',
        snackbarTimeout:2000,
        permissions:JSON.parse(localStorage.getItem('permissions')),
        headers:[
            {text:'姓名' ,value:'username'},
            {text:'用户账号',value:'useraccount'},
            {text:'角色组',sortable:false},
            {text:'工作组',sortable:false},
            {text:'最后登录时间',value:'last_login_date_time'}
            
        ]
    }),
    methods:{
        colseEditUserDialog(){
            this.user.userName = ''
            this.user.userAccount = ''
            this.user.userPassword = ''
            this.addRoleGroup = []
            this.addWorkGroup = ''
            this.editUserDialog = false
        },
        colseAddUserDialog(){
            this.user.userName = ''
            this.user.userAccount = ''
            this.user.userPassword = ''
            this.addRoleGroup = []
            this.addWorkGroup = ''
            this.addUserDialog = false
        },
        getUserFromApi(){
            return new Promise((resolve,reject) =>{
                this.loading = true
                const{ sortBy,descending,page,rowsPerPage} = this.pagination
                axios({
                    methods:'GET',
                    url:'getAccounts/',
                    params:{
                        page: this.pagination.page,
                        rowsPerPage: this.pagination.rowsPerPage,
                        sortBy: this.pagination.sortBy,
                        descending: this.pagination.descending
                    },
                    headers:{
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(response =>{
                    this.loading = false
                    resolve(response.data)
                }).catch(error =>{
                    this.loading = false
                    reject(error.response.data)
                })
            })
        },
        addGroupApi(){
            this.addGroupDialog = true;
        },
        getWorkGroupFromApi(){
            return new Promise((resolve,reject)=>{
                axios({
                    method:'GET',
                    url:'workGroups/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    }
                }).then(response=>{
                    resolve(response)
                }).catch(errpr=>{
                    reject(error.response)
                })
            })
        },
        getRoleGroupFromApi(){
            return new Promise((resolve,reject) =>{
                axios({
                    method:'GET',
                    url:'roles/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    }
                }).then(response=>{
                    resolve(response)
                }).catch(error=>{
                    reject(error.response)
                })
            })
        },
        addGroup(){
            if(this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')){
                axios({
                    url: 'workGroups/',
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    },
                    data: {
                        gName: this.newGroupName,
                        headMan: '',
                        deputyLeader:''
                    }
                }).then(response => {
                    this.newGroupName = ''
                    this.addGroupDialog = false
                    this.snackbarColor = 'success'
                    this.snackbarText = '成功添加新组'
                    this.getWorkGroupFromApi()
                        .then(success => {
                            this.works = success.data
                        })
                    this.snackbar = true
                }).catch(error => {
                    this.snackbarColor = 'error'
                    this.snackbarText = error.response.data.message
                    this.snackbar = true
                })
            }else{
                this.snackbarColor = 'error'
                this.snackbarText = '无操作权限'
                this.snackbar = true
                return false

            }
        },
        addUser(){
            if(this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')) {
                this.getWorkGroupFromApi()
                    .then(success => {
                        this.works = success.data
                    })
                this.getRoleGroupFromApi()
                    .then(success => {
                        this.roles = success.data
                    })
                this.addUserDialog = true
            }else{
                this.snackbarColor = 'error'
                this.snackbarText = '无操作权限'
                this.snackbar = true
                return false
            }
        },
        addUserToApi(){
            return new Promise((resolve,reject) => {
                axios({
                    method: 'POST',
                    url: 'accounts/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                    data:{
                        username:this.user.userName,
                        userAccount:this.user.userAccount,
                        password:this.user.userPassword,
                        roleIds:this.addRoleGroup,
                        groupId:this.addWorkGroup
                    }
                }).then(response =>{
                      this.getUserFromApi()
                        .then(data=>{
                        this.users = data.data
                        this.totalUsers = data.total
                    })
                    this.user.userName = ''
                    this.user.userAccount = ''
                    this.user.userPassword = ''
                    this.addRoleGroup = []
                    this.addWorkGroup = ''
                    this.addUserDialog = false
                    this.snackbar = true
                    this.snackbarText = response.data.message
                    this.snackbarColor = 'success'
                }).catch(error =>{
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = error.response.data.message
                })
            })
        },
        editUserDialogData(item){
            this.user.id = item.id
            this.user.userName = item.userName
            this.user.userAccount = item.userAccount
            this.getRoleIdApi(item.role)
                .then(success =>{
                    this.rolesId = success
                    this.addRoleGroup = this.rolesId
                })
            this.getWorkIdApi(item.group)
                .then(success =>{
                    this.workId = success
                    this.addWorkGroup = this.workId
                })
            this.getWorkGroupFromApi()
            .then(success =>{ 
                this.works = success.data  
            })
            this.getRoleGroupFromApi()
                .then(success =>{
                    this.roles = success.data
            })
            this.editUserDialog = true
        },
        getRoleIdApi(role){
            return new Promise((resolve,reject) =>{
                this.loading = true
                const{ sortBy,descending,page,rowsPerPage} = this.pagination
                axios({
                    methods:'GET',
                    url:'getRoleId/',
                    params:{
                        rolename: role
                    },
                    headers:{
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(response =>{
                    this.loading = false
                    resolve(response.data)
                }).catch(error =>{
                    this.loading = false
                    reject(error.response.data)
                })
            })
        },
        getWorkIdApi(work){
            return new Promise((resolve,reject) =>{
                this.loading = true
                const{ sortBy,descending,page,rowsPerPage} = this.pagination
                axios({
                    methods:'GET',
                    url:'getWorkId/',
                    params:{
                        workname: work
                    },
                    headers:{
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(response =>{
                    this.loading = false
                    resolve(response.data)
                }).catch(error =>{
                    this.loading = false
                    reject(error.response.data)
                })
            })
        },
        editUserToApi(){
             return new Promise((resolve,reject) => {
                axios({
                    method: 'POST',
                    url: 'user/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                    data:{
                        username:this.user.userName,
                        userAccount:this.user.userAccount,
                        newPassword:this.user.userPassword,
                        roleIds:this.addRoleGroup,
                        groupId:this.addWorkGroup
                    }
                }).then(response =>{
                      this.getUserFromApi()
                        .then(data=>{
                        this.users = data.data
                        this.totalUsers = data.total
                    })
                    this.user.userName = ''
                    this.user.userAccount = ''
                    this.user.userPassword = ''
                    this.addRoleGroup = []
                    this.addWorkGroup = ''
                    this.editUserDialog = false
                    this.snackbar = true
                    this.snackbarText = response.data.message
                    this.snackbarColor = 'success'
                }).catch(error =>{
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = error.response.data.message
                })
            })
        },
        deleteUser(item){
            if(this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')) {
                if (confirm("确认删除\"" + item.userName + "\"?\n删除后将无法复原!")) {
                    axios({
                        url: 'user/',
                        method: 'DELETE',
                        params: {
                            userAccount: item.userAccount
                        },
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('token')
                        }
                    }).then(response => {
                        this.snackbarText = '成功删除用户'
                        this.snackbarColor = 'success'
                        this.snackbar = true
                        this.getUserFromApi()
                            .then(data => {
                                this.users = data.data
                                this.totalUsers = data.total
                            }).catch(error => {
                            this.snackbar = true
                            this.snackbarColor = 'error'
                            this.snackbarText = error.response.data.message
                        })
                    })
                }
            }else{
                this.snackbarColor = 'error'
                this.snackbarText = '无操作权限'
                this.snackbar = true
                return false
            }
        }
    },
    mounted(){
        this.pagination.rowsPerPage = 25
        this.getUserFromApi()
        .then(data=>{
            this.users = data.data
            this.totalUsers = data.total
        })
    },
    watch:{
        pagination:{
            handler(){
                this.getUserFromApi()
                .then(data=>{
                    this.users = data.data
                    this.totalUsers = data.total
                })
            }
        }
    }
}
</script>
<style>
    .addUser{
        margin:20px
    }
    .userBtn{
        margin-right: 1rem
    }
</style>
