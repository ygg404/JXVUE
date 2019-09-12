<template>
    <v-container fluid>
        <v-layout  align-start justify-center column fill-height>
            <v-expansion-panel v-model="infoPanel" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>项目基本信息</h3>
                    </template>
                    <v-card color="grey lighten-4">
                        <v-layout>
                            <v-flex>
                                <v-card-text class="subheading">项目名称:{{works.project_projectName}}</v-card-text>
                                <v-card-text class="subheading">委托单位: {{project_plan.project_authorize}}</v-card-text>
                                <v-card-text class="subheading">委托要求:{{project_plan.project_note}}</v-card-text>
                                <v-card-text class="subheading">作业内容: {{project_plan.project_workNote}}</v-card-text>
                                <v-card-text class="subheading">技术要求: {{project_plan.project_workRequire}}</v-card-text>
                                <v-card-text class="subheading">业务负责人:{{works.project_projectBusiness}}</v-card-text>
                                <v-card-text class="subheading">联系人:{{project_plan.project_user}}</v-card-text>
                                <v-card-text class="subheading">联系电话: {{project_plan.project_phone}}</v-card-text>
                                <v-card-text class="subheading">项目开工时间:{{project_plan.project_begun_date_time}}</v-card-text>
                                <v-card-text class="subheading">执行标准:{{this.note}}</v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-card>

                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel v-model="planPanel" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>进度记录</h3>
                    </template>
                    <v-card-text>
                        <v-data-table :headers="headers" hide-actions :items="schedule">
                            <template slot="items" slot-scope="props">
                                <td>{{props.item.id}}</td>
                                <td>{{props.item.scheduleCreateTime}}</td>
                                <td>{{props.item.projectRate}}</td>
                                <td>{{props.item.projectNote}}</td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-layout>

        <v-layout  align-start justify-end fill-height class="btnInfo">
            <v-btn @click="all">展开</v-btn>
            <v-btn @click="none">收起</v-btn>
        </v-layout>


        <v-card>
            <v-card-title class="headline cardInfo" >项目作业信息
            </v-card-title>
            <v-card-text>
                <v-layout wrap>
                    <v-flex md5>
                        <v-flex>
                            <v-select label="技术交底内容快捷输入" :items="disclosureNotes" item-text="shortNote" item-value="shortNote" @change="changeNote" v-model="chooseNote"></v-select>
                        </v-flex>
                        <v-textarea outline name="input-7-4" label="技术交底内容" v-model="works.project_disclosureNote" :rules="noteRules"></v-textarea>
                    </v-flex>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <v-flex md5>
                        <v-flex>
                            <v-select  label="过程检查意见快捷输入" :items="checkSuggestions" item-text="shortNote" item-value="shortNote" @change="changeSuggestion" v-model="chooseSuggestion"></v-select>
                        </v-flex>
                        <v-textarea outline name="input-7-4" label="过程检查意见" v-model="works.project_checkSuggestion" :rules="noteRules"></v-textarea>
                    </v-flex>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <v-flex md5>
                        <v-flex>
                            <v-select  label="上交资料快捷输入" :items="dataName" item-text="shortNote" item-value="shortNote" @change="changeData" v-model="chooseData"></v-select>
                        </v-flex>
                        <v-textarea outline name="input-7-4" label="上交资料" v-model="works.project_dataName" :rules="noteRules"></v-textarea>
                    </v-flex>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <v-flex md5>
                        <v-flex>
                            <v-select  label="工作小结快捷输入" :items="briefSummarys" item-text="shortNote" item-value="shortNote" @change="changeBrief" v-model="chooseBrief"></v-select>
                        </v-flex>
                        <v-textarea outline name="input-7-4" label="工作小结" v-model="works.project_briefSummary" :rules="noteRules"></v-textarea>
                    </v-flex>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <v-flex md5>
                        <v-flex>
                            <v-select  label="工作量快捷输入" :items="workLoad" item-text="shortNote" item-value="shortNote" @change="changeWorkLoad" v-model="chooseWorkLoad"></v-select>
                        </v-flex>
                        <v-textarea outline name="input-7-4" label="工作量" v-model="works.project_workLoad" :rules="noteRules"></v-textarea>
                    </v-flex>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </v-layout>
            </v-card-text>
        </v-card>
        <v-layout align-center justify-center fill-height class="bottomBtn">
            <v-btn color="orange" class="white--text" @click="$router.go(-1)">返回</v-btn>
            <v-btn color="info" @click="addWorkData">保存</v-btn>
            <v-btn color="success" @click="putToApi">提交到质量检查</v-btn>
            <v-btn color="error" @click="addSchedule">添加进度</v-btn>
        </v-layout>

        <v-dialog max-width="500px" v-model="addScheduleDialog" persistent>
            <v-card>
                <v-card-title><span class="title">添加项目进度</span></v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex md12><v-text-field v-model="projectNo" label="项目编号:" :rules="noteRules" prepend-icon="book" disabled></v-text-field></v-flex>
                            <v-flex md12><v-text-field v-model="projectName" label="项目名称:" :rules="noteRules" prepend-icon="book" disabled></v-text-field></v-flex>
                            <v-layout wrap>
                                <v-flex md9><v-slider v-model="projectRate" :min="0" :max="100" label="进度条:" prepend-icon="history" thumb-label @change="limitRate"></v-slider></v-flex>
                                <v-flex md2>{{this.projectRate}}%</v-flex>
                            </v-layout>
                            <v-flex md12>
                                <v-textarea prepend-icon="book" v-model="projectNote" name="input-7-4" label="进度内容"></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="colseAddScheduleDialog">取消</v-btn>
                    <v-btn color="info" @click="addTimeApi">添加</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog max-width="500px" v-model="NoteDialog" persistent>
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="backNote" label="返修内容:" prepend-icon="calendar_today" disabled></v-text-field>
                                <v-text-field v-model="Note" label="请填写提交内容:" :rules="noteRules" prepend-icon="calendar_today"></v-text-field>
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
        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
            {{snackbarText}}
        </v-snackbar>
    </v-container>
