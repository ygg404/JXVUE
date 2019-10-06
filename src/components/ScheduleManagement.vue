<template>
    <v-container fluid>
        <v-dialog max-width="500px" v-model="editStageDialog" persistent>
            <v-card>
                <v-card-title><span class="title">修改项目阶段</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="project.projectName" label="项目名称:" :rules="noteRules" prepend-icon="calendar_today" disabled></v-text-field>
                                <v-text-field v-model="project.projectType" label="项目类型:" :rules="noteRules" prepend-icon="book" disabled></v-text-field>
                                <v-text-field v-model="project.projectNo" label="项目编码:" :rules="noteRules" prepend-icon="settings_ethernet" disabled></v-text-field>
                                <v-text-field v-model="project.projectStartDateTime.substring(0,10)" label="项目启动时间:" :rules="noteRules" prepend-icon="settings_ethernet" disabled></v-text-field>
                                <v-select v-model="project.projectStage" label="项目阶段:" :rules="noteRules" :items="stages" item-text="name" item-value="name" prepend-icon="book"></v-select>
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
        <v-dialog max-width="500px" v-model="addTimeDialog" persistent>
            <v-card>
                <v-card-title><span class="title">查看进度详情</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex md12>
                                <v-text-field label="实际总天数:" v-model="projectActuallyFinishNum" prepend-icon="alarm" @change="chooseTime()"></v-text-field>
                                <v-text-field label="项目要求总天数:" v-model="ProjectTotalDays" prepend-icon="alarm" disabled></v-text-field>
                                <v-text-field label="超时总天数:" v-model="TotalTimeout" prepend-icon="alarm" disabled></v-text-field>
                                <v-text-field label="质检超时天数:" v-model="QualityTimeoutDays" prepend-icon="alarm" disabled></v-text-field>
                                <v-text-field label="作业超时天数:" v-model="WorkTimeoutDays" prepend-icon="alarm" disabled></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="colseAddTimeDialog">返回</v-btn>
                    <v-btn color="info" @click="addTimeApi">添加</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog max-width="500px" v-model="changeTimeDialog" persistent>
            <v-card>
                <v-card-title><span class="title">修改结算时间</span> </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-menu v-model="addDateMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model="scheduleDetail.cDateTimeYM" label="结算时间:" prepend-icon="event" readonly  v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="scheduleDetail.cDateTimeYM" type="month" locale="zh-cn" @input="addDateMenu = false"></v-date-picker>
                        </v-menu>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="colseChangeTimeDialog">返回</v-btn>
                    <v-btn color="info" @click="changeTimeApi">修改</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog max-width="500px" v-model="addScheduleDialog" persistent>
            <!-- <v-card>
                <v-card-title><span class="title">查看</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex md12>
                                <v-text-field label="当前进度:" v-model="projectRate" prepend-icon="alarm" disabled></v-text-field>
                                <v-textarea prepend-icon="book" v-model="projectNote" label="进度内容" disabled></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="colseAddScheduleDialog">返回</v-btn>
                </v-card-actions>
            </v-card> -->
            <v-card>
                <v-card-title><span class="title">项目进度</span>
                </v-card-title>
                 <v-card-text>
                        <v-data-table :headers="shceduleHeader" hide-actions :items="schedule">
                            <template slot="items" slot-scope="props">
                                <!--<td>{{props.item.id}}</td>-->
                                <td>{{props.item.scheduleCreateTime}}</td>
                                <td>{{props.item.projectRate}}</td>
                                <td>{{props.item.projectNote}}</td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                     <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="colseAddScheduleDialog">返回</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card>
            <v-card-title class="headline">项目状态</v-card-title>
            <v-card-title>
                <v-layout row wrap style="display: flex;flex-wrap: wrap">
                    <el-date-picker v-model="chooseDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="dateType">
                    </el-date-picker>
                    <!-- <v-flex xs2><v-select v-model="chooseUser" v-if="showChoose" :items="users" item-text="userName" item-value="userName" placeholder="选择负责人" class="chooseT" @change="chooseUserProject"></v-select></v-flex> -->
                    <v-flex xs2><v-select v-model="chooseType" clearable :items="chooseTypes" item-text="name" item-value="name" placeholder="类型选择" class="chooseT"></v-select></v-flex>
                    <v-flex xs2><v-text-field v-model="search" append-icon="search" placeholder="关键词搜索" label="search" single-line hide-details></v-text-field></v-flex>
                </v-layout>
            </v-card-title>
            <v-data-table :headers="headers" :items="projects" :loading="loading" :total-items="totalProjects"
                          :pagination.sync="pagination" class="elevation-1" must-sort>
                <template slot="items" slot-scope="props">
                    <td>{{props.item.contractNo}}</td>
                    <el-tooltip  :content="props.item.projectName" placement="top">
                            <td class="project_name_row">
                                {{props.item.projectName}}</td>
                    </el-tooltip>
                    <td>{{props.item.projectCharge}}</td>
                    <td>{{props.item.projectStage}}</td>
                    <td>{{props.item.projectBegunDate}}</td>
                    <td class="progress_row"> <v-progress-linear v-model="props.item.projectRate" height="20"><strong style="color: white">{{ Math.ceil(props.item.projectRate) }}%</strong>
                    </v-progress-linear></td>
                    <td style="max-width: 70px;">{{props.item.projectWorkDate}}</td>
                    <td>{{props.item.wOutTime}}</td>
                    <td>{{props.item.qOutTime}}</td>
                    <td>{{props.item.cDateTimeYM}}</td>

                    <!-- <v-btn color="blue darken-1" flat @click="showTimeApm(props.item)" title="查看" class="controllEdit">
                        <v-icon small>search</v-icon>查看
                    </v-btn> -->

                    <v-icon color="blue darken-1" style="margin-top: 10px;" @click="getScheuleByNoApi(props.item)" title="查看进度">alarm</v-icon>
                    <v-icon color="blue darken-1" style="margin-top: 10px;" @click="setScheuleTimeByNoApi(props.item)" title="结算月份修改">edit</v-icon>
                    <v-icon color="blue darken-1" style="margin-top: 10px;" @click="editProjectDialogData(props.item)"  title="修改阶段">event</v-icon>
                    <v-icon color="blue darken-1"  @click="print(props.item)" title="打印" >print</v-icon>
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
        data: () => ({
            items: [],
            time: '',
            daytime: '',
            projectNo: '',
            projectActuallyFinishNum: '',  //实际总天数
            ProjectTotalDays: '', //项目要求总天数
            TotalTimeout: '',        //超时总天数
            QualityTimeoutDays: '',  //质检超时天数
            WorkTimeoutDays: '',     //作业超时天数
            projectRate: '',
            projectNote: '',
            addTimeDialog: false,
            addScheduleDialog: false,
            changeTimeDialog:false,
            users: [],
            types: [],
            chooseTypes: [],
            schedule:[],
            chooseType: '',
            chooseUser: '',
            projects: [],
            userAccount: '',
            showChoose: false,
            permissions: JSON.parse(localStorage.getItem('permissions')),
            loading: false,
            totalProjects: 0,
            startDate: '',
            chooseDate: false,
            endDate: '',
            search: '',
            p_stage: 1,
            clearable: false,
            stageId: '',
            pagination: {},
            snackbar:false,
            snackbarColor:'',
            snackbarText:'',
            snackbarTimeout:2000,
            headers: [
                {text: '合同编号', value: 'contractNo'},
                {text: '项目名称', value: 'projectName', sortable: false},
                {text: '项目负责人', value: 'projectCharge',sortable: false},
                {text: '项目阶段', value: 'projectStage',sortable: false},
                {text: '启动时间', value: 'projectBegunDate',sortable: false},
                {text: '当前进度', value: 'project_rate'},
                {text: '要求工期', value: 'projectStartTime',sortable: false},
                {text: '作业超时', value: 'projectStartTime',sortable: false},
                {text: '质检超时', value: 'projectStartTime',sortable: false},
                {text: '结算时间', value: 'qFinishDateTime',sortable: false},
                {text: '操作',sortable: false}
            ],
            shceduleHeader:[
                // {text:'编号',value:'id',sortable:false},
                {text:'日期',value:'projectCreateTime',sortable:false},
                {text:'当前进度',value:'projectRate',sortable:false},
                {text:'进度内容',value:'projectNote',sortable:false},
        ],
            addDateMenu: false,
            //进度详情
            stages:[],
            scheduleDetail:[],
            editStageDialog:false,
            //项目详情
            project:{
                projectNo:'',
                projectName:'',
                projectType:'',
                projectStage:'',
                projectStageId:'',
                projectStartDateTime: new Date().toISOString().substr(0, 10)
            },
        }),
        methods: {
            chooseTime() {
                this.ProjectTotalDays = this.items.projectWorkDate + this.items.projectQualityDate
                this.TotalTimeout = this.projectActuallyFinishNum - this.ProjectTotalDays
                if (this.items.qFDateTime != null && this.items.wFDateTime != null) {
                    this.QualityTimeoutDays = this.DateDiff(this.items.wFDateTime, this.items.qFDateTime) - this.items.backNum - this.items.projectQualityDate
                }
                this.WorkTimeoutDays = this.TotalTimeout - this.QualityTimeoutDays
                if(this.QualityTimeoutDays <=  0){
                    this.QualityTimeoutDays = 0
                }
                if(this.WorkTimeoutDays <=  0){
                    this.WorkTimeoutDays = 0
                }
            },
            addTimeApi() {
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'POST',
                        url: 'actuallyFinishNum/',
                        data: {
                            projectNo: this.projectNo,
                            projectActuallyFinishNum: this.projectActuallyFinishNum
                        },
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response => {
                        this.ProjectTotalDays = ''
                        this.TotalTimeout = ''
                        this.QualityTimeoutDays = ''
                        this.WorkTimeoutDays = ''
                         this.getProjectsFromApi().then(success => {
                        }).catch(error => {
                        })
                        this.addTimeDialog = false
                        this.snackbar = true
                        this.snackbarColor = 'success'
                        this.snackbarText = '添加成功'
                    }).catch(error => {
                        this.snackbar = false
                        this.snackbarColor = 'error'
                        this.snackbarText = '添加失败'
                    })
                })
            },
            showTimeApm(item) {
                this.projectNo = item.projectNo
                this.projectActuallyFinishNum = item.projectActuallyFinishNum
                this.ProjectTotalDays = item.projectWorkDate + item.projectQualityDate
                this.TotalTimeout = this.projectActuallyFinishNum - this.ProjectTotalDays
                if (item.qFDateTime != null && item.wFDateTime != null) {
                    this.QualityTimeoutDays = this.DateDiff(item.wFDateTime, item.qFDateTime) - item.backNum - item.projectQualityDate
                }
                this.WorkTimeoutDays = this.TotalTimeout - this.QualityTimeoutDays
                if(this.QualityTimeoutDays <=  0){
                    this.QualityTimeoutDays = 0
                }
                if(this.WorkTimeoutDays <=  0){
                    this.WorkTimeoutDays = 0
                }
                this.items = item
                this.addTimeDialog = true
            },
            showSchedule(item) {
                this.projectRate = item.projectRate + '%'
                this.projectNote = item.projectNote
                this.addScheduleDialog = true
            },
            colseAddTimeDialog() {
                this.projectActuallyFinishNum = ''
                this.ProjectTotalDays = ''
                this.TotalTimeout = ''
                this.QualityTimeoutDays = ''
                this.WorkTimeoutDays = ''
                this.addTimeDialog = false
            },
            colseAddScheduleDialog() {
                this.projectRate = ''
                this.projectNote = ''
                this.addScheduleDialog = false
            },
            editProjectDialogData:function(item){
                if(!this.permissions.includes('all_permission') || this.permissions.includes('edit_stage')){
                    this.snackbarColor = 'error'
                    this.snackbarText = '无操作权限'
                    this.snackbar = true
                    return false
                }else{
                    return new Promise((resolve, reject) => {
                        axios({
                            methods: 'GET',
                            url: 'project/setup/',
                            headers: {
                                Authorization: 'Bearer ' + sessionStorage.getItem("token")
                            },
                            params: {
                                projectNo : item.projectNo
                            }
                        }).then(response => {
                            this.editStageDialog = true;
                            this.project = response.data;
                            resolve(response.data);
                        }).catch(error => {
                            reject(error.response)
                        })
                    })
                    // this.project.projectNo = item.projectNo
                    // this.project.projectName = item.projectName
                    // this.project.projectType = item.projectType
                    // this.project.projectStageId = item.projectStageId
                    // this.project.projectStartDate = item.projectStartTime
                    // this.project.projectStages = item.projectStage

                }
            },
            // getUserFromApi() {
            //     return new Promise((resolve, reject) => {
            //         axios({
            //             methods: 'GET',
            //             url: 'user/charge/',
            //             headers: {
            //                 Authorization: 'Bearer ' + sessionStorage.getItem("token")
            //             }
            //         }).then(response => {
            //             resolve(response.data)
            //             this.users = response.data
            //             this.chooseUser = this.users[0].userName
            //             this.users.forEach(e => {
            //                 if (e.userName == this.chooseUser) {
            //                     // this.userAccount = e.userAccount
            //                 }
            //             })
            //             this.getProjectsFromApi().then(success => {
            //             }).catch(error => {
            //             })
            //         }).catch(error => {
            //             reject(error.response)
            //         })
            //     })
            // },
            getProjectsFromApi() {
                if (this.chooseDate == null || this.chooseDate.length == 0) {
                    this.startDate = ''
                    this.endDate = ''
                } else if (this.chooseDate.length > 0) {
                    this.startDate = this.chooseDate[0]
                    this.endDate = this.chooseDate[1]
                }
                return new Promise((resolve, reject) => {
                    this.loading = true
                    const {sortBy, descending, page, rowsPerPage} = this.pagination
                    axios({
                        methods: 'GET',
                        url: 'project/schedule/',
                        params: {
                            page: this.pagination.page,
                            rowsPerPage: this.pagination.rowsPerPage,
                            sortBy: this.pagination.sortBy,
                            descending: this.pagination.descending,
                            search: this.search,
                            startDate: this.startDate,
                            endDate: this.endDate,
                            userAccount: this.userAccount
                        },
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response => {
                        console.log(response.data.data)
                        this.loading = false
                        response.data.data.forEach((item) => {
                            item.time = ''
                            item.time = item.projectWorkDate + item.projectQualityDate
                            item.time = moment(item.projectStartDate).add(item.time, 'days').format('YYYY-MM-DD') //项目截止时间
                            let myDate = new Date();
                            myDate = moment(myDate).format('YYYY-MM-DD')//获取当前时间
                            item.time = this.DateDiff(myDate, item.time);
                            item.projectBegunDate = moment(new Date(item.projectBegunDate)).format('YYYY-MM-DD')
                            item.cDateTimeYM = item.cDateTime==null?'':moment(new Date(item.cDateTime)).format('YYYY-MM')
                            item.qFinishDateTime = item.qFinishDateTime==null?'':moment(new Date(item.qFinishDateTime)).format('YYYY-MM-DD')
                        });
                        this.projects = response.data.data;
                        this.totalProjects = response.data.total;

                        console.log(this.projects)
                        this.projectActuallyFinishNum = response.data.data.projectActuallyFinishNum
                    }).catch(error => {
                    })
                })
            },
            DateDiff(sDate1, sDate2) {    //sDate1和sDate2是2002-12-18格式
                var aDate, oDate1, oDate2, iDays;
                aDate = sDate1.split("-");
                oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);    //转换为12-18-2002格式
                aDate = sDate2.split("-");
                oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
                iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) ;   //把相差的毫秒数转换为天数
                return iDays
            },
            getTypeFromApi() {
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'GET',
                        url: 'projectTypes/',
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(response => {
                        resolve(response.data)
                    }).catch(error => {
                        reject(error.response.data)
                    })
                })
            },
            getScheuleByNoApi(item){
                return new Promise((resolve, reject) => {
                    axios({
                        methods: 'GET',
                        url: '/project/schedule/'+item.projectNo+'/',
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response => {
                        resolve(response.data)
                        this.schedule = response.data
                        this.addScheduleDialog = true
                    }).catch(error => {
                        reject(error.response.data)
                    })
                })
            },
            setScheuleTimeByNoApi(item){
                this.changeTimeDialog = true;
                this.scheduleDetail = item;
            },
            colseChangeTimeDialog(){
                this.changeTimeDialog = false;
            },
            changeTimeApi(){
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'POST',
                        url: '/projectQuality/editcutofftime/',
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        },
                        data: {
                            projectNo: this.scheduleDetail.projectNo,
                            cutOffTime:this.scheduleDetail.cDateTimeYM + '-01'
                        },
                    }).then(response => {
                        resolve(response.data)
                        //this.schedule = response.data
                        this.changeTimeDialog = false;
                        this.getProjectsFromApi();
                    }).catch(error => {
                        reject(error.response.data)
                    })
                })
            },
            //获取项目所有阶段
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
            editProjectToApi(){
                return new Promise((resolve,reject) =>{
                    if(this.project.projectStages == ""){
                        this.snackbar = true
                        this.snackbarColor = 'error'
                        this.snackbarText = '有必填项为空，请重新检查'
                        return false
                    }
                    this.stages.forEach(e=>{
                        if(e.name == this.project.projectStage){
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

                        this.editStageDialog = false
                        this.getProjectsFromApi()
                            .then(success => {
                                this.projects = success.data
                                this.total = success.data
                            }).catch(error => {
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
            addSchedule(item) {
                this.$router.push({name: 'editschedule', query: {'p_no': item.projectNo}});
            },
            print:function(item){
                this.$router.push({name:'printproject',query:{'p_no':item.projectNo,'type_id':4}});
            }
        },
        mounted() {
            this.startDate =  moment(new Date(new Date().getFullYear(), new Date().getMonth() -1 , 1)).format('YYYY-MM-DD');
            this.endDate =  moment(new Date()).format('YYYY-MM-DD');
            this.chooseDate = [this.startDate ,this.endDate ];

            this.pagination.descending = true
            this.pagination.sortBy = 'contractNo'
            this.pagination.rowsPerPage = 25
            if (this.permissions.includes('all_permission')) {
                this.showChoose = true
                // this.getUserFromApi().then(success => {
                // }).catch(error => {
                // })

            } else {
                this.showChoose = false
                this.userAccount = localStorage.getItem('userAccount')
            }
            this.getTypeFromApi()
                .then(response => {
                    this.types = response
                    this.chooseTypes = response
                }).catch(error => {

            });
            this.getprojectStage();
        },
        watch: {
            pagination: {
                handler() {
                    this.getProjectsFromApi()
                        .then(success => {
                            this.projects = success.data
                            this.total = success.data
                        }).catch(error => {
                    })
                }
            },
            search: {
                handler() {
                    this.getProjectsFromApi().then(data => {
                    }).catch(error => {
                    })
                }
            },
            chooseDate: {
                handler() {
                    this.getProjectsFromApi().then(data => {
                    }).catch(error => {
                    })
                }
            },
            chooseType: {
                handler() {
                    if (this.chooseType != null) {
                        this.search = this.chooseType
                    } else {
                        this.search = ''
                    }
                    this.getProjectsFromApi().then(data => {
                    }).catch(error => {
                    })
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

    .project_name_row{
        max-width:200px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }

    .progress_row{
        max-width: 100px;
        text-align:center;
    }

    td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)),
    table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)),
    table.v-table thead td:first-child, table.v-table tbody td:first-child,
    table.v-table thead th:first-child, table.v-table tbody th:first-child {
        padding: 0 10px;
    }
</style>
