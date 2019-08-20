<template>
    <v-container fluid>
        <v-card>
            <v-dialog max-width="500px" v-model="editStageDialog" persistent>
                <v-card>
                    <v-card-title><span class="title">修改项目</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout wrap>
                                <v-flex md12>
                                    <v-text-field v-model="project.projectName" label="项目名称:" :rules="noteRules" prepend-icon="calendar_today" disabled></v-text-field>
                                    <v-text-field v-model="project.projectType" label="项目类型:" :rules="noteRules" prepend-icon="book" disabled></v-text-field>
                                    <v-text-field v-model="project.projectNo" label="项目编码:" :rules="noteRules" prepend-icon="settings_ethernet" disabled></v-text-field>
                                    <v-menu v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="project.projectStartDate" label="项目启动时间:" :rules="noteRules" prepend-icon="event" readonly v-on="on" disabled></v-text-field>
                                        </template>
                                        <v-date-picker v-model="project.projectStartDate" @input="dateMenu = false"></v-date-picker>
                                    </v-menu>
                                    <v-select v-model="project.projectStages" label="项目阶段:" :rules="noteRules" :items="stages" item-text="name" item-value="name" prepend-icon="book"></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="editStageDialog = false">取消</v-btn>
                        <v-btn color="info" @click="editProjectToApi">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-card-title class="headline">项目处理</v-card-title>
            <v-card-title>
                <v-layout row wrap style="display: flex;flex-wrap: wrap">
                    <el-date-picker v-model="chooseDate" type ="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="dateType">
                    </el-date-picker>
                    <v-flex xs2><v-select v-model="stageId" clearable :items="stages" item-text="name" item-value="id" placeholder="阶段选择" class="chooseT"></v-select></v-flex>
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
                    <td>{{props.item.projectCharge}}</td>
                    <td>{{props.item.projectStartTime}}</td>
                    <td>{{props.item.projectStage}}</td>
                    <v-btn color="blue darken-1" flat @click="editProjectDialogData(props.item)" title="改阶段" class="controllEdit"><v-icon small> edit</v-icon>修改阶段</v-btn>
                    <v-btn color="blue darken-1" flat @click="SelectItem(props.item)" title="查看" class="controllSelect"><v-icon small>search</v-icon>查看</v-btn>
                    <v-btn color="blue darken-1" flat @click="print(props.item)" title="打印" class="controllSelect"><v-icon small>print</v-icon>打印</v-btn>

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
            p_stage:1,
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
                {text:'业务负责人',value:'projectCharge'},
                {text:'立项人',value:'projectSetUp'},
                {text:'项目负责人',value:'projectUser'},
                {text:'启动时间',value:'projectStartTime'},
                {text:'项目阶段',value:'projectStage',sortable:false}
            ],
            noteRules:[
                v => !!v || "内容不能为空"
            ],
            project:{
                projectNo:'',
                projectName:'',
                projectType:'',
                projectStages:'',
                projectStageId:'',
                projectStartDate: new Date().toISOString().substr(0, 10)
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
                            account: ''
                        },
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        this.projects = response.data.data
                        this.loading = false
                        resolve(response.data)
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
           
            editProjectToApi(){
                return new Promise((resolve,reject) =>{
                    if(this.project.projectStages == ""){
                        this.snackbar = true
                        this.snackbarColor = 'error'
                        this.snackbarText = '有必填项为空，请重新检查'
                        return false
                    }
                    this.stages.forEach(e=>{
                        if(e.name == this.project.projectStages){
                            this.project.projectStageId = e.id
                        }
                    })
                    axios({
                        method:'POST',
                        url:'project/stage/',
                        headers:{
                            Authorization: "Bearer " +sessionStorage.getItem('token')
                        },
                        data:{
                            projectStage: this.project.projectStageId,
                            projectNo:this.project.projectNo,
                        }
                    }).then(response =>{
                        this.stageId = ''
                        this.project.projectNo = ''
                        this.project.projectName = ''
                        this.project.projectNum = ''
                        this.project.projectType = ''
                        this.project.projectStartDate = ''
                        this.editStageDialog = false
                        this.getProjectsFromApi()
                            .then(success =>{
                                this.projects = success.data
                                this.totalProjects = success.total
                            }).catch(error =>{
                        })
                        this.snackbar = true,
                            this.snackbarColor = 'success',
                            this.snackbarText = '更改成功'
                    }).catch(error =>{
                        this.snackbar = false,
                            this.snackbarColor = 'error',
                            this.snackbarText = error.response.data.message
                    })
                })
            },
            editProjectDialogData:function(item){
                 if(!this.permissions.includes('all_permission') || this.permissions.includes('edit_stage')){
                    this.snackbarColor = 'error'
                    this.snackbarText = '无操作权限'
                    this.snackbar = true
                    return false
                }else{
                    this.project.projectNo = item.projectNo
                    this.project.projectName = item.projectName
                    this.project.projectType = item.projectType
                    this.project.projectStageId = item.projectStageId
                    this.project.projectStartDate = item.projectStartTime
                    this.project.projectStages = item.projectStage
                    this.editStageDialog = true
                }
            },
            getprojectStage(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'stage/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(success=>{
                        resolve(success.data)
                        this.stages = success.data
                    }).catch(error=>{
                        
                    })
                })
            },
            SelectItem:function(item){
                this.$router.push({name:'showproject',query:{'p_no':item.projectNo}});
            },
            print:function(item){
                this.$router.push({name:'printproject',query:{'p_no':item.projectNo,'type_id':3}});
            }
        },mounted(){
            this.pagination.descending = true
            this.pagination.sortBy = 'id'
            this.pagination.rowsPerPage = 25
            this.getProjectsFromApi()
                .then(success =>{
                    this.projects = success.data
                    this.totalProjects = success.total
                }).catch(error =>{

            })
            this.getprojectStage().then(success=>{}).catch(error=>{})
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
            stageId:{
                handler(){
                    if(this.stageId == null){
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

