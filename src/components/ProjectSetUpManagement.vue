<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid>
        <v-card>
            <v-dialog max-width="500px" v-model="addProjectDialog" persistent>
                <v-card>
                    <v-card-title><span class="title">添加项目</span>
                        <v-layout justify-end>
                            <v-flex xs4 >
                                <v-select label="生产负责人" v-model="project.project_produce" :items="projectCharges" item-text="userName" item-value="userName"></v-select>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout wrap>
                                <v-flex md12>
                                    <v-select v-model="contractName" label="选择合同:" :items="contractNames" item-text="contractName" item-value="contractNo" @change="chooseContract()" prepend-icon="list_alt"></v-select>
                                    <v-text-field v-model="project.project_name" label="项目名称:" prepend-icon="calendar_today" disabled></v-text-field>
                                    <v-text-field v-model="project.project_type" label="项目类型:" prepend-icon="book" disabled></v-text-field>
                                    <v-text-field v-model="project.project_authorize" label="委托单位:" prepend-icon="nature" disabled></v-text-field>
                                    <v-text-field v-model="project.user_name" label="联系人姓名:" prepend-icon="how_to_reg" disabled></v-text-field>
                                    <v-text-field v-model="project.user_phone" label="联系电话:" prepend-icon="phone" type="number" disabled></v-text-field>
                                    <v-text-field v-model="project.project_note" label="委托要求:" prepend-icon="live_help" disabled></v-text-field>
                                    <v-text-field v-model="project.project_charge" label="业务负责人:"  prepend-icon="account_box" disabled></v-text-field>
                                    <v-menu v-model="addDateMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="project_start_date" label="项目启动时间:" prepend-icon="event" readonly  v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="project_start_date" @input="addDateMenu = false"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="colseaddProjectDialog">取消</v-btn>
                        <v-btn color="success" @click="putStage">提交至项目安排</v-btn>
                        <v-btn color="info" @click="addProjectToApi">新增</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog max-width="500px" v-model="editProjectDialog" persistent>
                <v-card>
                    <v-card-title><span class="title">查看项目</span>
                        <v-layout justify-end>
                            <v-flex xs4 >
                                <v-select label="生产负责人" v-model="project.project_produce" :items="projectCharges" item-text="userName" item-value="userName" disabled></v-select>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout wrap>
                                <v-flex md12>
                                    <v-text-field v-model="project.project_name" label="项目名称:" prepend-icon="calendar_today" disabled></v-text-field>
                                    <v-text-field v-model="project.project_type" label="项目类型:" :items="types" item-text="name" item-value="name" prepend-icon="book" disabled></v-text-field>
                                    <v-text-field v-model="project.project_no" label="项目编号:" prepend-icon="settings_ethernet" disabled></v-text-field>
                                    <v-text-field v-model="project.project_authorize" label="委托单位:" prepend-icon="nature" disabled></v-text-field>
                                    <v-text-field v-model="project.user_name" label="联系人姓名:" prepend-icon="how_to_reg" disabled></v-text-field>
                                    <v-text-field v-model="project.user_phone" label="联系电话:" prepend-icon="phone" type="number" disabled></v-text-field>
                                    <v-text-field v-model="project.project_note" label="委托要求:" prepend-icon="live_help" disabled></v-text-field>
                                    <v-text-field v-model="project.project_charge" label="业务负责人:"  prepend-icon="account_box" disabled></v-text-field>
                                    <!--<v-select label="业务负责人:" v-model="project.project_charge" :rules="noteRules" :items="projectCharges" item-text="userName" item-value="userName" prepend-icon="work"></v-select>-->
                                    <v-menu v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px" >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="project_start_date" label="项目启动时间:" prepend-icon="event" readonly v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="project_start_date" @input="dateMenu = false"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="coloseeditProjectDialog">取消</v-btn>
                        <v-btn color="info"  @click="editProjectStartTime">修改</v-btn>
                        <v-btn color="success" @click="chageStage">提交至项目安排</v-btn><!--
                        <v-btn color="info" @click="editProjectToApi">更改</v-btn>-->
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-card-title>
                <v-layout row wrap style="display: flex;flex-wrap: wrap">
                    <v-flex xs1>
                        <v-btn slot="activator" color="primary" dark class="mb-2" @click="addProject">添加项目</v-btn>
                    </v-flex>
                    <el-date-picker v-model="chooseDate" type ="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="dateType">
                    </el-date-picker>
                    <v-flex xs2><v-select v-model="chooseType" clearable :items="chooseTypes" item-text="name" item-value="name" placeholder="类型选择" class="chooseT"></v-select></v-flex>
                    <v-flex xs2><v-text-field v-model="search" append-icon="search" placeholder="关键词搜索" label="search" single-line hide-details></v-text-field></v-flex>
                    <v-flex xs2><v-btn slot="activator" color="primary" dark class="mb-2" @click="showprojectsetup">查看项目</v-btn></v-flex>
                </v-layout>
            </v-card-title>
            <v-data-table :headers="headers" :items="projects" :loading="loading" :total-items="totalProjects" :pagination.sync="pagination" class="elevation-1" must-sort>
                <template slot="items" slot-scope="props">
                    <td>{{props.item.contractNo}}</td>
                    <td>{{props.item.projectName}}</td>
                    <!--<td>{{props.item.projectType}}</td>-->
                    <td>{{props.item.projectAuthorize}}</td>
                    <td >{{props.item.projectStartTime}}</td>
                    <td>{{props.item.projectStage}}</td>
                    <v-btn color="blue darken-1" flat @click="editProjectDialogData(props.item)" title="查看" class="controllEdit" style="max-height: 25px;"><v-icon small> search</v-icon>查看</v-btn>
                    <v-btn color="error" flat @click="deleteItem(props.item)" title="删除" class="controllDelete" style="max-height: 25px;"><v-icon color="error" small>delete</v-icon>删除</v-btn>
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
            panelShow:false,
            projectCharges:[],
            contractName:'',
            contractNames:[],
            projectNo:'',
            projects:[],
            types:[],
            chooseTypes:[],
            projectRole:[],
            chooseType:'',
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
            stageId:1,
            pagination: {},
            userId: localStorage.getItem('userId'),
            value:'',
            snackbar:false,
            snackbarColor:'',
            snackbarText:'',
            snackbarTimeout:2000,
            groupId:0,
            permissions:JSON.parse(localStorage.getItem('permissions')),
            project_start_date: new Date().toISOString().substr(0, 10),
            headers:[
                {text:'合同编号',value:'contractNo'},
                {text:'项目名称',value:'projectName',sortable:false},
                // {text:'项目类型',value:'projectType'},
                {text:'委托单位',value:'projectAuthorize',sortable:false},
                {text:'启动时间',value:'projectStartTime'},
                {text:'项目阶段',value:'projectStage',sortable:false}
            ],
            project:{
                contractNo:'',
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
            }
        }),
        methods:{
            colseaddProjectDialog(){
                this.stageId = 1
                this.project.project_no = ''
                this.project.project_name = ''
                this.project.project_num = ''
                this.project.project_type = ''
                this.project.project_money = ''
                this.project.project_authorize = ''
                this.project.user_name = ''
                this.project.user_phone = ''
                this.project.project_note = ''
                this.project.project_charge = ''
                this.project_start_date = ''
                this.addProjectDialog = false
            },
            coloseeditProjectDialog(){
                this.stageId = 1
                this.project.project_no = ''
                this.project.project_name = ''
                this.project.project_num = ''
                this.project.project_type = ''
                this.project.project_money = ''
                this.project.project_authorize = ''
                this.project.user_name = ''
                this.project.user_phone = ''
                this.project.project_note = ''
                this.project.project_charge = ''
                this.project_start_date = ''
                this.editProjectDialog = false
            },
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
            addProject(){
                this.getContractName().then(response=>{

                }).catch(error=>{})
                this.addProjectDialog = true
            },
            addProjectToApi(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'project/' + this.userId + '/',
                        headers:{
                            Authorization: "Bearer " +sessionStorage.getItem('token')
                        },
                        data:{
                            contractNo:this.project.contractNo,
                            projectName: this.project.project_name,
                            projectNum: this.project.project_num,
                            projectMoney: this.project.project_money,
                            projectAuthorize: this.project.project_authorize,
                            userName: this.project.user_name,
                            userPhone: this.project.user_phone,
                            projectNote: this.project.project_note,
                            projectCharge: this.project.project_charge,
                            projectStartDateTime: this.project_start_date,
                            projectType: this.project.project_type,
                            projectStageId: this.stageId,
                            projectProduce:this.project.project_produce
                        }
                    }).then(response =>{
                        this.projectNo = response.data
                        this.getContract().then(success=>{
                            this.getProjectsFromApi().then(success =>{}).catch(error =>{})
                        }).catch()

                        if(this.isPutToPlan){
                            this.putToPlan().then(success=>{}).catch(error=>{})
                        }
                        this.stageId = 1
                        this.project.project_no = ''
                        this.project.project_name = ''
                        this.project.project_num = ''
                        this.project.project_type = ''
                        this.project.project_money = ''
                        this.project.project_authorize = ''
                        this.project.user_name = ''
                        this.project.user_phone = ''
                        this.project.project_note = ''
                        this.project.project_charge = ''
                        this.stageId = 1

                        this.addProjectDialog = false,
                            this.snackbar = true,
                            this.snackbarColor = 'success',
                            this.snackbarText = '添加成功'
                    }).catch(error =>{
                        this.snackbar = false,
                            this.snackbarColor = 'error',
                            this.snackbarText = error.response.data.message
                    })
                })
            },
            getContract(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'contract/project/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        data:{
                            projectNo:this.projectNo,
                            contractNo:this.contractName,
                        }
                    }).then(success=>{
                        resolve(success.data)
                    })
                })
            },
            putToPlan(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'project/stage/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        data:{
                            projectStage:this.stageId,
                            projectNo:this.projectNo
                        }
                    }).then(success=>{
                        resolve(success.data)
                        this.isPutToPlan = false
                    })
                })
            },
            putStage(){
                this.isPutToPlan = true,
                    this.stageId = 2,
                    this.addProjectToApi().then(success =>{}).catch(error =>{})
            },
            //修改项目启动时间
            editProjectStartTime(){
                return new Promise((resolve,reject)=>{
                    axios({
                        method:'POST',
                        url:'updateProject/',
                        headers:{
                            Authorization: "Bearer " +sessionStorage.getItem('token')
                        },
                        data:{
                            projectNo:this.project.project_no,
                            projectName: this.project.project_name,
                            projectMoney: this.project.project_money,
                            projectAuthorize: this.project.project_authorize,
                            userName: this.project.user_name,
                            userPhone: this.project.user_phone,
                            projectNote: this.project.project_note,
                            projectCharge: this.project.project_charge,
                            projectStartDateTime: this.project_start_date,
                            projectType: this.project.project_type,
                            projectProduce:this.project.project_produce,
                            projectStageId: this.stageId
                        }
                    }).then(response =>{
                        this.getProjectsFromApi()
                            .then(success =>{
                                this.projects = success.data
                                this.totalProjects = success.total
                            }).catch(error =>{})
                        this.snackbar = true
                        this.snackbarColor = 'success'
                        this.snackbarText = '更改成功'
                    })
                });
            },
            chageStage(){
                this.isPutToPlan = true,
                    this.stageId = 2,
                    this.projectNo = this.project.project_no,
                    this.editProjectToApi().then(success =>{}).catch(error =>{})
            },
            editProjectToApi(){
                return new Promise((resolve,reject) =>{
                    if( this.project.project_name == "" || this.project.project_type == "" ||
                        //this.project.user_name == "" || this.project.user_phone == "" ||
                        this.project.project_note == ""|| this.project.project_charge == "" || this.project_start_date == ""){
                        this.snackbar = true
                        this.snackbarColor = 'error'
                        this.snackbarText = '有必填项为空，请重新检查'
                        return false
                    }
                    axios({
                        method:'POST',
                        url:'updateProject/',
                        headers:{
                            Authorization: "Bearer " +sessionStorage.getItem('token')
                        },
                        data:{
                            projectNo:this.project.project_no,
                            projectName: this.project.project_name,
                            projectMoney: this.project.project_money,
                            projectAuthorize: this.project.project_authorize,
                            userName: this.project.user_name,
                            userPhone: this.project.user_phone,
                            projectNote: this.project.project_note,
                            projectCharge: this.project.project_charge,
                            projectStartDateTime: this.project_start_date,
                            projectType: this.project.project_type,
                            projectProduce:this.project.project_produce,
                            projectStageId: this.stageId
                        }
                    }).then(response =>{
                        if(this.isPutToPlan){
                            this.putToPlan().then(success=>{}).catch(error=>{})
                        }
                        this.stageId = 1
                        this.project.project_no = ''
                        this.project.project_name = ''
                        this.project.project_num = ''
                        this.project.project_type = ''
                        this.project.project_money = ''
                        this.project.project_authorize = ''
                        this.project.user_name = ''
                        this.project.user_phone = ''
                        this.project.project_note = ''
                        this.project.project_charge = ''
                        this.editProjectDialog = false
                        this.getProjectsFromApi()
                            .then(success =>{
                                this.projects = success.data
                                this.totalProjects = success.total
                            }).catch(error =>{})
                        this.snackbar = true
                        this.snackbarColor = 'success'
                        this.snackbarText = '更改成功'
                    }).catch(error =>{
                        this.snackbar = false
                        this.snackbarColor = 'error'
                        this.snackbarText = error.response.data.message
                    })
                })
            },
            editProjectDialogData:function(item){
                this.project.project_no = item.projectNo
                this.project.project_name = item.projectName
                this.project.project_num = item.projectNum
                this.project.project_type = item.projectType
                this.project.project_money = item.contractMoney
                this.project.project_authorize = item.projectAuthorize
                this.project.user_name = item.projectUserName
                this.project.user_phone = item.projectUserPhone
                this.project.project_note = item.contractNote
                this.project.project_charge = item.contractBusiness
                this.project_start_date = item.projectStartTime
                this.project.project_produce = item.projectProduce
                this.editProjectDialog = true
            },
            deleteItem(item){
                if(!this.permissions.includes('all_permission')){
                    this.snackbarColor = 'error'
                    this.snackbarText = '无操作权限'
                    this.snackbar = true
                    return false
                }
                if(confirm("确认将编号为\""+item.projectNo+"\"的项目移至回收站?")){
                    axios({
                        url: 'project/recycle/',
                        method: 'POST',
                        headers: {
                            Authorization: 'Bearer ' +sessionStorage.getItem('token')
                        },
                        params:{
                            projectNo:item.projectNo,
                            stageId:2
                        }
                    }).then(response => {
                        this.snackbarText = '成功移至回收站'
                        this.snackbarColor = 'success'
                        this.snackbar = true
                        this.getProjectsFromApi()
                            .then(success =>{
                                this.projects = success.data
                                this.totalProjects = success.total
                            }).catch(error =>{
                        })
                    })
                }
            },
            showprojectsetup(){
                this.$router.push({name:'showprojectsetup'});
            },
            getContractName(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'contract/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(success=>{
                        resolve(success.data)
                        this.contractNames = success.data
                    }).catch(error =>{
                        reject(error.response.data)
                    })
                })
            },
            chooseContract() {
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'GET',
                        url: 'contract/info/',
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        params: {
                            contractNo: this.contractName,
                        }
                    }).then(response => {
                        resolve(response)
                        this.project.contractNo = response.data.contractNo
                        this.project.project_name = response.data.contractName
                        this.project.project_money = response.data.contractMoney
                        this.project.project_authorize = response.data.contractAuthorize
                        this.project.project_type = response.data.projectType
                        this.project.user_name = response.data.contractUserName
                        this.project.user_phone = response.data.contractUserPhone
                        this.project.project_note = response.data.contractNote
                        this.project.project_charge = response.data.contractBusiness
                    }).catch(error => {
                        reject(error.response)
                    })
                })

            },
            getChargeFromApi() {
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'GET',
                        url: 'user/',
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(response => {
                        resolve(response.data)
                    }).catch(error => {
                        reject(error.response.data)
                    })
                })
            }
        },
        mounted(){
            this.pagination.descending = true
            this.pagination.sortBy = 'id'
            this.pagination.rowsPerPage = 25
            this.getProjectsFromApi()
                .then(success =>{
                    this.projects = success.data
                    this.totalProjects = success.total
                }).catch(error =>{
            })
            this.getTypeFromApi()
                .then(response =>{
                    this.types = response
                    this.chooseTypes = response
                }).catch(error =>{
            })
            this.getChargeFromApi().then(response=>{
                this.projectCharges = response
                this.project.project_produce = this.projectCharges[0].userName
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

    table.v-table tbody td{
        height: 32px;
    }
</style>

