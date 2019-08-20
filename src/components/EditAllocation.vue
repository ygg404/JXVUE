<template>
    <v-container fluid>
        <v-layout row justify-space-around>
            <v-flex xs6>
                <v-card>
                    <v-card-title class="headline cardInfo" >项目安排信息
                        <v-layout justify-end>
                            <v-flex xs4>
                                <v-menu v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="projects.project_begun_date" label="项目开工时间:" :rules="noteRules" prepend-icon="event" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="projects.project_begun_date" @input="dateMenu = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-flex class="topInfo">
                            <v-select label="执行标准快捷输入" :items="executes" item-text="shortNote" item-value="shortNote" @change="chooseExecute" v-model="chooseExecuteData"></v-select>
                        </v-flex>
                        <v-textarea outline name="input-7-4" label="执行标准" v-model="projects.project_execute_standard" :rules="noteRules"></v-textarea>
                        <v-flex class="centerInfo">
                            <v-select  label="作业内容快捷输入" :items="worknotes" item-text="shortNote" item-value="shortNote" @change="chooseNote" v-model="chooseNoteData"></v-select>
                        </v-flex>
                        <v-textarea outline name="input-7-4" label="作业内容" v-model="projects.project_work_note" :rules="noteRules"></v-textarea>
                        <v-flex class="bottomInfo">
                            <v-select  label="技术要求快捷输入" :items="requires" item-text="shortNote" item-value="shortNote" @change="chooseRequire" v-model="chooseRequiresData"></v-select>
                        </v-flex>
                        <v-textarea outline name="input-7-4" label="技术要求" v-model="projects.project_work_require" :rules="noteRules"></v-textarea>
                        <v-flex>
                            <v-text-field v-model="project_workLoad" label="预计工作量:" :rules="noteRules" prepend-icon="assignment" ></v-text-field>
                        </v-flex>
                        <v-layout>
                            <v-flex xs5>
                                <v-text-field v-model="project_outputNote" label="产值预算明细:" :rules="noteRules" prepend-icon="assignment" ></v-text-field>
                            </v-flex>
                            <v-flex xs5 class="oInfo">
                                <v-text-field v-model="project_output" label="预计产值:" :rules="noteRules" prepend-icon="card_travel" type="number" @change="countWorkDate"></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex xs5>
                                <v-text-field v-model="project_workDate" label="作业工期:" :rules="noteRules" prepend-icon="alarm"  type="number"></v-text-field>
                            </v-flex>
                            <v-flex xs5 class="qInfo">
                                <v-text-field v-model="project_qualityDate" label="质检工期:" :rules="noteRules" prepend-icon="alarm"  type="number"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card color="blue-grey" >
                    <v-card-title class="white--text headline">项目基本信息</v-card-title>
                    <v-layout column reverse fill-height>
                        <v-card-text class="white--text subheading">
                            <blockquote>
                                项目名称: {{projects.project_name}}
                            </blockquote>
                            <blockquote>
                                委托单位: {{projects.project_authorize}}
                            </blockquote>
                            业务负责人: {{projects.project_business}}<br/>
                            项目立项人: {{projects.project_setup}}<br/>
                            联系电话: {{projects.project_phone}}<br/>
                            联系人: {{projects.project_user}}<br/>
                            项目类型: {{projects.project_type}}<br/>
                            <blockquote>
                                委托要求: {{projects.project_note}}
                            </blockquote>
                        </v-card-text>
                    </v-layout>
                </v-card>

                <v-btn color="info" class="chooseGroup" @click="chooseDialog">选择作业组</v-btn>

                <v-card color="success" v-if="showWrokGroup">
                    <v-card-title class="white--text headline">作业组数据
                         <v-layout justify-end>
                             <h6>项目负责人：{{projects.project_charge}}</h6>
                         </v-layout>
                    </v-card-title>
                    <v-flex v-for="group in projects.chooseGroups" :key="group.group_id">
                        <v-card-text class="white--text subheading">{{group.groupName}} : 占比 {{group.output_rate}}%,  &nbsp; 产值 {{group.project_output}},  &nbsp; 最短工期:{{group.shortDate}}天， 最迟工期:{{group.lastDate}}天。</v-card-text>
                    </v-flex>
                </v-card>

            </v-flex>
            
        </v-layout>

              <v-card class="rateInfo">
                <v-data-table :headers="rateHeaders" hide-actions :items="groupRates">
                    <template slot="items" slot-scope="props">
                        <td>{{props.item.gName}}</td>
                        <td>{{props.item.groupOutput}}</td>
                        <td>{{props.item.groupNotSuccessOutPut}}</td>
                        <td>{{props.item.projectCount}}</td>
                        <td>{{props.item.groupRate}}</td>
                    </template>
                </v-data-table>
            </v-card>

        <v-layout align-center justify-center fill-height class="bottomBtn">
            <v-btn color="orange" class="white--text" @click="$router.go(-1)">返回</v-btn>
            <v-btn color="info" @click="savePlanData">保存</v-btn>
            <v-btn color="success" @click="clickPutToWork">提交到作业</v-btn>
        </v-layout>

        <v-dialog max-width="800px" v-model="chooseGroupDialog" persistent>
            <v-card>
                <v-card-title><span class="title">选择作业组</span></v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex v-for="group in groups" :key="group.id" >
                                <v-form align-center>
                                    <v-layout>
                                        <v-flex xs3>
                                            <v-checkbox :label="group.gName" class="shrink mr-2" v-model="group.choosedItem" ></v-checkbox>
                                        </v-flex>
                                        <v-flex xs4>
                                            <v-text-field  label="占比" type="number" :rules="noteRules" :disabled="!group.choosedItem" v-model="group.rate" @change="addRate(group)"></v-text-field>
                                        </v-flex>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <v-flex xs4>
                                            <v-text-field  label="产值" type="number" :rules="noteRules" :disabled="!group.choosedItem" v-model="group.output"  @change="addOutPut(group)"></v-text-field>
                                        </v-flex>
                                        <v-flex xs3 class="shortDate">
                                            <v-text-field  label="最短工期" type="number" :rules="noteRules" :disabled="!group.choosedItem" v-model="group.shortDate"></v-text-field>
                                        </v-flex>
                                        <v-flex xs3 class="shortDate">
                                            <v-text-field  label="最迟工期" type="number" :rules="noteRules" :disabled="!group.choosedItem" v-model="group.lastDate"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-form>
                            </v-flex>
                            <v-select v-model="projects.project_charge" :items="chooseCharge" label="项目负责人" item-value="headMan" item-text="headMan"  single-line></v-select>
                        </v-layout>
                    </v-container>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="chooseGroupDialog = false">取消</v-btn>
                    <v-btn color="info" @click="chooseGroupRate(groups)">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
            {{snackbarText}}
        </v-snackbar>
    </v-container>