</template>

<script>
import store from '@/store.js'
export default {
    data:()=>({
        backNote:'',
        Note:'',
        back_id:0,
        NoteDialog:false,
        headers:[
            {text:'编号',value:'id',sortable:false},
            {text:'日期',value:'projectCreateTime',sortable:false},
            {text:'当前进度',value:'projectRate',sortable:false},
            {text:'进度内容',value:'projectNote',sortable:false},
        ],
        backList:[],
        schedule:[],
        infoPanel:[false],
        planPanel:[false],
        item:[],
        projectRate:0,
        projectName:'',
        projectNote:'',
        addScheduleDialog:false,
        briefSummarys:[],
        disclosureNotes:[],
        checkSuggestions:[],
        dataName:[],
        workLoad:[],
        chooseNote:'',
        note:'',
        projectNo:'',
        chooseSuggestion:'',
        chooseData:'',
        chooseBrief:'',
        chooseWorkLoad:'',
        dateMenu:false,
        snackbar:false,
        putQuality:false,
        snackbarColor:'',
        snackbarText:'',
        showEditNote:false,
        snackbarTimeout:2000,
        projectRate:0,
        groupId:0,
        permissions:JSON.parse(localStorage.getItem('permissions')),
        works:{
            project_id:'',
            project_briefSummary:'',
            project_checkSuggestion:'',
            project_dataName:'',
            project_disclosureNote:'',
            project_finishDateTime:'',
            project_projectBusiness:'',
            project_projectName:'',
            project_projectProduce:'',
            project_projectSetUp:'',
            project_workLoad:'',
            project_startTime:'',
            project_type:''
        },
        project_plan:{
            project_authorize:'',
            project_charge:'',
            project_executeStandard:'',
            project_workNote:'',
            project_workRequire:'',
            project_writer:'',
            project_user:'',
            project_phone:'',
            project_note:'',
            project_begun_date_time: ''
            
        },
         noteRules:[
            v => !!v || "内容不能为空"
        ],
    }),
    methods:{
        all(){
            this.infoPanel=[true]
            this.planPanel=[true]
        },
        none () {
            this.infoPanel=[false]
            this.planPanel=[false]
        },
        addTimeApi() {
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
                    this.groupId = this.$route.query.p_group
                    this.addScheduleDialog = false
                    this.snackbar = true
                    this.snackbarColor = 'success'
                    this.snackbarText = '添加成功'
                    this.getScheuleByNoApi().then(success=>{}).catch(error=>{})
                }).catch(error => {
                    this.snackbar = false
                    this.snackbarColor = 'error'
                    this.snackbarText = '添加失败'
                })
            })
        },
        getScheduleFromApi() {
            return new Promise((resolve, reject) => {
                axios({
                    methods: 'GET',
                    url: 'getSchedule/',
                    params: {
                        projectNo: this.$route.query.p_no
                    },
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem("token")
                    }
                }).then(response => {
                    resolve(response.data)
                    this.projectName = this.$route.query.p_name
                    if(response.data.projectRate != null){
                        this.projectRate = response.data.projectRate
                    }else{
                        this.projectRate = 0
                    }

                    this.projectNote = response.data.projectNote
                }).catch(error => {
                    reject(error.response.data)
                })
            })
        },
        getScheuleByNoApi(){
            return new Promise((resolve, reject) => {
                axios({
                    methods: 'GET',
                    url: '/project/schedule/'+this.$route.query.p_no+'/',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem("token")
                    }
                }).then(response => {
                    resolve(response.data)
                    this.schedule = response.data
                }).catch(error => {
                    reject(error.response.data)
                })
            })
        },
        limitRate(){
            if(this.projectRate > 90){
                this.snackbarColor = 'error'
                this.snackbarText = '项目未完结，最高进度只可达90%，请提交质检'
                this.snackbar = true
                this.projectRate = 90
            }
        },
        addSchedule(){
            this.getScheduleFromApi().then(success=>{}).catch(error=>{})
            this.addScheduleDialog = true
        },
        colseAddScheduleDialog(){
            this.projectNote = ""
            this.projectRate = 0
            this.addScheduleDialog = false
        },
        getWorkData(){
            this.projectNo = this.$route.query.p_no
            this.groupId = this.$route.query.p_group
            return new Promise((resolve,reject) =>{
                axios({
                    method:'GET',
                    url:'projectWork/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                    params:{
                        projectNo:this.projectNo,
                        groupId:this.groupId
                    }
                }).then(response => {
                    resolve(response.data)
                    this.projectRate = response.data.projectRate,
                    this.works.project_id = response.data.id,
                    this.works.project_briefSummary = response.data.briefSummary,
                    this.works.project_checkSuggestion = response.data.checkSuggestion,
                    this.works.project_dataName = response.data.dataName,
                    this.works.project_disclosureNote = response.data.disclosureNote,
                    this.works.project_finishDateTime = response.data.finishDateTime,
                    this.works.project_projectBusiness = response.data.projectBusiness,
                    this.works.project_projectName = response.data.projectName,
                    this.works.project_projectProduce = response.data.projectProduce,
                    this.works.project_projectSetUp = response.data.projectSetUp,
                    this.works.project_workLoad = response.data.workLoad,
                    this.works.project_startTime = response.data.projectStartTime,
                    this.project_plan.project_authorize = response.data.projectPlan.projectAuthorize,
                    this.project_plan.project_charge = response.data.projectPlan.projectCharge,
                    this.project_plan.project_executeStandard = ';' + response.data.projectPlan.projectExecuteStandard,
                    this.project_plan.project_workNote = response.data.projectPlan.projectWorkNote,
                    this.project_plan.project_workRequire = response.data.projectPlan.projectWorkRequire,
                    this.project_plan.project_writer = response.data.projectPlan.projectWriter,
                    this.project_plan.project_user = response.data.projectPlan.userName,
                    this.project_plan.project_phone = response.data.projectPlan.userPhone,
                    this.project_plan.project_note = response.data.projectPlan.projectNote,
                    this.project_plan.project_begun_date_time = response.data.projectBegunDate
                    this.works.project_type = response.data.projectType
                    this.note = this.project_plan.project_executeStandard.replace(/;/g, '☑').slice(0,-1);
                }).catch(error =>{
                    reject(error.response)
                })
            })
        },
        addWorkData(){          
            if(this.works.project_disclosureNote.trim() == null || this.works.project_checkSuggestion.trim() == null
            || this.works.project_dataName.trim() == null || this.works.project_briefSummary.trim() == null
            || this.works.project_workLoad.trim() == null){
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = '有必填项为空，请重新检查'
                return false
            }
            return new Promise((resolve,reject) =>{
                axios({
                    method:'POST',
                    url:'projectWork/update/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                    data:{
                        projectNo:this.projectNo,
                        disclosureNote: this.works.project_disclosureNote,
                        checkSuggestion: this.works.project_checkSuggestion,
                        dataName:this.works.project_dataName,
                        briefSummary:this.works.project_briefSummary,
                        workLoad:this.works.project_workLoad,
                        finishDateTime:this.works.project_finishDateTime,
                        groupId:this.groupId
                    }
                }).then(success=>{

                    if(this.putQuality){
                        this.snackbarColor = 'success'
                        this.snackbarText = '提交成功'
                        this.snackbar = true
                        this.putToQuality()
                    }else{
                        this.snackbarColor = 'success'
                        this.snackbarText = '保存成功'
                        this.snackbar = true
                        this.putQuality = false
                    }
                }).catch(error=>{
                    this.snackbarColor = 'error'
                    this.snackbarText = error.response.data
                    this.snackbar = true
                })
            })
        },
        putToQuality(){
                if(this.projectRate < 90){
                    this.snackbarColor = 'error'
                    this.snackbarText = '当前进度未达90%，如若已完成，请添加进度并把进度值调为90'
                    this.putQuality = false
                    this.snackbar = true
                    return false 
                }
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
                        groupId:this.groupId
                    }
                }).then(success=>{
                    resolve(success.data)
                    this.putFinishTime().then(success=>{}).catch(error=>{})
                    setTimeout(_=>{ 
                       this.$router.go(-1)
                    },1000)
                })
            })
        },
        putFinishTime(){
                return new Promise((resolve,reject) =>{
                axios({
                    method:'POST',
                    url:'projectWork/time/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                    data:{
                        projectStage:4,
                        projectNo:this.projectNo,
                        groupId:this.groupId
                    }
                }).then(success=>{
                    resolve(success.data)
                })
            })
        },
        colseNoteDialog(){
            this.Note = ''
            this.NoteDialog = false
        },
        putToApi(){
            if(this.works.project_disclosureNote == null || this.works.project_checkSuggestion == null
            || this.works.project_dataName == null || this.works.project_briefSummary == null
            || this.works.project_workLoad == null){
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = '有必填项为空，请重新检查'
            }else{
                this.putQuality = true
                this.getBack().then(success=>{}).catch(error=>{})
            }
        },
        getBack(){
            this.projectNo = this.$route.query.p_no
            return new Promise((resolve,reject) =>{
                axios({
                    methods:'GET',
                    url:'project/back/',
                    params:{
                        projectNo: this.projectNo,
                    },
                    headers:{
                        Authorization: 'Bearer ' + sessionStorage.getItem("token")
                    }
                }).then(response=>{
                    response.data.forEach((item) => {
                        if(item.note == null){
                            console.log(item)
                            this.backNote = item.backNote
                            this.back_id = item.id
                            this.showEditNote = true
                        }else{
                            this.showEditNote = false
                        }
                    })
                    if(this.showEditNote){
                        this.NoteDialog = true
                    }else{
                        this.addWorkData().then(success=>{}).catch(error =>{})
                    }
                }).catch(error=>{
                    this.loading = false
                    reject(error.response)
                })
            })
        },
        addNoteApi(){
            return new Promise((resolve,reject) =>{
                if(this.Note == ""){
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = '有必填项为空，请重新检查'
                    return false
                }
                axios({
                    method:'POST',
                    url:'addNote/',
                    data:{
                        back_id: this.back_id,
                        note: this.Note,
                    },
                    headers:{
                        Authorization: 'Bearer ' + sessionStorage.getItem("token")
                    }
                }).then(response=>{
                    this.Note =  ''
                    this.NoteDialog = false
                    this.snackbar = true
                    this.snackbarColor = 'success'
                    this.snackbarText = '提交成功'
                    this.putQuality = true
                    this.addWorkData().then(success=>{}).catch(error =>{})

                }).catch(error=>{
                    this.snackbar = false
                    this.snackbarColor = 'error'
                    this.snackbarText = error.response.data.message
                })
            })

        },
        getdisclosureNote(){                                //获取技术交底快捷数据
            return new Promise((resolve,reject) =>{
                axios({
                    method:'GET',
                    url:'shortcut/5/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                }).then(success =>{
                    resolve(success.data)
                    this.disclosureNotes = success.data
                }).catch(error =>{
                    reject(error.response)
                })
            })
        },
        getcheckSuggestion(){                                //获取过程检查意见快捷数据
            return new Promise((resolve,reject) =>{
                axios({
                    method:'GET',
                    url:'shortcut/6/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                }).then(success =>{
                    resolve(success.data)
                    this.checkSuggestions = success.data
                }).catch(error =>{
                    reject(error.response)
                })
            })
        },
        getdataName(){                                //获取上交资料快捷数据
            return new Promise((resolve,reject) =>{
                axios({
                    method:'GET',
                    url:'shortcut/7/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                }).then(success =>{
                    resolve(success.data)
                    this.dataName = success.data
                }).catch(error =>{
                    reject(error.response)
                })
            })
        },
        getbriefSummary(){                                //获取工作小结快捷数据
            return new Promise((resolve,reject) =>{
                axios({
                    method:'GET',
                    url:'shortcut/8/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                    
                }).then(success =>{
                    resolve(success.data)
                    this.briefSummarys = success.data
                }).catch(error =>{
                    reject(error.response)
                })
            })
        },
        getworkLoad(){                                //获取工作量快捷数据
            return new Promise((resolve,reject) =>{
                axios({
                    method:'GET',
                    url:'shortcut/11/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                }).then(success =>{
                    resolve(success.data)
                    this.workLoad = success.data
                }).catch(error =>{
                    reject(error.response)
                })
            })
        },
        changeNote(){
            if(this.works.project_disclosureNote == null){
                this.works.project_disclosureNote = ''
            }
            this.works.project_disclosureNote += this.chooseNote + ';'
        },
          changeSuggestion(){
            if(this.works.project_checkSuggestion == null){
                this.works.project_checkSuggestion = ''
            }
            this.works.project_checkSuggestion += this.chooseSuggestion + ';'
        },
          changeData(){
            if(this.works.project_dataName == null){
                this.works.project_dataName = ''
            }
            this.works.project_dataName += this.chooseData + ';'
        },
          changeBrief(){
            if(this.works.project_briefSummary == null){
                this.works.project_briefSummary = ''
            }
            this.works.project_briefSummary += this.chooseBrief + ';'
        },
          changeWorkLoad(){
            if(this.works.project_workLoad == null){
                this.works.project_workLoad = ''
            }
            this.works.project_workLoad += this.chooseWorkLoad + ';'
        },
    },
    created(){
       
    },
    mounted(){
        this.getScheuleByNoApi().then(success=>{}).catch(error=>{})
      this.getWorkData().then(success=>{}).catch(error=>{})
      this.getdisclosureNote().then(success=>{}).catch(error=>{})
      this.getcheckSuggestion().then(success=>{}).catch(error=>{})
      this.getdataName().then(success=>{}).catch(error=>{})
      this.getbriefSummary().then(success=>{}).catch(error=>{})
      this.getworkLoad().then(success=>{}).catch(error=>{})
    },
    computed: {
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
    .flex.md2{
        margin-left: 10px;
        margin-top: 13px;
    }

</style>
