<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                <v-layout row wrap style="display: flex;flex-wrap: wrap">
                    <el-date-picker v-model="chooseDate" type ="daterange" range-separator="至" :picker-options="pickerOptions" start-placeholder="开始日期" end-placeholder="结束日期" class="dateType">
                    </el-date-picker>
                    <v-flex xs2><v-select v-model="chooseStage" clearable :items="chooseStages" item-text="name" item-value="id" placeholder="阶段选择" class="chooseT"></v-select></v-flex>
                    <v-flex xs2><v-select v-model="chooseType" clearable :items="chooseTypes" item-text="name" item-value="name" placeholder="类型选择" class="chooseT"></v-select></v-flex>
                    <v-flex xs2><v-text-field v-model="search" append-icon="search" placeholder="关键词搜索" label="search" single-line hide-details></v-text-field></v-flex>
                </v-layout>
            </v-card-title>
            <v-data-table :headers="headers" :items="projects" :loading="loading" :total-items="totalProjects" :pagination.sync="pagination" class="elevation-1" must-sort>
                <template slot="items" slot-scope="props">
                    <td>{{props.item.contractNo}}</td>
                    <td>{{props.item.projectName}}</td>
                    <td>{{props.item.projectType}}</td>
                    <td>{{props.item.projectAuthorize}}</td>
                    <td>{{props.item.projectStartTime}}</td>
                    <td>{{props.item.projectStage}}</td>
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
            pickerOptions: {
                shortcuts: [{
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '一年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            projectNo:'',
            projects:[],
            types:[],
            chooseStages:[],
            chooseTypes:[],
            projectRole:[],
            chooseType:'',
            chooseStage:'',
            isPutToPlan:false,
            loading: false,
            addDateMenu: false,
            dateMenu:false,
            clearable:false,
            chooseDate:false,
            addProjectDialog:false,
            editProjectDialog:false,
            totalProjects : 0,
            startDate:'',
            endDate:'',
            search:'',
            p_stage:1,
            stageId:'',
            pagination: {},
            snackbar:false,
            snackbarColor:'',
            snackbarText:'',
            userId: localStorage.getItem('userId'),
            value:'',
            snackbarTimeout:2000,
            permissions:JSON.parse(localStorage.getItem('permissions')),
            headers:[
                {text:'合同编号',value:'projectNo'},
                {text:'项目名称',value:'projectName',sortable:false},
                {text:'项目类型',value:'projectType'},
                {text:'委托单位',value:'projectAuthorize',sortable:false},
                {text:'开始时间',value:'projectStartTime'},
                {text:'项目阶段',value:'projectStage',sortable:false}
            ],
            noteRules:[
                v => !!v || "内容不能为空"
            ],
            project:{
                project_no:'',
                project_name:'',
                project_num:'',
                project_type:'',
                project_money:'',
                project_authorize:'',
                user_name:'',
                user_phone:'',
                project_note:'',
                project_charge:'',
                project_produce:'',
                project_start_date: new Date().toISOString().substr(0, 10)
            }
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
                        url:'projectSetUp/',
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
                        this.loading = false
                        resoleve(response.data)
                    }).catch(error=>{
                        this.loading = false
                        reject(error.response)
                    })
                })
            },
            getTypeFromApi(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'projectTypes/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(response => {
                        resolve(response.data)
                    }).catch(error =>{
                        reject(error.response.data)
                    })
                })
            },
            getStageFromApi(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'stage/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(response => {
                        resolve(response.data)
                    }).catch(error =>{
                        reject(error.response.data)
                    })
                })
            },
            getProjectRole(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'project/role/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        params:{
                            roleId:10,
                        }
                    }).then(success=>{
                        resolve(success.data)
                        this.projectRole = success.data
                        this.project.project_produce = this.projectRole[0].username
                    })
                })
            },
        },
        mounted(){
            this.pagination.rowsPerPage = 25
            this.getProjectsFromApi()
                .then(success =>{
                    this.projects = success.data
                    
                }).catch(error =>{

            }), this.getTypeFromApi()
                .then(response =>{
                    this.types = response
                    this.chooseTypes = response
                }).catch(error =>{

                }),
                this.getProjectRole().then(success=>{}).catch(error=>{}),
                this.getStageFromApi().then(response=>{
                    this.chooseStages = response
                }).catch(error=>{})
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
            },
            chooseStage:{
                handler(){
                    if(this.chooseStage != null){
                        this.stageId = this.chooseStage
                    }else{
                        this.stageId = ''
                    }

                    this.getProjectsFromApi().then(data=>{}).catch(error=>{})
                }
            }
        }
    }
</script>
<style>
    .v-input__control {
        margin-right: 20px;
    }

    .v-input__slot {
        width: 100%;
        margin-right: 15px;
    }

    .el-range-editor.el-input__inner {
        margin-top: 10px;
    }

    .v-input input {
        max-height: 30px;
    }

    .el-range-editor.el-input__inner {
        margin-top: 20px !important;
        margin-right: 20px !important;
    }

    .mb-2 {
        margin-top: 20px !important;
    }
</style>

