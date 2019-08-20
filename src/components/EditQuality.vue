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
                                <v-card-text class="subheading">项目名称:{{quality.project_name}}</v-card-text>
                                <!-- <v-card-text class="subheading">委托单位: {{quality.project_authorize}}</v-card-text> -->
                                <v-card-text class="subheading">
                                    <blockquote>
                                        委托要求:{{quality.project_projectNote}}
                                    </blockquote></v-card-text>
                                    <v-card-text class="subheading">
                                    <blockquote>
                                        作业内容: {{quality.project_workNote}}
                                    </blockquote></v-card-text>
                                     <v-card-text class="subheading">
                                    <blockquote>
                                        工作小结: {{quality.project_brief}}
                                    </blockquote></v-card-text>
                                <!-- <v-card-text class="subheading">项目类型: {{quality.project_type}}</v-card-text> -->
                            </v-flex>
                            <v-flex>
                                <!--<v-card-text class="subheading">项目阶段:{{output.projectStage}}</v-card-text>-->
                                <!-- <v-card-text class="subheading">联系人:{{quality.project_user}}</v-card-text>
                                <v-card-text class="subheading">联系电话: {{quality.project_phone}}</v-card-text>
                                <v-card-text class="subheading">项目启动时间:{{quality.project_startDateTime}}</v-card-text> -->
                                    <v-card-text class="subheading">
                                    <blockquote>
                                        上交资料: {{quality.project_dataName}}
                                    </blockquote></v-card-text>
                                    <v-card-text class="subheading">
                                        项目负责人: {{quality.project_charge}}</v-card-text>
                                    <v-card-text class="subheading">
                                        业务负责人:{{quality.project_business}}</v-card-text>
                            </v-flex> 
                        </v-layout>
                    </v-card>

                </v-expansion-panel-content>
            </v-expansion-panel>

            <!-- <v-expansion-panel v-model="planPanel" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>项目安排信息</h3>
                    </template>
                    <v-card color="grey lighten-4">
                        <v-layout>
                            <v-flex>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        执行标准:{{quality.project_exe}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        作业内容: {{quality.project_workNote}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        技术要求:{{quality.project_workRequire}}
                                    </blockquote></v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel v-model="workPanel" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>项目作业信息</h3>
                    </template>
                    <v-card color="grey lighten-4">
                        <v-layout>
                            <v-flex>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        技术交底内容: {{quality.project_disclosureNote}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        过程检查意见:{{quality.project_checkSuggestion}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        上交资料: {{quality.project_dataName}}
                                    </blockquote></v-card-text>
                            </v-flex>
                            <v-flex>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        工作小结: {{quality.project_brief}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        工作量:{{quality.project_workLoad}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">项目完成时间:{{output.projectEndTime}}</v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel v-model="peoPanel" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>负责人信息</h3>
                    </template>
                    <v-card color="grey lighten-4">
                        <v-layout>
                            <v-flex>
                                <v-card-text class="subheading">
                                    项目立项人:{{quality.project_setup}}</v-card-text>
                                <v-card-text class="subheading">
                                    业务负责人:{{quality.project_business}}</v-card-text>
                                <v-card-text class="subheading">
                                    生产负责人: {{quality.project_produce}}</v-card-text>
                            </v-flex>
                            <v-flex>
                                <v-card-text class="subheading">
                                    项目负责人: {{quality.project_charge}}</v-card-text>
                                <v-card-text class="subheading">
                                    编写人: {{quality.project_writer}}</v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel> -->
            <v-expansion-panel v-model="peoBack" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>返修记录</h3>
                    </template>
                    <v-card color="grey lighten-4">
                        <v-layout>
                            <v-flex>
                                <v-card-text class="subheading">
                                    <table>
                                        <tr>
                                            <tb>返修意见:</tb>
                                            <tb><div v-for="item in backNotes" :key="item.id" style="margin: 10px">{{ item.backNote }}</div></tb>
                                        </tr>
                                    </table>
                                </v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-layout>

        <v-layout  align-start justify-end fill-height class="btnInfo">
            <v-btn @click="all">展开</v-btn>
            <v-btn @click="none">收起</v-btn>
        </v-layout>

        <v-card>
            <v-card-title class="headline cardInfo" >质量检查信息
            </v-card-title>
            <v-card-text>
                <v-flex xs4>
                    <v-select  label="质量综述快捷输入" :items="qualitys" item-text="shortNote" item-value="shortNote" @change="chooseQuality" v-model="chooseNote"></v-select>
                </v-flex>
                <v-textarea outline name="input-7-4" label="质量综述" v-model="quality.qualityNote" :rules="noteRules"></v-textarea>
                <v-flex xs2>
                    <v-text-field label="质量评分" v-model="quality.qualityScore" :rules="noteRules" type="number" @change="inputScore"></v-text-field>
                    <v-btn color="info" @click="addQualityScore">添加质量评分</v-btn>
                </v-flex>
            </v-card-text>
        </v-card>
        <v-layout align-center justify-center fill-height class="bottomBtn">
            <v-btn color="orange" class="white--text" @click="$router.go(-1)">返回</v-btn>
            <v-btn color="info" @click="addQuality">保存</v-btn>
            <v-btn color="success" @click="putToApi">提交到产值核算</v-btn>
            <v-btn color="error" @click="backwork">退回返修</v-btn>
        </v-layout>

        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
            {{snackbarText}}
        </v-snackbar>
        <v-dialog max-width="500px" v-model="showBackDialog" persistent>
            <v-card>
                <v-card-title><span class="title">提出返修</span></v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex class="topInfo">
                                <v-select label="返修短语" :items="executes" item-text="shortNote" item-value="shortNote" @change="chooseExecute" v-model="chooseExecuteData"></v-select>
                            </v-flex>
                            <v-flex md12>
                                <v-textarea name="input-7-4" label="返修意见" v-model="backNote" :rules="noteRules"></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="colseShowBackDialog">取消</v-btn>
                    <v-btn color="info" @click="addBack">提交</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
    import store from '@/store.js'
import { error } from 'util';
    export default {
        data:()=>({
            addQualityScoreDialog:false,
            backNote:'',
            backNotes:[],
            peoBack:[false],
            infoPanel:[false],
            planPanel:[false],
            workPanel:[false],
            qualityPanel:[false],
            peoPanel:[false],
            qualityDialog:false,
            projectNo:'',
            choosefinalS:'',
            chooseNote:'',
            executes:[],
            chooseExecuteData:'',
            suggestions:[],
            qualitys:[],
            snackbar:false,
            putToOutPut:false,
            groupId:0,
            groupIds:[],
            useraccount: localStorage.getItem('userAccount'),
            snackbarColor:'',
            snackbarText:'',
            snackbarTimeout:2000,
            showBackDialog:false,
            quality:{
                finalSuggestion:'',
                qualityNote:'',
                qualityScore:'',
                project_exe:'',
                project_workNote:'',
                project_workRequire:'',
                project_writer:'',
                project_type:'',
                project_authorize:'',
                project_charge:'',
                project_user:'',
                project_phone:'',
                project_name:'',
                project_disclosureNote:'',
                project_checkSuggestion:'',
                project_dataName:'',
                project_brief:'',
                project_workLoad:'',
                project_finishDateTime:'',
                project_startDateTime:'',
                project_business:'',
                project_produce:'',
                project_projectNote:'',
                project_setup:''
            },
            noteRules:[
                v => !!v || "内容不能为空"
            ],
            self_permissions: JSON.parse(localStorage.getItem('permissions'))
        }),
        methods:{
            addQualityScore(){
                this.$router.push({name:'addQualityScore',query:{'p_no':this.projectNo}});
            },
            colseAddQualityScoreDialog(){
                this.addQualityScoreDialog =false
            },
            backwork(){
                this.showBackDialog = true
            },
            addBack(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'project/back/',
                        headers:{
                            Authorization: "Bearer " +sessionStorage.getItem('token')
                        },
                        data:{
                            projectNo:this.projectNo,
                            backNote: this.backNote,
                            groupId:this.groupId
                        }
                    }).then(response =>{
                        this.putToWork()
                        this.showBackDialog = false
                        this.snackbar = true
                        this.snackbarColor = 'success'
                        this.snackbarText = '提交成功'
                    }).catch(error =>{})
                })
            },
            getQualityData(){
                this.projectNo = this.$route.query.p_no
                this.groupId = this.$route.query.p_group
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'projectData/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        params:{
                            projectNo:this.projectNo
                        }
                    }).then(response => {
                        resolve(response.data)
                        this.quality.finalSuggestion = response.data.checkSuggestion,
                        this.quality.qualityNote = response.data.qualityNote,
                        this.quality.qualityScore = response.data.qualityScore
                        this.quality.project_exe = response.data.projectPlan.projectExecuteStandard,
                        this.quality.project_workNote = response.data.projectPlan.projectWorkNote,
                        this.quality.project_workRequire = response.data.projectPlan.projectWorkRequire,
                        this.quality.project_writer = response.data.projectPlan.projectWriter,
                        this.quality.project_authorize = response.data.projectPlan.projectAuthorize,
                        this.quality.project_charge = response.data.projectPlan.projectCharge,
                        this.quality.project_user = response.data.projectPlan.userName,
                        this.quality.project_phone = response.data.projectPlan.userPhone,
                        this.quality.project_name = response.data.projectPlan.projectName,
                        this.quality.project_disclosureNote = response.data.projectWork.disclosureNote,
                        this.quality.project_checkSuggestion = response.data.projectWork.checkSuggestion,
                        this.quality.project_dataName = response.data.projectWork.dataName,
                        this.quality.project_brief = response.data.projectWork.briefSummary,
                        this.quality.project_type = response.data.projectWork.projectType,
                        this.quality.project_workLoad = response.data.projectWork.workLoad,
                        this.quality.project_finishDateTime = response.data.projectWork.finishDateTime,
                        this.quality.project_startDateTime = response.data.projectWork.projectStartTime
                        this.quality.project_business = response.data.projectWork.projectBusiness,
                        this.quality.project_produce = response.data.projectWork.projectProduce,
                        this.quality.project_setup = response.data.projectPlan.projectSetUp
                        this.quality.project_projectNote = response.data.projectPlan.projectNote
                    }).catch(error =>{
                        reject(error.response)
                    })
                })
            },
            getBackData(){
                this.projectNo = this.$route.query.p_no
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'project/back/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        params:{
                            projectNo:this.projectNo,
                            groupId:this.groupId
                        }
                    }).then(response => {
                        resolve(response.data)
                        this.backNotes = response.data;
                    }).catch(error =>{
                        reject(error.response)
                    })
                })
            },
              addQualityUser(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'quality/user/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        data:{
                            projectNo:this.projectNo,
                            userAccount:this.useraccount
                        }
                    }).then(response => {
                        resolve(response.data)
                        this.backNotes = response.data;
                    }).catch(error =>{
                        reject(error.response)
                    })
                })
            },
            addQuality(){
                if(this.quality.qualityNote == null || this.quality.qualityScore == null){
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = '有必填项为空，请重新检查'
                    return false
                }
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'projectQuality/update/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        data:{
                            projectNo:this.projectNo,
                            checkSuggestion: this.quality.finalSuggestion,
                            qualityNote: this.quality.qualityNote,
                            qualityScore:this.quality.qualityScore,
                            userAccount:this.useraccount,
                            groupId:this.groupId
                        }
                    }).then(success=>{
                        if(this.putToOutPut){
                            this.snackbarColor = 'success'
                            this.snackbarText = '提交成功'
                            this.snackbar = true
                            this.putToOutput().then(success =>{
                                this.$router.push({name:'quality-management'});
                            }).catch(error =>{})
                            this.addQualityUser().then(success=>{}).catch(error=>{})
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
            putToWork(){
                this.groupIds.push(this.groupId)
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
                            groupsId:this.groupIds
                        }
                    }).then(success=>{
                        resolve(success.data)
                        setTimeout(_=>{
                            this.$router.push({name:'quality-management'})
                        },1000)
                    })
                })
            },
            putToOutput(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'project/stage/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        data:{
                            projectStage:5,
                            projectNo:this.projectNo
                        }
                    }).then(success=>{
                        resolve(success.data)
                        this.putFinishTime().then(success=>{}).catch(error=>{})
                        /*setTimeout(_=>{
                            this.$router.go(-1)
                        },1000)*/
                    })
                })
            },
             putFinishTime(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'projectQuality/time/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        data:{
                            groupId:this.groupId,
                            projectNo:this.projectNo
                        }
                    }).then(success=>{
                        resolve(success.data)
                    })
                })
            },
            putToApi(){
                if(this.quality.qualityNote == null || this.quality.qualityScore == null){
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = '有必填项为空，请重新检查'
                    return false
                } else if(this.self_permissions.includes('put_output') || this.self_permissions.includes('all_permission')){
                    this.putToOutPut = true
                    this.addQuality().then(success=>{}).catch(error=>{})
                } else{
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = '对不起，您的权限不够，不能提交到产值核算'
                    return false
                }
            },
            getSuggestion(){                                //获取最终检查意见快捷数据
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'shortcut/9/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                    }).then(success =>{
                        resolve(success.data)
                        this.suggestions = success.data
                    }).catch(error =>{
                        reject(error.response)
                    })
                })
            },
            getQuality(){                                //获取质量综述快捷数据
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'shortcut/10/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                    }).then(success =>{
                        resolve(success.data)
                        this.qualitys = success.data
                    }).catch(error =>{
                        reject(error.response)
                    })
                })
            },
            choosefinal(){
                if(this.quality.finalSuggestion == null){
                    this.quality.finalSuggestion = ''
                }
                this.quality.finalSuggestion += this.choosefinalS + ';'
            },
            chooseQuality(){
                if(this.quality.qualityNote == null){
                    this.quality.qualityNote = ''
                }
                this.quality.qualityNote += this.chooseNote + ';'

            },inputScore(){
                if(this.quality.qualityScore > 100){
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = '评分不能超过100'
                    this.quality.qualityScore = 100
                }
            },

            all(){
                this.infoPanel=[true],
                    this.planPanel=[true],
                    this.workPanel=[true],
                    this.qualityPanel=[true],
                    this.peoPanel=[true],
                    this.peoBack = [true]
            },
            none () {
                this.infoPanel=[false],
                    this.planPanel=[false],
                    this.workPanel=[false],
                    this.qualityPanel=[false],
                    this.peoPanel=[false],
                    this.peoBack = [false]
            },colseShowBackDialog(){
                this.backNote = ''
                this.showBackDialog = false
            },
            chooseExecute(){
            if(this.backNote == null){
                this.backNote = ''
            }
            this.backNote += this.chooseExecuteData + ';'
        },
         getExecuteStandard(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'shortcut/12/',
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
        },
        mounted(){
            this.getBackData().then(success=>{}).catch(error=>{})
            this.getQualityData().then(success=>{}).catch(error=>{})
            this.getSuggestion().then(success=>{}).catch(error=>{})
            this.getQuality().then(success=>{}).catch(error=>{})
            this.getExecuteStandard().then(success=>{}).catch(error=>{})
        }
    }
</script>
<style>
    .workCard{
        margin-left: 25px
    }
    .planCard{
        margin-left: 25px;
        margin-top: 25px
    }
    .qualityCard{
        margin-top: 25px
    }
    .cardInfo{
        margin-top: 25px
    }
    .v-textarea.v-text-field--enclosed .v-text-field__slot{
        height:60px
    }
    .bottomBtn{
        margin-top: 32px
    }    .titleInfo{
             font-size: 24px;
             text-align: center
         }
    .btnInfo{
        margin-top: 24px
    }
    .intputexa{
        margin: 24px
    }
</style>
