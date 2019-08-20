<template>
    <v-container fluid>
        <v-layout align-center justify-center column fill-height>
            <v-expansion-panel v-model="infoPanel" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>项目基本信息</h3>
                    </template>
                    <v-card color="grey lighten-4">
                        <v-layout>
                            <v-flex>
                                <v-card-text class="subheading">项目名称:{{output.projectName}}</v-card-text>
                                <v-card-text class="subheading">委托单位:{{output.projectAuthorize}}</v-card-text>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        委托要求:{{output.projectNote}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">联系人:{{output.projectUserName}}</v-card-text>
                                <v-card-text class="subheading">联系电话:{{output.projectPhone}}</v-card-text>
                                <v-card-text class="subheading">项目启动时间:{{output.projectStartTime}}</v-card-text>
                                  <v-card-text class="subheading">
                                    <blockquote>
                                        质量等级:{{output.qualityLevel}}
                                    </blockquote></v-card-text>
                                         <v-card-text class="subheading">
                                    项目负责人:{{output.projectCharge}}</v-card-text>
                                <!-- <v-card-text class="subheading">项目类型:{{output.projectType}}</v-card-text> -->
                            </v-flex>
                           
                            
                                
                            <v-flex>
                                <!-- <v-card-text class="subheading">项目阶段:{{output.projectStage}}</v-card-text> -->
                                    <v-card-text class="subheading">
                                    <blockquote>
                                        作业内容:{{output.projectWorkNote}}
                                    </blockquote></v-card-text>

                                    <v-card-text class="subheading">
                                    <blockquote>
                                        工作小结:{{output.briefSummary}}
                                    </blockquote></v-card-text>
                                     <v-card-text class="subheading">
                                    <blockquote>
                                        过程检查意见:{{output.checkSuggestion}}
                                    </blockquote></v-card-text>
                                     <v-card-text class="subheading">
                                    <blockquote>
                                        工作量:{{output.workLoad}}
                                    </blockquote></v-card-text>
                                    <v-card-text class="subheading">
                                    <blockquote>
                                        上交资料:{{output.dataName}}
                                    </blockquote></v-card-text>
                                    <v-card-text class="subheading">项目完成时间:{{output.projectEndTime}}</v-card-text>
                                    <v-card-text class="subheading">
                                    <blockquote>
                                        质量综述:{{output.qualityNote}}
                                    </blockquote></v-card-text>
                                    <v-card-text class="subheading">
                                    业务负责人:{{output.projectBusiness}}</v-card-text>
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
                                        执行标准:{{output.projectExe}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        作业内容:{{output.projectWorkNote}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        技术要求:{{output.projectWorkRequire}}
                                    </blockquote></v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel> -->

            <!-- <v-expansion-panel v-model="workPanel" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>项目作业信息</h3>
                    </template>
                    <v-card color="grey lighten-4">
                        <v-layout>
                            <v-flex>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        技术交底内容:{{output.disclosureNote}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        过程检查意见:{{output.checkSuggestion}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        上交资料:{{output.dataName}}
                                    </blockquote></v-card-text>
                            </v-flex>
                            <v-flex>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        工作小结:{{output.briefSummary}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        工作量:{{output.workLoad}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">项目完成时间:{{output.projectEndTime}}</v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel> -->

            <!-- <v-expansion-panel v-model="qualityPanel" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>质量检查信息</h3>
                    </template>
                    <v-card color="grey lighten-4">
                        <v-layout>
                            <v-flex>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        质量评分:{{output.qualityScore}}
                                    </blockquote></v-card-text>
                                <v-card-text class="subheading">
                                    <blockquote>
                                        质量等级:{{output.qualityLevel}}
                                    </blockquote></v-card-text>
                            </v-flex>
                            <v-flex> -->
                                <!-- <v-card-text class="subheading">
                                    <blockquote>
                                        质量检查意见:{{output.qualitySuggestion}}
                                    </blockquote></v-card-text> -->
                                    
                                <!-- <v-card-text class="subheading">
                                    <blockquote>
                                        质量综述:{{output.qualityNote}}
                                    </blockquote></v-card-text>
                            </v-flex>
                            
                        </v-layout>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel> -->
<!-- 
            <v-expansion-panel v-model="peoPanel" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>负责人信息</h3>
                    </template>
                    <v-card color="grey lighten-4">
                        <v-layout>
                            <v-flex>
                                <v-card-text class="subheading">
                                    项目立项人:{{output.projectSetup}}</v-card-text>
                                <v-card-text class="subheading">
                                    项目负责人:{{output.projectCharge}}</v-card-text>
                                <v-card-text class="subheading">
                                    业务负责人:{{output.projectBusiness}}</v-card-text>
                                <v-card-text class="subheading">
                                    生产负责人:{{output.projectProduce}}</v-card-text>
                            </v-flex>
                            <v-flex>
                                <v-card-text class="subheading">
                                    项目负责人:{{output.projectCharge}}</v-card-text>
                                <v-card-text class="subheading">
                                    编写人:{{output.projectWriter}}</v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel> -->

            <!-- <v-expansion-panel v-model="workOutput" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>工作产值</h3>
                    </template>
                    <v-card class="chooseCard">
                        <v-card-text>
                            <v-data-table :headers="headers" hide-actions :items="output.outputList">
                                <template slot="items" slot-scope="props">
                                    <td>{{props.item.typeName}}</td>
                                    <td>{{props.item.typeUnit}}</td>
                                    <td>{{props.item.typeOutput}}</td>
                                    <td>{{props.item.projectRatio}}</td>
                                    <td>{{props.item.workLoad}}</td>
                                    <td>{{props.item.typeOut}}</td>
                                </template>
                                <template v-slot:footer>
                                    <td>
                                        <strong>总产值：</strong>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><strong>{{countOut}}</strong></td>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel> -->
            <v-expansion-panel v-model="Validation" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>审定意见</h3>
                    </template>
                    <v-layout class="intputexa"><v-textarea outline name="input-7-4" v-model="examineNote" label="请输入审定内容"></v-textarea></v-layout>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-layout>

        <v-layout  align-start justify-end fill-height class="btnInfo">
            <v-btn @click="all">展开</v-btn>
            <v-btn @click="none">收起</v-btn>
        </v-layout>

        <v-layout align-start justify-end fill-height class="btnInfo">
            <v-btn color="success" @click="adduthorize">保存</v-btn>
            <v-btn color="info" @click="ToApproved">审定完成</v-btn>
            <v-btn color="orange" class="white--text" @click="$router.go(-1)">返回</v-btn>
        </v-layout>

        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
            {{snackbarText}}
        </v-snackbar>
    </v-container>
</template>
<script>
    import store from '@/store.js'
    import { error } from 'util';
    export default {
        data:()=>({
            puttoApproved:false,
            examineNote:'',
            items:[],
            projectNo:'',
            infoPanel:[false],
            planPanel:[false],
            workPanel:[false],
            qualityPanel:[false],
            peoPanel:[false],
            workOutput:[false],
            Validation:[true],
            chooseType:[],
            info:1,
            output:{
                projectName:'',
                projectType:'',
                projectAuthorize:'',
                projectNote:'',
                projectUserName:'',
                projectPhone:'',
                projectCharge:'',
                projectSetup:'',
                projectWriter:'',
                projectBusiness:'',
                projectProduce:'',
                projectStartTime:'',
                projectEndTime:'',
                projectStage:'',
                projectExe:'',
                projectWorkNote:'',
                projectWorkRequire:'',
                disclosureNote:'',
                checkSuggestion:'',
                dataName:'',
                briefSummary:'',
                workLoad:'',
                qualityNote:'',
                qualitySuggestion:'',
                qualityScore:'',
                qualityLevel:'',
                outputList:[],
            },
            headers:[
                {text:'作业类型',sortable:false},
                {text:'工作量单位',sortable:false},
                {text:'单位产值',sortable:false},
                {text:'难度系数',sortable:false},
                {text:'工作量',sortable:false},
                {text:'产值',sortable:false}
            ],
            type:[],
            snackbar:false,
            snackbarColor:'',
            snackbarText:'',
            snackbarTimeout:2000,
        }),
        methods:{
            getAuthorize(){
                return new Promise((resolve,reject)=>{
                    this.projectNo = this.$route.query.p_no
                    axios({
                        method:'GET',
                        url:'project/output/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        params:{
                            projectNo:this.projectNo
                        }
                    }).then(success=>{
                        this.output.projectName = success.data.projectName,
                            this.output.projectType = success.data.projectType,
                            this.output.projectAuthorize = success.data.projectAuthorize,
                            this.output.projectNote = success.data.projectNote,
                            this.output.projectUserName = success.data.projectUserName,
                            this.output.projectPhone = success.data.projectPhone,
                            this.output.projectCharge = success.data.projectCharge,
                            this.output.projectSetup = success.data.projectSetup,
                            this.output.projectWriter = success.data.projectWriter,
                            this.output.projectBusiness = success.data.projectBusiness,
                            this.output.projectProduce = success.data.projectProduce,
                            this.output.projectStartTime = success.data.projectStartTime,
                            this.output.projectEndTime = success.data.projectEndTime,
                            this.output.projectStage = success.data.projectStage,
                            this.output.projectExe = success.data.projectExe,
                            this.output.projectWorkNote = success.data.projectWorkNote,
                            this.output.projectWorkRequire = success.data.projectWorkRequire,
                            this.output.disclosureNote = success.data.disclosureNote,
                            this.output.checkSuggestion = success.data.checkSuggestion,
                            this.output.dataName = success.data.dataName,
                            this.output.briefSummary = success.data.briefSummary,
                            this.output.workLoad = success.data.workLoad,
                            this.output.qualityNote = success.data.qualityNote,
                            this.output.qualitySuggestion = success.data.qualitySuggestion,
                            this.output.qualityScore = success.data.qualityScore,
                            this.output.qualityLevel = success.data.qualityLevel,
                            this.examineNote = success.data.examineNote
                        success.data.outputList.forEach(element => {
                            element.choosedItem = true
                            element.typeOutput = 0
                            element.typeOut = 0
                            element.typeUnit = ''
                            element.typeName = ''
                        })
                        this.output.outputList = success.data.outputList
                    }).catch(error=>{

                    })
                })
            },
            getTypeData(){
                return new Promise((resolve,reject)=>{
                    axios({
                        method:'GET',
                        url:'workType/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(success=>{
                        success.data.forEach(element=>{
                            element.choosedItem = false
                        })
                        this.types = success.data
                        this.output.outputList.forEach(e=>{
                            if(e.choosedItem){
                                this.types.forEach(t=>{
                                    if(e.typeId == t.id){
                                        e.typeOutput = t.typeOutput
                                        e.typeName = t.typeName
                                        e.typeUnit = t.typeUnit
                                        e.typeOut = this.numFilter(e.workLoad * e.projectRatio * e.typeOutput)
                                    }
                                })
                            }
                        })
                    }).catch(error=>{

                    })
                })
            },
            all(){
                this.infoPanel=[true],
                    this.planPanel=[true],
                    this.workPanel=[true],
                    this.qualityPanel=[true],
                    this.peoPanel=[true],
                    this.workOutput=[true],
                    this.Validation=[true]
            },
            none () {
                this.infoPanel=[false],
                    this.planPanel=[false],
                    this.workPanel=[false],
                    this.qualityPanel=[false],
                    this.peoPanel=[false],
                    this.workOutput=[false],
                    this.Validation=[true]
            },
            //保存审定意见
            adduthorize(){
                if(this.examineNote == null){
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = '有必填项为空，请重新检查'
                    return false
                }
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'PUT',
                        url:'projectSetUp/',
                        headers:{
                            Authorization: "Bearer " +sessionStorage.getItem('token')
                        },
                        data:{
                            examineNote: this.examineNote,
                            projectNo:this.projectNo,
                        }
                    }).then(response =>{
                    if(this.puttoApproved){
                        this.snackbarColor = 'success'
                        this.snackbarText = '提交成功'
                        this.snackbar = true
                        this.putToApproved().then(success=>{}).catch(error=>{})
                    }else{
                        this.snackbarColor = 'success'
                        this.snackbarText = '保存成功'
                        this.snackbar = true
                    }
                    }).catch(error =>{
                        this.snackbar = true
                        this.snackbarColor = 'error'
                        this.snackbarText = error.response.data.message
                    })
                })
            },
            //修改项目阶段
            putToApproved(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'project/stage/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        data:{
                            projectStage:9,
                            projectNo:this.projectNo
                        }
                    }).then(success=>{
                        resolve(success.data)
                        setTimeout(_=>{
                            this.$router.go(-1)
                        },1000)
                    })
                })
            },
            //保留小数点后两位的过滤器，尾数不四舍五入
            numFilter(value) {
                // 截取当前数据到小数点后三位
                let tempVal = parseFloat(value).toFixed(3)
                let realVal = tempVal.substring(0,  tempVal.length - 1)
                return realVal
            },
            //提交到已审定
            ToApproved(){
                if(this.examineNote == ""){
                    this.snackbar = true
                    this.snackbarColor = 'error'
                    this.snackbarText = '有必填项为空，请重新检查'
                    return false
                }else{
                    this.puttoApproved = true;
                    this.adduthorize().then(success=>{}).catch(error=>{})
                }
            },

        },
        computed: {
            countOut(){
                let count = 0.0
                this.output.outputList.forEach(e=>{
                    if(e.choosedItem){
                        count += parseFloat(e.typeOut)
                    }
                })
                return this.numFilter(count)
            }
        },
        created(){
            this.getTypeData().then(success=>{}).catch(error=>{})
        },
        mounted(){
            this.getAuthorize().then(success=>{}).catch(error=>{})
        }
    }
</script>
<style>
    .titleInfo{
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

