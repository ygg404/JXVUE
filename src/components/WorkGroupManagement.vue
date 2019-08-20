<template>
    <v-container fluid>
        <v-card width="100%">
            <v-card-title>
                <v-dialog max-width="500px" v-model="addGroupDialog" persistent>
                    <v-btn slot="activator" color="primary" dark class="mb-2">添加作业组</v-btn>
                    <v-card>
                        <v-card-title>
                            <span class="title">添加作业组</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-layout wrap>
                                    <v-flex md12>
                                        <v-text-field v-model="newGroupName" label="组名:"  :rules="noteRules" prepend-icon="group_work"></v-text-field>
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
                <v-spacer></v-spacer>
            </v-card-title>

            <v-dialog max-width="500px" v-model="editGroupDialog" persistent>
                <v-card>
                    <v-card-title>
                        <span class="title">修改作业组</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout wrap>
                                <v-flex md12>
                                    <v-text-field v-model="group.gName" label="组名:" :rules="noteRules" prepend-icon="group_work"></v-text-field>
                                    <v-select v-model="group.headMan" label="队长:"  :items="users" item-text="userName" item-value="userName" prepend-icon="people"></v-select>
                                    <v-select v-model="group.deputyLeader" label="副队长:"  :items="users" item-text="userName" item-value="userName" prepend-icon="people"></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat  @click="closeDialog">取消</v-btn>
                        <v-btn color="info" @click="editGroup">确定修改</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-data-table :headers="headers" :items="groups" :loading="loading" :total-items="totalGroups" :pagination.sync="pagination" class="elevation-1" must-sort>
                <template slot="items" slot-scope="props">
                    <v-btn color="blue darken-1" flat @click="uplocation(props.item)" class="controllLo"><v-icon small> arrow_upward</v-icon></v-btn>
                    <td>{{props.item.gName}}</td>
                    <td>{{props.item.headMan}}</td>
                    <td>{{props.item.deputyLeader}}</td>
                    <td>{{props.item.timeData}}</td>
                    <v-btn color="blue darken-1" flat @click="editGroupDialogData(props.item)" title="修改" class="controllEdit"><v-icon small> edit</v-icon>编辑</v-btn>
                    <v-btn color="error" flat @click="deleteItem(props.item)" title="删除" class="controllDelete"><v-icon color="error" small>delete</v-icon>删除</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
            {{snackbarText}}
            <v-btn color="white" flat @click="snackbar=false">关闭</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
