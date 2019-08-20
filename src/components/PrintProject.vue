<template>
    <v-container fluid>
        <div align="center" class="print">
            <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:16.0pt;font-family:黑体">测绘任务书及流程记录表</span></p>
            <div align="center">
            <table class="MsoNormalTable" border="1" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:none">
                <tbody><tr height="0">
                    <td width="84" style="width:80.0pt;border:none"></td>
                    <td width="84" style="width:80.0pt;border:none"></td>
                    <td width="50" style="width:50.0pt;border:none"></td>
                    <td width="50" style="width:50.0pt;border:none"></td>
                    <td width="50" style="width:50.0pt;border:none"></td>
                    <td width="89" style="width:80.0pt;border:none"></td>
                    <td width="89" style="width:80.0pt;border:none"></td>
                    <td width="50" style="width:50.0pt;border:none"></td>
                    <td width="89" style="width:80.0pt;border:none"></td>
                </tr>
                <tr>
                    <td style="border:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">项目名称</span></p>
                    </td>
                    <td colspan="5" style="border:solid black 1.0pt;border-left:none;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US">{{output.projectName}}</span></p>
                    </td>
                    <td colspan="1" style="border:solid black 1.0pt;border-left:none;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">项目编号</span></p>
                    </td>
                    <td colspan="2" style="border:solid black 1.0pt;border-left:none;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US">{{this.projectNo}}</span></p>
                    </td>
                </tr>
                <tr>
                    <td style="border-top:none;border-left:solid black 1.0pt;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">委托单位</span></p>
                    </td>
                    <td colspan="5" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US">{{output.projectAuthorize}}</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">项目类型</span></p>
                    </td>
                    <td colspan="2" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US">{{output.projectType}}</span></p>
                    </td>
                </tr>
                <tr style="height:42.15pt">
                    <td style="border:solid black 1.0pt;border-top:none;padding:5pt 8pt;height:42.15pt">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">执行标准</span></p>
                    </td>
                    <td colspan="8" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;height:42.15pt">
                        <p class="MsoNormal"><span lang="EN-US">{{output.projectExe}}</span></p>
                    </td>
                </tr>
                <tr style="height:30.95pt">
                    <td style="border:solid black 1.0pt;border-top:none;padding:5pt 8pt;height:30.95pt">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">作业内容</span></p>
                    </td>
                    <td colspan="8" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;height:30.95pt">
                        <p class="MsoNormal"><span lang="EN-US">{{output.projectWorkNote}}</span></p>
                    </td>
                </tr>
                <tr style="height:30.95pt">
                    <td style="border:solid black 1.0pt;border-top:none;padding:5pt 8pt;height:30.95pt">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">技术要求</span></p>
                    </td>
                    <td colspan="8" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;height:30.95pt">
                        <p class="MsoNormal"><span lang="EN-US">{{output.projectWorkRequire}}</span></p>
                    </td>
                </tr>
                <tr>
                    <td style="border:solid black 1.0pt;border-top:none;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">编写人</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US">{{output.projectWriter}}</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">日期</span></p>
                    </td>
                    <td colspan="2" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US"></span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">审核人</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US">{{output.projectCharge}}</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">日期</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US"></span></p>
                    </td>
                </tr>
                <tr style="height:35.5pt">
                    <td rowspan="2" style="border:solid black 1.0pt;border-top:none;padding:5pt 8pt;height:35.5pt">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">技术交<br>底内容</span></p>
                    </td>
                    <td colspan="8" style="border-top:none;border-left:none;border-bottom:none;border-right:solid black 1.0pt;padding:5pt 8pt;height:35.5pt">
                        <p class="MsoNormal"><span lang="EN-US">{{output.disclosureNote}}</span></p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:none;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">接受人签名</span></p>
                    </td>
                    <td colspan="6" style="border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US">&nbsp;</span></p>
                    </td>
                </tr>
                <tr style="height:49.45pt">
                    <td style="border:solid black 1.0pt;border-top:none;padding:5pt 8pt;height:49.45pt">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">过程检<br>查情况</span></p>
                    </td>
                    <td colspan="8" style="border:none;border-right:solid black 1.0pt;padding:5pt 8pt;height:49.45pt">
                        <p class="MsoNormal"><span lang="EN-US">{{output.checkSuggestion}}</span></p>
                    </td>
                </tr>
                <tr style="height:30.95pt">
                    <td style="border:solid black 1.0pt;border-top:none;padding:5pt 8pt;height:30.95pt">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">提交的成<br>果资料</span></p>
                    </td>
                    <td colspan="8" style="border-top:solid black 1.0pt;border-left:none;border-bottom:none;border-right:solid black 1.0pt;padding:5pt 8pt;height:30.95pt">
                        <p class="MsoNormal"><span lang="EN-US">{{output.dataName}}</span></p>
                    </td>
                </tr>
                <tr style="height:70.5pt">
                    <td rowspan="3" style="border-top:none;border-left:solid black 1.0pt;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;height:60.5pt">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">工作小结</span></p>
                    </td>
                    <td colspan="8" style="border-top:solid black 1.0pt;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;height:60.5pt">
                        <p class="MsoNormal"><span lang="EN-US" style="font-family:宋体">{{output.briefSummary}}</span></p>
                    </td>
                </tr>
                <tr>
                    <td style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">工作量</span></p>
                    </td>
                    <td colspan="7" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US" style="font-family:宋体">{{output.workLoad}}</span></p>
                    </td>
                </tr>
                <tr>
                    <td style="border:solid black 1.0pt;border-top:none;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">作业部门</span></p>
                    </td>
                    <td colspan="3" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US"> {{this.gName}}</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">项目负责人</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US">{{output.projectCharge}}</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">日期</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US"></span></p>
                    </td>
                </tr>
                <tr style="height:30.95pt">
                    <td style="border-top:none;border-left:solid black 1.0pt;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;height:30.95pt">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">最终检<br>查情况</span></p>
                    </td>
                    <td colspan="8" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;height:30.95pt">
                        <p class="MsoNormal"><span lang="EN-US"></span></p>
                    </td>
                </tr>
                <tr style="height:41.8pt">
                    <td style="border:solid black 1.0pt;border-top:none;padding:5pt 8pt;height:41.8pt">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">质量综述</span></p>
                    </td>
                    <td colspan="8" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;height:41.8pt">
                        <p class="MsoNormal"><span lang="EN-US">{{output.qualityNote}}</span></p>
                    </td>
                </tr>
                <tr>
                    <td style="border-top:none;border-left:solid black 1.0pt;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">质量得分</span></p>
                    </td>
                    <td style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US">{{output.qualityScore}}</span></p>
                    </td>
                    <td colspan="2" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">质量等级</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US">{{output.qualityLevel}}</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">最终检查员</span><span lang="EN-US"> </span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US"></span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">日期</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US"></span></p>
                    </td>
                </tr>
                <tr>
                    <td style="border-top:none;border-left:solid black 1.0pt;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">审定意见</span></p>
                    </td>
                    <td colspan="4" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US">{{this.examineNote}}</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">审定人</span><span lang="EN-US"> </span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US"></span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">日期</span></p>
                    </td>
                    <td colspan="1" style="border-top:none;border-left:none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal"><span lang="EN-US"></span></p>
                    </td>
                </tr>
                <tr>
                    <td style="border-top:none;border-left:solid black 1.0pt;border-bottom:solid black 1.0pt;border-right:solid windowtext 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" align="center" style="text-align:center"><span style="font-size:9.0pt;font-family:黑体">备注</span></p>
                    </td>
                    <td colspan="8" style="border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid black 1.0pt;padding:5pt 8pt;">
                        <p class="MsoNormal" style="margin-bottom:3.1pt"><span lang="EN-US">=&nbsp;</span></p>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" style="border:none"><p class="MsoNormal" align="center" style="text-align:left;"><span lang="EN-US" style="font-size:9.0pt">测绘任务书及流程记录表&nbsp;</span></p></td>
                    <td colspan="5" style="border:none"><p class="MsoNormal" align="center" style="text-align:right;"><span lang="EN-US" style="font-size:9.0pt">汕头市杰信测绘有限公司&nbsp;</span></p></td>
                </tr>
                </tbody></table>
            </div>
        </div>
    </v-container>

