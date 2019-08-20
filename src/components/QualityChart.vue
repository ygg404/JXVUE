<template>
    <v-container fluid>
        <v-card width="100%">
            <v-card-title>
                <v-layout row wrap style="display: flex;flex-wrap: wrap">
                    <el-date-picker v-model="chooseDate6" type="daterange" @change="refreshData" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
                    <v-flex xs12 sm6 md2><v-select v-model="selectWorkId" @change="idData" :items="workIds" attach chips label="作业组:" value="全部" item-value="id" item-text="gName">
                    </v-select></v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-btn slot="activator" @click="doPrint" color="primary" dark class="mb-2">打印</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-title>
            <div class="print">
                <h1 style="text-align: center">质量统计表</h1>
                <h3 style="text-align: center">{{startDate}}至{{endDate}}</h3>
                <div v-if="items.length>1">
                    <v-data-table :headers="headers" :items="items" :loading="loading" hide-actions>
                        <template slot="items" slot-scope="props" v-if="props.item.workGroupList.length > 0">
                            <tr>
                                <td colspan="5"><b>{{props.item.gName}}</b></td>
                            </tr>
                            <tr v-for="w in props.item.workGroupList" :key="w.id">
                                <td>{{w.projectName}}</td>
                                <td>{{w.quality_score}}</td>
                                <td>{{w.quality_level}}</td>
                                <td>{{w.userName}}</td>
                                <td>{{w.qUserName}}</td>
                                <td>{{w.cUserName}}</td>
                            </tr>
                            <tr>
                                <td><b>{{props.item.gName}}合计</b></td>
                                <td></td>
                                <td colspan="2"><b>优：{{props.item.excellent}}项；
                                    良：{{props.item.good}}项；合格：{{props.item.qualified}}项；
                                    优良项目个数：{{props.item.excellent_number}}；项目总数：
                                    {{props.item.projectSum}}；优良率：{{props.item.excellent_rate}}</b></td>
                            </tr>
                        </template>
                        <template v-slot:footer>
                            <td><b>质量合计</b></td>
                            <td></td>
                            <td><b>优：{{excellentSum}}项；
                                良：{{goodSum}}项；合格：{{qualifiedSum}}项；
                                优良项目个数：{{excellentumberSum}}；项目总数：
                                {{projectSum}}；优良率：{{excellentRateSum}}%</b></td>
                        </template>
                    </v-data-table>
                </div>
                <div v-else>
                    <v-data-table :headers="headers" :items="items" :loading="loading" hide-actions>
                        <template slot="items" slot-scope="props" v-if="props.item.workGroupList.length > 0">
                            <tr>
                                <td colspan="5"><b>{{props.item.gName}}</b></td>
                            </tr>
                            <tr v-for="w in props.item.workGroupList" :key="w.id">
                                <td>{{w.projectName}}</td>
                                <td>{{w.quality_score}}</td>
                                <td>{{w.quality_level}}</td>
                                <td>{{w.userName}}</td>
                                <td>{{w.qUserName}}</td>
                                <td>{{w.cUserName}}</td>
                            </tr>
                        </template>
                        <template v-slot:footer>
                            <td><b>质量合计</b></td>
                            <td></td>
                            <td><b>优：{{excellentSum}}项；
                                良：{{goodSum}}项；合格：{{qualifiedSum}}项；
                                优良项目个数：{{excellentumberSum}}；项目总数：
                                {{projectSum}}；优良率：{{excellentRateSum}}%</b></td>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </v-card>
    </v-container>
</template>