import store from '@/store.js'
export default {
    data: ()=>({
        newGroupName: '',
        newHead: '',
        newDeputy: '',
        addGroupDialog: false,
        editIndex:'',
        editGroupDialog: false,
        loading:false,
        search:'',
        totalGroups:0,
        pagination:{},
        headers:[
            {text:'顺序',value:'name',sortable:false},
            {text:'组名',value:'name',sortable:false},
            {text:'队长',value:'head_man',sortable:false},
            {text:'副队长',value:'deputy_leader',sortable:false},
            {text:'创建时间',value:'createTime',sortable:false}
        ],
        group:{
            id:null,
            gName:null,
            headMan:null,
            deputyLeader:null,
        },
        groups:[],
        users:[],
        a1:'',
        snackbar:false,
        snackbarColor:'',
        snackbarText:'',
        snackbarTimeout:2000,
        permissions:JSON.parse(localStorage.getItem('permissions')),
        noteRules:[
            v => !!v || "内容不能为空"
        ],
    }),

    methods:{
        editGroupDialogData(item){
            this.group.id = item.id
            this.group.gName = item.gName
            this.group.headMan = item.headMan
            this.group.deputyLeader = item.deputyLeader
            this.editGroupDialog = true
        },
        getGroupsFromApi(){
            return new Promise((resoleve,reject) =>{
                this.loading = true
                const{ sortBy,descending,page,rowsPerPage} = this.pagination
                axios({
                    methods:'GET',
                    url:'workGroups/',
                    params:{
                        page: this.pagination.page,
                        rowsPerPage: this.pagination.rowsPerPage,
                        sortBy: this.pagination.sortBy,
                        descending: this.pagination.descending,
                        search: this.search
                    },
                    headers:{
                        Authorization: 'Bearer ' + sessionStorage.getItem("token")
                    }
                }).then(response=>{
                    this.group = response.data.data
                    this.loading = false
                    console.log(this.group)
                    resoleve(response.data)
                }).catch(error=>{
                    this.loading = false,
                    reject(error.response.data)
                })
            })
        },
        getUserFromApi(){
            return new Promise((resolve,reject)=>{
                axios({
                    methods:'GET',
                    url:'user/',
                    headers:{Authorization :'Bearer ' + sessionStorage.getItem("token")}
                }).then(success=>{
                    this.users = success.data
                }).catch(error=>{
                    
                })
            })
        },
        uplocation(item){
            console.log(item)
            return new Promise((resolve,reject)=>{
                axios({
                    url:'group/position/',
                    method: 'POST',
                    headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    },
                    data: {
                        id: item.id,
                        fId: item.fId
                    }
                }).then(success=>{
                     this.getGroupsFromApi()
                        .then(data =>{
                            this.groups = data.data
                            this.totalGroups = data.total
                        })
                }).catch(error=>{
                    
                })
            })
        },
        editGroup(item){
            console.log(this.group.gName)
            if(this.group.gName == null || this.group.gName.length == 0){
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = '有必填项为空，请重新检查'
                    return false
                }
            if(this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')) {
                axios({
                    url: 'workGroups/' + this.group.id + '/',
                    method: 'PUT',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    },
                    data: {
                        gName: this.group.gName,
                        headMan: this.group.headMan,
                        deputyLeader: this.group.deputyLeader
                    }
                }).then(response => {
                    this.group.gName = ''
                    this.group.headMan = ''
                    this.group.deputyLeader = ''
                    this.editGroupDialog = false
                    this.getGroupsFromApi()
                        .then(data => {
                            this.groups = data.data
                            this.totalGroups = data.total
                        })
                    this.snackbar = true
                    this.snackbarColor = 'success'
                    this.snackbarText = '修改成功'
                }).catch(error => {
                    this.snackbarColor = 'error'
                    this.snackbarText = error.response.data.message
                    this.snackbar = true
                })
            }else{
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = '无操作权限'
                return false
            }
        },
        addGroup(){
            console.log(this.newGroupName)
            if(this.newGroupName == null || this.newGroupName.length == 0){
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = '有必填项为空，请重新检查'
                    return false
                }
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
                    this.getGroupsFromApi()
                    .then(data => {
                    this.groups = data.data
                    this.totalGroups = data.total
                    })
                    this.snackbarColor = 'success'
                    this.snackbarText = '成功添加新组'
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
        deleteItem(item){
        if(!this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')){
                    this.snackbarColor = 'error'
                    this.snackbarText = '无操作权限'
                    this.snackbar = true
                    return false
                }
        if(confirm("确认删除\""+item.gName+"\"?\n删除后将无法复原!")){
            var url = 'workGroups/'+item.id+"/"
            axios({
            url: url,
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer '+sessionStorage.getItem('token')
            }
            }).then(response => {
            this.snackbarText = '成功删除组'
            this.snackbarColor = 'success'
            this.snackbar = true
            this.getGroupsFromApi()
            .then(data => {
                this.groups = data.data
                this.totalGroups = data.total
            })
            })
        }
        },
        closeDialog(){
            this.editGroupDialog = false;   //对话框关闭
        }
    },
    mounted(){
        this.pagination.descending = false
        this.pagination.sortBy = 'f_id'
        this.pagination.rowsPerPage = 25
        this.getGroupsFromApi()
        .then(data =>{
            this.groups = data.data
            this.totalGroups = data.total
        })
        this.getUserFromApi().then(success=>{}).catch(error=>{})
    },
    watch:{
        pagination:{
            handler(){
                this.getGroupsFromApi()
                .then(data => {
                    this.groups = data.data
                    this.totalGroups = data.total
                })
            }
        }
    } 
}
</script>
<style>
.controllEdit{
    margin-right: 2rem;
    margin-top:1rem
}
.controllLo{
    margin: -10px;
}
</style>