</template>

<script>
    import store from '@/store.js'
    import { error } from 'util';
    export default {
        data:()=>({
            examineNote:'',
            items:[],
            projectNo:'',
            type_id:'',
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
                shortDateTime:'',
                lastDateTime:'',
                projectBegunDate:'',
                projectWorkLoad:'',
                projectOutPut:'',
                projectOutPutNote:'',
                workName:'',
                outputList:[],
            },
            gName:'',
            type:[],
            snackbar:false,
            snackbarColor:'',
            snackbarText:'',
            snackbarTimeout:2000,
        }),
        methods:{
            back(){
                this.type_id = this.$route.query.type_id
                if(this.type_id==1){
                    this.$router.push({path:'/projectwork-management'})
                    window.location.reload()
                }else if(this.type_id == 2){
                    this.$router.push({path:'/authorize-management'})
                    window.location.reload()
                }else if(this.type_id == 3){
                    this.$router.push({path:'/project-management'})
                    window.location.reload()
                }

            },
            doPrint(){
                var newstr = document.getElementsByClassName('print')[0].innerHTML;
                document.body.innerHTML = newstr
                window.print()
                this.back()
            },
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
                            this.output.shortDateTime = success.data.shortDateTime,
                            this.output.lastDateTime = success.data.lastDateTime,
                            this.output.projectBegunDate = success.data.projectBegunDate,
                            this.output.projectWorkLoad = success.data.projectWorkLoad,
                            this.output.projectOutPut = success.data.projectOutPut,
                            this.output.projectOutPutNote = success.data.projectOutPutNote,
                            this.output.workName = success.data.workName,
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
            getWorkName(){
                return new Promise((resolve,reject)=>{
                this.projectNo = this.$route.query.p_no
                axios({
                    method:'GET',
                    url:'projectWorkName/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                    params:{
                        projectNo:this.projectNo
                    }
                }).then(success=>{
                    let name = ''
                    success.data.forEach((item) =>{
                        name += item + ' '
                    })
                    this.gName = name
                }).catch(error=>{

                })
                })
                },
            //保留小数点后两位的过滤器，尾数不四舍五入
            numFilter(value) {
                // 截取当前数据到小数点后三位
                let tempVal = parseFloat(value).toFixed(3)
                let realVal = tempVal.substring(0,  tempVal.length - 1)
                return realVal
            }

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
            this.getAuthorize().then(success=>{}).catch(error=>{})
            this.getTypeData().then(success=>{}).catch(error=>{})
            this.getWorkName().then(success=>{}).catch(error=>{})
        },
        mounted(){
            this.getAuthorize().then(success=>{}).catch(error=>{})
            this.getTypeData().then(success=>{}).catch(error=>{})
            this.getWorkName().then(success=>{}).catch(error=>{})
            setTimeout(_=>{
                this.doPrint().then(success=>{

                }).catch(error=>{})
            },1000)
        }
    }
</script>
