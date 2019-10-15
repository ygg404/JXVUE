<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                <v-layout align-start justify-start row fill-height>
                    <v-flex xs4>
                        <el-date-picker v-model="chooseDate" type ="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="dateType">
                        </el-date-picker>
                    </v-flex>
                    <v-flex xs2><v-select v-model="chooseType" clearable :items="chooseTypes" item-text="name" item-value="name" placeholder="类型选择" class="chooseT"></v-select></v-flex>
                    <v-flex xs2><v-text-field v-model="search" append-icon="search" placeholder="关键词搜索" label="search" single-line hide-details></v-text-field></v-flex>
                </v-layout>
            </v-card-title>
            <v-data-table :headers="headers" :items="projects" :loading="loading" :total-items="totalProjects" :pagination.sync="pagination" class="elevation-1" must-sort>
                <template slot="items" slot-scope="props">
                    <td>{{props.item.contractNo}}</td>
                    <td>{{props.item.projectName}}</td>
                    <td>{{props.item.projectAuthorize}}</td>
                    <td>{{props.item.projectSetUp}}</td>
                    <td>{{props.item.projectUser}}</td>
                    <td style="min-width: 120px;">{{props.item.projectStartTime}}</td>
                    <td style="min-width: 100px;">{{props.item.projectStage}}</td>
                    <v-btn color="error" flat @click="deleteItem(props.item)" title="删除" class="controllSelect"><v-icon color="error" small>delete</v-icon>彻底删除</v-btn>
                    <v-btn color="blue darken-1" flat @click="backItem(props.item)" title="恢复" class="controllSelect"><v-icon color="info" small>restore</v-icon>恢复</v-btn>
                </template>
            </v-data-table>
            <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
                {{snackbarText}}
            </v-snackbar>
        </v-card>
    </v-container>
</template>

<script>
    import store from '@/store.js'
    export default {
        data: ()=>({
            projectNo:'',
            projects:[],
            chooseTypes:[],
            stages:[],
            chooseType:'',
            isPutToPlan:false,
            loading: false,
            dateMenu:false,
            chooseDate:false,
            editStageDialog:false,
            totalProjects : 0,
            startDate:'',
            endDate:'',
            search:'',
            p_stage:2,
            stageId:'',
            pagination: {},
            snackbar:false,
            snackbarColor:'',
            snackbarText:'',
            snackbarTimeout:2000,
            permissions:JSON.parse(localStorage.getItem('permissions')),
            headers:[
                {text:'合同编号',value:'contractNo'},
                {text:'项目名称',value:'projectName',sortable:false},
                {text:'委托单位',value:'projectAuthorize',sortable:false},
                {text:'立项人',value:'projectSetUp'},
                {text:'项目负责人',value:'projectUser'},
                {text:'启动时间',value:'projectStartTime'},
                {text:'项目阶段',value:'projectStage',sortable:false}
            ]
        }),
        methods:{
            getProjectsFromApi(){
                if(this.chooseDate == null || this.chooseDate.length == 0){
                    this.startDate = ''
                    this.endDate = ''
                }else if(this.chooseDate.length > 0){
                    this.startDate = this.chooseDate[0]
                    this.endDate = this.chooseDate[1]
                }
                return new Promise((resolve,reject) =>{
                    this.loading = true
                    const{ sortBy,descending,page,rowsPerPage} = this.pagination
                    axios({
                        methods:'GET',
                        url:'projectRecycle/',
                        params:{
                            page: this.pagination.page,
                            rowsPerPage: this.pagination.rowsPerPage,
                            sortBy: this.pagination.sortBy,
                            descending: this.pagination.descending,
                            search: this.search,
                            startDate: this.startDate,
                            endDate: this.endDate,
                            p_stage: this.p_stage,
                            stageId: this.stageId,
                            account:''
                        },
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        this.projects = response.data.data
                        this.totalProjects = response.data.total
                        console.log(response.data)
                        this.loading = false
                        resolve(response.data)
                    }).catch(error=>{
                        this.loading = false
                        reject(error.response)
                    })
                })
            },
            deleteItem(item){
                if(!this.permissions.includes('all_permission') || this.permissions.includes('delete_project')){
                            this.snackbarColor = 'error'
                            this.snackbarText = '无操作权限'
                            this.snackbar = true
                            return false
                        }
                if(confirm("确认删除项目:\""+item.projectName+"\"吗?\n删除后将无法复原!")){
                    axios({
                    url: 'project/',
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer '+sessionStorage.getItem('token')
                    },
                    params:{
                        projectNo: item.projectNo
                    }
                    }).then(response => {
                    this.snackbarText = '成功删除'
                    this.snackbarColor = 'success'
                    this.snackbar = true
                    this.getProjectsFromApi()
                    .then(data => {
                    }).catch(error=>{})
                    })
                }
        },
        backItem(item){
        if(!this.permissions.includes('all_permission') || this.permissions.includes('back_project')){
                    this.snackbarColor = 'error'
                    this.snackbarText = '无操作权限'
                    this.snackbar = true
                    return false
        }
        if(confirm("确认恢复编号为\""+item.projectNo+"\"的项目?")){
            axios({
            url: 'project/recycle/',
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' +sessionStorage.getItem('token')
            },
            params:{
                projectNo:item.projectNo,
                stageId:1
            }
            }).then(response => {
            this.snackbarText = '恢复成功'
            this.snackbarColor = 'success'
            this.snackbar = true
            this.getProjectsFromApi()
            .then(success =>{
              this.projects = success.data

            }).catch(error =>{

            })
            })
        }
        },
        },mounted(){
            this.pagination.rowsPerPage = 25
            this.getProjectsFromApi()
                .then(success =>{
                    this.projects = success.data
                    this.totalProjects = success.total
                }).catch(error =>{

            })
        },
        watch:{
            pagination:{
                handler(){
                    this.getProjectsFromApi()
                        .then(success =>{
                            this.projects = success.data
                            this.total = success.data
                        }).catch(error =>{

                    })
                }
            },
            search:{
                handler(){
                    this.getProjectsFromApi().then(data=>{}).catch(error=>{})
                }
            },
            chooseDate:{
                handler(){
                    this.getProjectsFromApi().then(data=>{}).catch(error=>{})
                }
            },
            chooseType:{
                handler(){
                    if(this.chooseType != null){
                        this.search = this.chooseType
                    }else{
                        this.search = ''
                    }
                    this.getProjectsFromApi().then(data=>{}).catch(error=>{})
                }
            }
        }
    }
</script>
<style>
    .chooseT{
        margin-right: 2rem
    }
    .dateType{
        margin-top: 0.5rem
    }
    .searchBtn{
        margin-left: 20px;
        margin-top: 12px
    }

    table.v-table tbody td{
        height: 32px;
    }
</style>

