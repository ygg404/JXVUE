<template>
    <v-container fluid>
        <v-dialog max-width="900px" v-model="ScheduleDialog" persistent>
            <v-card>
                <v-card-title><span class="title">项目返修内容</span></v-card-title>
                <v-card-text>
                    <v-data-table :headers="headers2" :items="items" :loading="loading" hide-actions>
                        <template slot="items" slot-scope="props">
                            <td>{{props.item.backcreatedtime}}</td>
                            <td>{{props.item.backNote}}</td>
                            <td>{{props.item.note}}</td>
                            <div v-if="props.item.note == null">
                                <v-btn color="blue darken-1" flat @click="addNote(props.item)" title="提交内容" class="controllAdd"><v-icon small>edit</v-icon></v-btn>
                            </div>
                        </template>
                    </v-data-table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="colseScheduleDialog">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog max-width="500px" v-model="NoteDialog" persistent>
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex class="topInfo">
                                <v-select label="回复内容" :items="executes" item-text="shortNote" item-value="shortNote" @change="chooseExecute" v-model="chooseExecuteData"></v-select>
                            </v-flex>
                            <v-flex md12>
                                <v-text-field v-model="note" label="内容:" :rules="noteRules" prepend-icon="calendar_today"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="colseNoteDialog">取消</v-btn>
                    <v-btn color="info" @click="addNoteApi">提交</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card>
            <v-card-title class="headline">项目作业</v-card-title>
            <v-card-title>
                <v-layout row wrap style="display: flex;flex-wrap: wrap">
                    <el-date-picker v-model="chooseDate" type ="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="dateType"></el-date-picker>
                    <v-flex xs2><v-select v-model="chooseType" clearable :items="chooseTypes" item-text="name" item-value="name" placeholder="类型选择" class="chooseT"></v-select></v-flex>
                    <v-flex xs2><v-text-field v-model="search" append-icon="search" placeholder="关键词搜索" label="search" single-line hide-details></v-text-field></v-flex>
                    <!--<v-flex xs2><v-btn slot="activator" color="primary" dark class="mb-2" @click="tobackwork">查看返修</v-btn></v-flex>-->
                </v-layout>
            </v-card-title>
            <v-data-table :headers="headers" :items="projects" :loading="loading" :total-items="totalProjects" :pagination.sync="pagination" class="elevation-1" must-sort>
                <template slot="items" slot-scope="props">
                    <td>{{props.item.contractNo}}</td>
                    <td style="max-width: 200px;">{{props.item.projectName}}</td>
                    <td>{{props.item.projectCharge}}</td>
                    <td>{{props.item.workStage == 0 ? '开始' : '暂停'}}</td>
                    <td>{{props.item.projectAuthorize}}</td>
                    <td style="min-width: 120px;">{{props.item.projectStartTime}}</td>
                    <td style="min-width: 100px;">{{props.item.projectStage}}</td>
                    <td v-if="props.item.workStage == 0" style="min-width:140px;">
                        <v-icon  v-if="props.item.charge" color="blue darken-1" flat @click="editPlan(props.item)" title="修改"> edit</v-icon>
                        <v-icon  v-if="props.item.charge" color="blue darken-1" flat @click="print(props.item)" title="打印">print</v-icon>
                        <v-icon  v-if="props.item.charge" color="blue darken-1" flat @click="updateStage(props.item,1)" title="改状态">replay</v-icon>
                        <v-icon  v-if="props.item.backWorkList && props.item.charge" color="blue darken-1" flat @click="seleBack(props.item)" title="查看返修">poll</v-icon>
                    </td>
                    <td v-else>
                        <v-icon   v-if="props.item.charge" color="blue darken-1" flat @click="editPlan(props.item)" title="修改"> edit</v-icon>
                        <v-icon  v-if="props.item.charge" color="blue darken-1" flat @click="print(props.item)" title="打印">print</v-icon>
                        <v-icon  v-if="props.item.charge" color="blue darken-1" flat @click="updateStage(props.item,0)" title="改状态">replay</v-icon>
                        <v-icon  v-if="props.item.backWorkList && props.item.charge" color="blue darken-1" flat @click="seleBack(props.item)" title="查看返修">poll</v-icon>
                    </td>
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
    import moment from 'moment'

    export default {
        data: ()=>({
            NoteDialog:false,
            note:'',
            backId:'',
            items:[],
            projectRate:0,
            projectNo:'',
            projectName:'',
            projectNote:'',
            ScheduleDialog:false,
            chooseExecuteData:'',
            projects:[],
            types:[],
            chooseTypes:[],
            executes:[],
            chooseType:'',
            loading: false,
            totalProjects : 0,
            workStage:0,
            startDate:'',
            chooseDate:false,
            endDate:'',
            search:'',
            p_stage:1,
            clearable:false,
            stageId:3,
            pagination: {},
            snackbar:false,
            snackbarColor:'',
            snackbarText:'',
            snackbarTimeout:2000,
            useraccount:'',
            headers:[
                {text:'合同编号',value:'contractNo'},
                {text:'项目名称',value:'projectName',sortable:false},
                {text:'项目负责人',value:'projectCharge'},
                {text:'项目状态',value:'workStage'},
                {text:'委托单位',value:'projectAuthorize',sortable:false},
                {text:'启动时间',value:'projectStartTime'},
                {text:'项目阶段',value:'projectStage'}
            ],
            headers2:[
                {text:'返修时间',value:'projectNum',sortable:false},
                {text:'返修内容',value:'projectName',sortable:false},
                {text:'提交内容',value:'projectType',sortable:false}
            ],
            noteRules:[
                v => !!v || "内容不能为空"
            ],
            permissions:JSON.parse(localStorage.getItem('permissions'))
        }),
        methods:{
            seleBack(item){
                this.items = item.backWorkList
                this.ScheduleDialog = true
            },
            addNote(item){
                this.projectNo = item.projectNo
                this.backId = item.id
                this.NoteDialog = true
            },
            addNoteApi(){
                return new Promise((resolve,reject) =>{
                    if(this.note == ""){
                        this.snackbar = true
                        this.snackbarColor = 'error'
                        this.snackbarText = '有必填项为空，请重新检查'
                        return false
                    }
                    axios({
                        method:'POST',
                        url:'addNote/',
                        data:{
                            back_id: this.backId,
                            note: this.note,
                        },
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        this.note =  ''
                        this.ScheduleDialog = false
                        this.NoteDialog = false
                        this.snackbar = true
                        this.snackbarColor = 'success'
                        this.snackbarText = '添加成功'
                        this.putToQuality().then(response =>{
                            this.getProjectsFromApi().then(response =>{}).catch(error =>{})
                        }).catch(error =>{})

                    }).catch(error=>{
                        this.snackbar = false
                        this.snackbarColor = 'error'
                        this.snackbarText = error.response.data.message
                    })
                })

            },
            getExecuteStandard(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'shortcut/13/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                    }).then(success =>{
                        resolve(success.data)
                        this.executes = success.data
                    }).catch(error =>{
                        reject(error.response)
                    })
                })
            },
            chooseExecute(){
                if(this.note == null){
                    this.note = ''
                }
                this.note += this.chooseExecuteData + ';'
            },
            /*addTimeApi() {
                return new Promise((resolve, reject) => {
                    if(this.projectNote == "" ){
                        this.snackbar = true
                        this.snackbarColor = 'error'
                        this.snackbarText = '有必填项为空，请重新检查'
                        return false
                    }
                    axios({
                        method: 'POST',
                        url: 'schedule/',
                        data: {
                            projectNo: this.projectNo,
                            projectName: this.projectName,
                            projectRate: this.projectRate,
                            projectNote: this.projectNote
                        },
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response => {
                        this.projectNote = ""
                        this.addScheduleDialog = false
                        this.snackbar = true
                        this.snackbarColor = 'success'
                        this.snackbarText = '添加成功'
                        this.getProjectsFromApi().then(response =>{}).catch(error =>{})
                    }).catch(error => {
                        this.snackbar = false
                        this.snackbarColor = 'error'
                        this.snackbarText = '添加失败'
                    })
                })
            },*/
            putToQuality(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'project/stage/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        data:{
                            projectStage:4,
                            projectNo:this.projectNo,
                        }
                    }).then(success=>{
                        resolve(success.data)
                    })
                })
            },
            updateStage(item,workstageid){
                return new Promise((resolve,reject)=>{
                    axios({
                        method:'POST',
                        url:'projectWork/update/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        data:{
                            projectNo:item.projectNo,
                            projectStage:workstageid
                        }
                    }).then(success=>{
                        if(this.putWork){
                            this.snackbarColor = 'success'
                            this.snackbarText = '提交成功'
                            this.snackbar = true
                            this.getProjectsFromApi().then(response =>{}).catch(error =>{})


                        }else{
                            this.snackbarColor = 'success'
                            this.snackbarText = '保存成功'
                            this.snackbar = true
                            this.getProjectsFromApi().then(response =>{}).catch(error =>{})
                        }
                    }).catch(error=>{
                        this.snackbarColor = 'error'
                        this.snackbarText = error.response.data
                        this.snackbar = true
                    })
                })
            },
            colseNoteDialog(){
                this.note = ''
                this.NoteDialog = false
            },
            colseScheduleDialog(){
                this.ScheduleDialog = false
            },
            tobackwork(){
                this.$router.push({name:'tobackwork'});
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
                    if(!this.permissions.includes('all_permission')){
                        this.useraccount = localStorage.getItem('userAccount')
                    }
                    this.loading = true
                    const{ sortBy,descending,page,rowsPerPage} = this.pagination
                    axios({
                        methods:'GET',
                        url:'projectByWork/',
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
                            account: this.useraccount
                        },
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        this.projects = response.data.data
                        console.log(this.projects);
                        this.loading = false
                        resoleve(response.data)
                    }).catch(error=>{
                        this.loading = false
                        reject(error.response)
                    })
                })
            },
            editPlan:function(item){
                this.$router.push({name:'editwork',query:{'p_no':item.projectNo,'p_group':item.groupId,'p_name':item.projectName}});
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
            print:function(item){
                this.$router.push({name:'printwork',query:{'p_no':item.projectNo,'type_id':1}});
            },
            getProjectNoApi(){
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
            limitRate() {
                if (this.projectRate > 90) {
                    this.snackbarColor = 'error'
                    this.snackbarText = '项目未完结，最高进度只可达90%，请提交质检'
                    this.snackbar = true
                    this.projectRate = 90
                }
            }
        },
        mounted(){
            this.startDate =  moment(new Date(new Date().getFullYear(), new Date().getMonth() -1 , 1)).format('YYYY-MM-DD');
            this.endDate =  moment(new Date()).format('YYYY-MM-DD');
            this.chooseDate = [this.startDate ,this.endDate ];
            this.pagination.descending = true
            this.pagination.sortBy = 'id'
            this.pagination.rowsPerPage = 25
            this.getProjectsFromApi()
                .then(success =>{
                    this.projects = success.data
                    this.totalProjects = success.total
                }).catch(error=>{}),
                this.getTypeFromApi()
                    .then(response =>{
                        this.types = response
                        this.chooseTypes = response
                    }).catch(error =>{

                })
            this.getExecuteStandard().then(success=>{}).catch(error=>{})
        },
        watch:{
            pagination:{
                handler(){
                    this.getProjectsFromApi()
                        .then(success =>{
                            this.projects = success.data
                            this.total = success.data
                        }).catch(error=>{})
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
    .flex.md12{
        margin-top: -10px;
    }
    .icobtn{
        margin: 10px;
    }
</style>