</template>

<script>
    import store from '@/store.js'
    export default {
        data:()=>({
            chooseGroupDialog:false,
            showWrokGroup:false,
            projectNo:'',
            chooseExecuteData:'',
            chooseNoteData:'',
            chooseRequiresData:'',
            groups:[],
            groupRates:[],
            executes:[],
            worknotes:[],
            requires:[],
            groupIds:[],
            ratesList:[],
            rate:0,
            allOutPut:0,
            chooseGroup:false,
            rates:1,
            chooseRate:'',
            putWork:false,
            snackbar:false,
            snackbarColor:'',
            enabled:false,
            dateMenu:false,
            snackbarText:'',
            snackbarTimeout:2000,
            project_writer:'',
            project_output:0,
            project_outputNote:'',
            project_workLoad:'',
            project_workDate:'',
            project_qualityDate:'',
            rateHeaders:[
                {text:'组名',sortable:false},
                {text:'已安排产值',sortable:false},
                {text:'未完成产值',sortable:false},
                {text:'未完成项目数',sortable:false},
                {text:'安排系数',sortable:false}
            ],
            headers:[
                {text:'作业组',sortable:false},
                {text:'占比',sortable:false},
                {text:'产值',sortable:false},
                {text:'最短工期',sortable:false},
                {text:'最长工期',sortable:false}
            ],
            projects:{
                project_id:'',
                project_execute_standard:'',
                project_begun_date:new Date().toISOString().substr(0, 10),
                project_work_note:'',
                project_note:'',
                project_name:'',
                project_work_require:'',
                project_no:'',
                project_type:'',
                project_authorize:'',
                project_charge:'',
                project_user:'',
                project_phone:'',
                project_setup:'',
                project_business:'',
                chooseGroups:[],
                groupId:''
            },
            noteRules:[
                v => !!v || "内容不能为空"
            ],
        }),
        methods:{
            getPlanDate(){
                this.projectNo = this.$route.query.p_no
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'projectPlan/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        params:{
                            projectNo:this.projectNo
                        }
                    }).then(response => {
                        resolve(response.data)
                        this.projects.project_id = response.data.id
                        this.projects.project_execute_standard = response.data.projectExecuteStandard
                        this.projects.project_name = response.data.projectName
                        this.projects.project_work_note = response.data.projectWorkNote
                        this.projects.project_work_require = response.data.projectWorkRequire
                        this.projects.project_no = response.data.projectNo
                        this.projects.project_type = response.data.projectType
                        this.projects.project_authorize = response.data.projectAuthorize
                        this.projects.project_charge = response.data.projectCharge
                        this.projects.project_note = response.data.projectNote
                        this.projects.project_user = response.data.userName
                        this.projects.project_phone = response.data.userPhone
                        this.projects.project_setup = response.data.projectSetUp
                        this.projects.project_business = response.data.projectBusiness
                        this.projects.chooseGroups = response.data.rateList
                        this.projects.groupId = response.data.groupId
                        if(response.data.projectBegunDate != null){
                            this.projects.project_begun_date = response.data.projectBegunDate    
                        }
                        this.project_output = response.data.projectOutPut
                        this.project_outputNote = response.data.projectOutPutNote
                        this.project_workLoad = response.data.projectWorkLoad
                        this.project_workDate = response.data.projectWorkDate
                        this.project_qualityDate = response.data.projectQualityDate
                        this.projects.chooseGroups.forEach(e=>{
                            e.checkItem = true
                        })
                        this.getGroups().then(success=>{}).catch(error=>{})
                    }).catch(error =>{
                        reject(error.response)
                    })
                })
            },

            savePlanData(){
                this.project_writer = localStorage.getItem('userName')
                if(this.projects.project_execute_standard == null || this.projects.project_work_note == null || this.projects.project_work_require == null ||
                    this.project_output == null || this.project_workDate == null || this.project_qualityDate == null){
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = '有必填项为空，请重新检查'
                    return false
                }
                return new Promise((resolve,reject)=>{
                    axios({
                        method:'POST',
                        url:'projectPlan/update/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        data:{
                            projectExecuteStandard:this.projects.project_execute_standard,
                            projectWorkNote:this.projects.project_work_note,
                            projectWorkRequire:this.projects.project_work_require,
                            projectWriter:this.project_writer,
                            projectNo:this.projectNo,
                            projectCharge:this.projects.project_charge,
                            projectBegunDate: this.projects.project_begun_date,
                            projectOutPut: this.project_output,
                            projectOutPutNote: this.project_outputNote,
                            projectWorkLoad: this.project_workLoad,
                            projectWorkDate: this.project_workDate,
                            projectQualityDate: this.project_qualityDate,
                            rateList:this.projects.chooseGroups
                        }
                    }).then(success=>{
                        if(this.putWork){
                            this.snackbarColor = 'success'
                            this.snackbarText = '提交成功'
                            this.snackbar = true
                            this.putProjectToWork()
                        }else{
                            this.snackbarColor = 'success'
                            this.snackbarText = '保存成功'
                            this.snackbar = true
                        }
                    }).catch(error=>{
                        this.snackbarColor = 'error'
                        this.snackbarText = error.response.data
                        this.snackbar = true
                    })
                })
            },
            getGroups(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'workGroups/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                    }).then(success =>{
                        resolve(success.data)
                        success.data.forEach(element => {
                            element.choosedItem = false
                            element.rate = 0
                            element.lastDate = 0
                            element.shortDate = 0
                            element.output = 0
                        })
                        this.groups = success.data
                        if(this.projects.chooseGroups.length > 0){
                            this.showWrokGroup = true
                            this.groups.forEach(e=>{
                                this.projects.chooseGroups.forEach(p=>{
                                    if(e.id == p.group_id){
                                        e.choosedItem = true
                                        e.rate = p.output_rate
                                        e.output = p.project_output
                                        e.lastDate = p.lastDate
                                        e.shortDate = p.shortDate
                                    }
                                })
                            })
                        }
                    }).catch(error =>{
                        reject(error.response)
                    })
                })
            },
            getGroupRates(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'project/coe/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                    }).then(success =>{
                        // console.log(success)
                        this.groupRates = success.data
                    }).catch(error =>{
                        reject(error.response)
                    })
                })
            },
            getExecuteStandard(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'shortcut/1/',
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
            getworkNotes(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'shortcut/3/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                    }).then(success =>{
                        resolve(success.data)
                        this.worknotes = success.data
                    }).catch(error =>{
                        reject(error.response)
                    })
                })
            },
            getRequires(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'shortcut/4/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                    }).then(success =>{
                        resolve(success.data)
                        this.requires = success.data
                    }).catch(error =>{
                        reject(error.response)
                    })
                })
            },
            putProjectToWork(){
                // console.log(this.groupIds)
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'project/stage/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        data:{
                            projectStage:3,
                            projectNo:this.projectNo,
                            groupsId:this.groupIds,
                            groupId:''
                        }
                    }).then(success=>{
                        resolve(success.data)
                        this.putWork = false
                        setTimeout(_=>{
                            this.$router.go(-1)
                        },1000)
                    })
                })
            },
            clickPutToWork(){
                if(this.projects.project_execute_standard == null || this.projects.project_work_note == null || this.projects.project_work_require == null ||
                    this.project_output == null || this.project_workDate == null || this.project_qualityDate == null){
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = '有必填项为空，请重新检查'
                    return false
                }else{
                    this.putWork = true
                    this.savePlanData().then(success=>{}).catch(error=>{})
                }
            },
            chooseDialog(){
                this.chooseGroupDialog = true
            },
            countWorkDate(){
                var workNum = this.project_output / 2400 - parseInt(this.project_output / 2400)
                console.log(workNum)
                if(workNum == 0){
                    this.project_workDate = Math.round(this.project_output / 2400)
                }else if(workNum < 0.5){
                   this.project_workDate = parseInt(this.project_output / 2400) + 0.5
                }else{
                    this.project_workDate = Math.round(this.project_output / 2400)
                }
                var qualityNum = this.project_workDate * 0.25 - parseInt(this.project_workDate * 0.25)
                if(qualityNum == 0){
                    this.project_qualityDate = Math.round(this.project_workDate * 0.25)
                }else if(qualityNum < 0.5){
                   this.project_qualityDate = parseInt(this.project_workDate * 0.25) + 0.5
                }else{
                   this.project_qualityDate = Math.round(this.project_workDate * 0.25)
                }
                // if(Math.round(this.project_output / 2400) < 0.5){
                //     this.project_workDate = 0.5
                // }else{
                //     this.project_workDate = Math.round(this.project_output / 2400)
                // }

                // if(Math.round(this.project_workDate * 0.25) < 0.5){
                //     this.project_qualityDate = 0.5
                // }else{
                //     this.project_qualityDate = Math.round(this.project_workDate * 0.25)
                // }
                this.groups.forEach(e=>{
                    if(e.choosedItem){
                        if(e.rate > 0 && e.output > 0){
                            e.output = (e.rate / 100 * this.project_output).toFixed(3)
                            var shortNum = e.output / 2400 * 0.7 - parseInt(e.output / 2400 * 0.7)
                            if(shortNum == 0){
                                e.shortDate = Math.round(e.output / 2400 * 0.7)
                            }else if(shortNum < 0.5){
                                e.shortDate = parseInt(e.output / 2400 * 0.7) + 0.5
                            } else{
                                e.shortDate = Math.round(e.output / 2400 * 0.7)
                            }
                            var lastNum = e.output / 2400 *1.3 - parseInt(e.output / 2400 *1.3)
                            console.log(lastNum)
                            if(lastNum == 0){ 
                                e.lastDate = Math.round(e.output / 2400 *1.3)
                            }else if(lastNum<0.5){
                                e.lastDate = parseInt(e.output / 2400 *1.3) + 0.5
                            }else{
                                e.lastDate = Math.round(e.output / 2400 *1.3)
                            }

                            // if(Math.round(e.output / 2400 *1.3) < 0.5){
                            //     e.lastDate = Math.round(e.output / 2400 *1.3)
                            // }else{
                               
                            // }
                            // e.shortDate = Math.round(e.output / 2400 * 0.7)
                            // e.lastDate = Math.round(e.output / 2400 *1.3)
                        }
                    }
                })
            },
            chooseGroupRate(groups){
                
                this.groupIds = []
                var id = 0
                var outRates = 0
                var showDialog = true
                this.allOutPut = 0
                this.rate = 0.0
                this.groups.forEach(e=>{
                    if(e.choosedItem == true){
                        if(e.rate == 0 && e.output == 0){
                            this.chooseGroup = false
                        }else{
                            this.rate += parseFloat(e.rate)
                            this.allOutPut += parseFloat(e.output)
                            this.chooseGroup = true
                        }
                    }
                })
                console.log(this.allOutPut)
                console.log(this.rate)
                // console.log(this.project_output)
                if(this.chooseGroup == false){
                    this.snackbarColor = 'error'
                    this.snackbarText = '勾选的工作组没有填写内容'
                    this.snackbar = true
                    this.showDialog = false
                }else{
                    if(this.rate > 100.01 || this.rate < 99.99){
                        this.snackbarColor = 'error'
                        this.snackbarText = '总百分比不能超过100或者小于100'
                        this.snackbar = true
                        this.showDialog = false
                    }else if(this.allOutPut > this.project_output || this.allOutPut < this.project_output){
                        // console.log(this.allOutPut)
                        this.snackbarColor = 'error'
                        this.snackbarText = '总计产值不能超过或者小于总预计产值'
                        this.snackbar = true
                        this.showDialog = false
                    }else{
                        this.showDialog = true
                    }
                }

                if(this.showDialog){
                    this.rate = 0
                    this.showWrokGroup = true
                    this.projects.chooseGroups = []
                    this.groups.forEach(e=>{
                        if(e.choosedItem == true){
                            this.projects.chooseGroups.push({group_id:e.id,groupName:e.gName,output_rate:e.rate,project_output:e.output,shortDate:e.shortDate,lastDate:e.lastDate})
                            this.groupIds.push(e.id)
                        }
                    })
                    this.chooseGroupDialog = false
                }

            },
            chooseExecute(){
                if(this.projects.project_execute_standard == null){
                    this.projects.project_execute_standard = ''
                }
                this.projects.project_execute_standard += this.chooseExecuteData + ';'
            },
            chooseNote(){
                if(this.projects.project_work_note == null){
                    this.projects.project_work_note = ''
                }
                this.projects.project_work_note += this.chooseNoteData + ';'
            },
            chooseRequire(){
                if(this.projects.project_work_require == null){
                    this.projects.project_work_require = ''
                }
                this.projects.project_work_require += this.chooseRequiresData + ';'
            },
            addRate(item){
                item.output = item.rate / 100 * this.project_output
                var shortNum = item.output / 2400 * 0.7 - parseInt(item.output / 2400 * 0.7)

                if(shortNum == 0){
                    item.shortDate = Math.round(item.output / 2400 * 0.7)
                }else if(shortNum < 0.5){
                    item.shortDate = parseInt(item.output / 2400 * 0.7) + 0.5
                } else {
                    item.shortDate = Math.round(item.output / 2400 * 0.7)
                }

                var lastNum = item.output / 2400 *1.3 - parseInt(item.output / 2400 *1.3)
                if(lastNum == 0){
                    item.lastDate = Math.round(item.output / 2400 *1.3)
                }
                if(lastNum < 0.5){
                    item.lastDate = parseInt(item.output / 2400 *1.3) + 0.5
                }else{
                    item.lastDate = Math.round(item.output / 2400 *1.3)
                }
                // if(Math.round(item.output / 2400 * 0.7) < 0.5){
                //     item.shortDate = 0.5
                // }else{
                    
                // }

                // if(Math.round(item.output / 2400 *1.3) < 0.5){
                //     item.lastDate = 0.5
                // }else{
                //     item.lastDate = Math.round(item.output / 2400 *1.3)
                // }
            },
            addOutPut(item){
                // console.log(this.project_output)
                item.rate = item.output / this.project_output * 100
                var shortNum = item.output / 2400 * 0.7 - parseInt(item.output / 2400 * 0.7)
                if(0 < shortNum < 0.5){
                    item.shortDate = parseInt(item.output / 2400 * 0.7) + 0.5
                } else {
                    item.shortDate = Math.round(item.output / 2400 * 0.7)
                }
                var lastNum = item.output / 2400 *1.3 - parseInt(item.output / 2400 *1.3)
                if(0 < lastNum < 0.5){
                    item.lastDate = parseInt(item.output / 2400 *1.3) + 0.5
                }else{
                    item.lastDate = Math.round(item.output / 2400 *1.3)
                }

                // if(Math.round(item.output / 2400 * 0.7) < 0.5){
                //     item.shortDate = 0.5
                // }else{
                //     item.shortDate = Math.round(item.output / 2400 * 0.7)
                // }

                // if(Math.round(item.output / 2400 *1.3) < 0.5){
                //     item.lastDate = 0.5
                // }else{
                //     item.lastDate = Math.round(item.output / 2400 *1.3)
                // }
            },
            //保留小数点后两位的过滤器，尾数不四舍五入
            numFilter(value) {
                // 截取当前数据到小数点后三位
                let tempVal = parseFloat(value).toFixed(2)
                let realVal = tempVal.substring(0,  tempVal.length - 1)
                return realVal
            }
        },
        computed: {
            chooseCharge() {
                let temp = []
                this.groups.forEach(e=>{
                    if(e.choosedItem) temp.push(e)})
                if(temp.length > 0){
                    this.projects.project_charge = temp[0].headMan
                }
                return temp
            }
        },
        created(){

        },
        mounted(){
            this.getPlanDate().then(success=>{}).catch(error=>{})
            this.getExecuteStandard().then(success=>{}).catch(error=>{})
            this.getworkNotes().then(success=>{}).catch(error=>{})
            this.getGroupRates().then(success=>{}).catch(error=>{})
            this.getRequires().then(success=>{}).catch(error=>{})
        }
    }
</script>
<style>
    .v-textarea.v-text-field--enclosed .v-text-field__slot{
        height:80px
    }
    .chooseGroup{
        margin-top: 24px
    }
    .chooseTips{
        margin-top: 32px;
        margin-right: 12px;
        font-size: 18px

    }
    .bottomBtn{
        margin-top: 32px
    }
    .topInfo{
        margin-top: -40px
    }
    .centerInfo{
        margin-top: -20px
    }
    .bottomInfo{
        margin-top: -20px
    }
    .qInfo{
        margin-left: 24px
    }
    .oInfo{
        margin-left: 24px
    }
    .shortDate{
        margin-left: 24px
    }
    .rateInfo{
        margin-top: 24px
    }
</style>