<script>
    import store from '@/store.js'
    import moment from 'moment'
    export default{
        data(){
            return {
                startDate:'',
                chooseDate6:[],
                endDate:'',
                loading:false,
                items:[],
                selectWorkId:0,
                workIds:[],
                headers:[
                    {text:'项目名称',value:'projectName',sortable:false},
                    {text:'质量评分',value:'quality_score',sortable:false},
                    {text:'质量等级',value:'quality_level',sortable:false},
                    {text:'项目负责人',value:'quality_level',sortable:false},
                    {text:'质检员',value:'quality_level',sortable:false},
                    {text:'质量审核人',value:'quality_level',sortable:false}
                ],
                excellentSum:0, //优总数
                goodSum: 0,     //良总数
                qualifiedSum: 0,   //合格总数
                excellentumberSum:0,    //优良项目总数
                projectSum: 0,      //项目总数
                excellentRateSum: 0,    //总优良率
                aa:[]
            }
        },
        methods:{
            doPrint(){
                var newstr = document.getElementsByClassName('print')[0].innerHTML;
                document.body.innerHTML = newstr
                window.print()
                // 重新加载页面，以刷新数据
                window.location.reload()
            },
            getQualityChartFromApi(){
                return new Promise((resoleve,reject) =>{
                    this.loading = true
                    axios({
                        methods:'GET',
                        url:'quality_chart/',
                        params:{
                            startDate: this.startDate,
                            endDate: this.endDate,
                            workId: this.selectWorkId
                        },
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        this.loading = false
                        resoleve(response.data)
                        console.log(response.data)
                        this.items = response.data;
                        response.data.forEach((item) => {
                            this.excellentSum = this.excellentSum + item.excellent;
                            this.goodSum = this.goodSum + item.good;
                            this.qualifiedSum = this.qualifiedSum + item.qualified;
                            this.excellentumberSum = this.excellentumberSum + item.excellent_number;
                            this.projectSum = this.projectSum + item.projectSum;
                        })
                        if(this.projectSum > 0 ){
                            this.excellentRateSum = this.excellentumberSum/this.projectSum*100;
                        } else{
                            this.excellentRateSum = 0;
                        }

                    }).catch(error=>{
                        this.loading = false,
                            reject(error.response.data)
                    })
                })
            },
            getWorkIdsFromApi(){
                return new Promise((resolve,reject)=>{
                    axios({
                        method:'GET',
                        url:'workGroups/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(response=>{
                        resolve(response)
                    }).catch(errpr=>{
                        reject(error.response)
                    })
                })
            },
            refreshData() {
                // 格式日期
                this.startDate = moment(this.chooseDate6[0]).format('YYYY-MM-DD');
                this.endDate = moment(this.chooseDate6[1]).format('YYYY-MM-DD');
                this.excellentSum=0 //优总数
                this.goodSum=0    //良总数
                this.qualifiedSum=0  //合格总数
                this.excellentumberSum=0    //优良项目总数
                this.projectSum=0      //项目总数
                this.excellentRateSum=0  //总优良率
                // 刷新数据
                this.getQualityChartFromApi();
            },
            idData() {
                // 刷新数据
                this.excellentSum=0 //优总数
                this.goodSum=0    //良总数
                this.qualifiedSum=0  //合格总数
                this.excellentumberSum=0    //优良项目总数
                this.projectSum=0      //项目总数
                this.excellentRateSum=0  //总优良率
                this.getQualityChartFromApi();
            },
            // 初始化年月日
            getDate() {
                let myDate = new Date();
                let year = myDate.getFullYear(); //年
                let month;
                if(myDate.getMonth() >= 1){
                    month = myDate.getMonth()+1; //月
                }
                if(myDate.getMonth() == 12) {
                    month = 1;
                }
                let date = myDate.getDate();// 日
                if(month > 12) {
                    month = month - 12;
                    year = year + 1;
                }
                this.aa =[ `${year}-${month-1}-01`, `${year}-${month}-${date}` ];
                this.startDate = moment(this.aa[0]).format('YYYY-MM-DD');
                this.endDate = moment(this.aa[1]).format('YYYY-MM-DD');
            }
        },
        mounted(){
            this.getDate();
            this.getQualityChartFromApi();
            this.getWorkIdsFromApi()
                .then(success =>{
                    this.workIds = success.data
                    let ab = {gName: '全部',id: 0};
                    this.workIds.unshift(ab);
                });
        },
        watch:{
            selectWorkId:{
                header(){
                    this.getWorkIdsFromApi()
                        .then(data => {
                            this.items = data.data
                        })
                }
            },
            chooseDate6:{
                handler(newName, oldName) {
                    if (newName === null) {
                        // 刷新数据
                        this.excellentSum=0 //优总数
                        this.goodSum=0    //良总数
                        this.qualifiedSum=0  //合格总数
                        this.excellentumberSum=0    //优良项目总数
                        this.projectSum=0      //项目总数
                        this.excellentRateSum=0  //总优良率
                        /*this.startDate = '';
                        this.endDate = '';*/
                        this.getDate();
                        this.getQualityChartFromApi();
                    }
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
        margin-top: 20px!important;
        margin-right: 20px!important;
    }
    .mb-2 {
        margin-top: 20px!important;
    }
</style>
