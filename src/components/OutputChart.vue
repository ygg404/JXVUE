<template>
    <v-container fluid>
        <v-card width="100%">
            <v-card-title>
                <el-date-picker
                        v-model="startDate"
                        type="month" clearable
                        placeholder="起始月份">
                </el-date-picker> --
                <el-date-picker
                        v-model="endDate"
                        type="month" clearable
                        placeholder="结束月份">
                </el-date-picker>

                <v-flex xs12 sm6 md2 style="margin-left: 20px;">
                    <v-select v-model="selectWorkId2" :items="workIds" attach chips label="作业组:" value="全部"
                              item-value="id" item-text="gName" @change="idData"></v-select>
                </v-flex>
                <v-flex xs12 sm6 md2>
                    <v-btn slot="activator" @click="doPrint" color="primary" dark class="mb-2">打印</v-btn>
                </v-flex>
                <!--<v-layout row wrap style="display: flex;flex-wrap: wrap">-->

                    <!--<el-date-picker v-model="chooseDate3" type="daterange" @change="refreshData" range-separator="至"-->
                                    <!--start-placeholder="开始日期" end-placeholder="结束日期"-->
                                    <!--align="right"></el-date-picker>-->

                <!--</v-layout>-->
            </v-card-title>
            <div class="print">
                <h1 style="text-align: center">产值统计表</h1>
                <h3 style="text-align: center">{{tabTitle}}</h3>

                <div v-if="items.length>1">
                    <v-data-table :headers="headers" :items="items" :loading="loading" hide-actions>
                        <template slot="items" slot-scope="props" v-if="props.item.planRateList.length > 0">
                            <tr>
                                <td colspan="5"><b>{{props.item.gName}}</b></td>
                            </tr>
                            <tr v-for="pr in props.item.planRateList" :key="pr.id">
                                <td style="max-width: 280px;">{{pr.projectName}}</td>
                                <td style="min-width: 120px;">{{pr.startDateTime.replace(' 00:00:00' , '')}}</td>
                                <td style="min-width: 120px;">{{pr.finishDateTime.replace(' 00:00:00' , '')}}</td>
                                <td>{{pr.outputNum.toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td><b>{{props.item.gName}}合计{{props.item.projectSum}}个项目</b></td>
                                <td></td>
                                <td></td>
                                <td><b>{{props.item.outPutNum.toFixed(2)}}</b></td>
                            </tr>
                            <tr v-if="props.item.showFooter">
                                <td><b>总合计{{projectSums}}个项目</b></td>
                                <td></td>
                                <td></td>
                                <td><b>{{outputNumSum.toFixed(2)}}</b></td>
                            </tr>
                        </template>
                    </v-data-table>
                </div>
                <div v-else>
                    <v-data-table :headers="headers" :items="items" :loading="loading" hide-actions>
                        <template slot="items" slot-scope="props"  v-if="props.item.planRateList.length > 0">
                            <tr>
                                <td colspan="5"><b>{{props.item.gName}}</b></td>
                            </tr>
                            <tr v-for="pr in props.item.planRateList" :key="pr.id">
                                <td>{{pr.projectName}}</td>
                                <td style="min-width: 120px;">{{pr.startDateTime.replace(' 00:00:00' , '')}}</td>
                                <td style="min-width: 120px;">{{pr.finishDateTime}}</td>
                                <td>{{pr.outputNum.toFixed(2)}}</td>
                            </tr>
                        </template>
                        <template v-slot:footer>
                            <td><b>总合计{{projectSums}}个项目</b></td>
                            <td></td>
                            <td></td>
                            <td><b>{{outputNumSum.toFixed(2)}}</b></td>
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

    export default {
        data() {
            return {
                chooseDate3: [],
                loading: false,
                items: [],
                selectWorkId2: 0,
                workIds: [],
                headers: [
                    {text: '项目名称', value: 'projectName'},
                    {text: '启动时间', value: 'startDateTime'},
                    {text: '完成时间', value: 'finishDateTime'},
                    {text: '产值', value: 'outputNum'}
                ],
                startDate: '', //开始日期
                endDate: '', // 结束日期
                projectSums:0, //总项目数
                outputNumSum: 0, //总产值
                aa:[],
                tabTitle:'',//列表标题
            }
        },
        methods: {
            doPrint(){
                var newstr = document.getElementsByClassName('print')[0].innerHTML;
                document.body.innerHTML = newstr
                window.print()
                // 重新加载页面，以刷新数据
                window.location.reload()
            },
            getOutputChartFromApi() {
                let start = moment(this.startDate).format('YYYY-MM-DD');
                let end = new Date(  this.endDate.getFullYear(), this.endDate.getMonth() + 1, 0 ) ;
                end = moment(end).format('YYYY-MM-DD')
                //let end = endDate.getFullYear() + '-' + (endDate.getMonth()+1)<10? '0'+(endDate.getMonth()+1): (endDate.getMonth()+1) +  '-01';
                return new Promise((resoleve, reject) => {
                    this.loading = true;
                    axios({
                        methods: 'GET',
                        url: 'outputcharts/',
                        params: {
                            startDate: start,
                            endDate: end,
                            workId: this.selectWorkId2
                        },
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response => {


                        this.loading = false;
                        this.projectSums = 0;
                        this.outputNumSum = 0;

                        response.data.forEach((item) => {
                            if(item.projectSum > 0){
                                response.data.forEach((tem) => {
                                    if(tem.gName == item.gName){
                                        tem.showFooter = true;
                                    }else {tem.showFooter = false;}
                                });
                            }
                            this.projectSums = this.projectSums + item.projectSum;
                            this.outputNumSum = this.outputNumSum + item.outPutNum;
                        });
                        this.items = response.data;
                        resoleve(response.data)

                    }).catch(error => {
                        this.loading = false;
                        reject(error.response.data)
                    })
                })
            },
            getWorkIdsFromApi() {
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'GET',
                        url: 'workGroups/',
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(response => {
                        resolve(response)
                    }).catch(errpr => {
                        reject(error.response)
                    })
                })
            },
            refreshData() {
                // 格式日期
                this.startDate = moment(this.chooseDate3[0]).format('YYYY-MM-DD');
                this.endDate = moment(this.chooseDate3[1]).format('YYYY-MM-DD');
                this.chooseDate = [this.startDate ,this.endDate ];
                this.projectSums=0      //项目总数
                this.outputNumSum= 0 //总产值
                // 刷新数据
                this.getOutputChartFromApi();
            },
            idData() {
                // 刷新数据
                this.projectSums=0      //项目总数
                this.outputNumSum= 0 //总产值
                this.getOutputChartFromApi();
            },
            // 初始化年月日
            getDate() {

                this.startDate = new Date(new Date().getFullYear(), new Date().getMonth() -1 , 1);
                this.endDate = new Date(new Date().getFullYear(), new Date().getMonth() -1 , 1);

            },
            //列表标题设定
            setTabTitle(){
                if(this.startDate.getFullYear() == this.endDate.getFullYear() && this.startDate.getMonth() == this.endDate.getMonth()){
                    this.tabTitle = this.startDate.getFullYear() + '年' + (this.startDate.getMonth()+ 1) + '月';
                }else{
                    this.tabTitle = this.startDate.getFullYear() + '年' + (this.startDate.getMonth()+ 1) + '月' + '至' +
                                    this.endDate.getFullYear() + '年' + (this.endDate.getMonth()+ 1) + '月'
                }
            }
        },
        mounted() {
            this.getDate();
            this.getOutputChartFromApi();
            this.getWorkIdsFromApi()
                .then(success => {
                    this.workIds = success.data
                    let ab = {gName: '全部', id: 0};
                    this.workIds.unshift(ab);
                });
        },
        watch: {
            selectWorkId2: {
                header() {
                    this.getWorkIdsFromApi()
                        .then(data => {
                            this.items = data.data
                        })
                }
            },
            chooseDate3: {
                handler(newName, oldName) {
                    if (newName === null) {
                        // 刷新数据
                        this.getDate();
                        this.projectSums=0      //项目总数
                        this.outputNumSum= 0 //总产值
                        this.getOutputChartFromApi();
                    }
                }
            },
            startDate:{
                handler(val){
                    this.startDate = val;
                    this.endDate = val;
                    this.setTabTitle();
                    this.getOutputChartFromApi();
                    console.log(val);
                }
            },
            endDate:{
              handler(val){
                  this.endDate = val;
                  if(val < this.startDate){this.startDate = val;}
                  this.setTabTitle();
                  this.getOutputChartFromApi();

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
