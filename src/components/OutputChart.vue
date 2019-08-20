<template>
    <v-container fluid>
        <v-card width="100%">
            <v-card-title>
                <v-layout row wrap style="display: flex;flex-wrap: wrap">
                    <el-date-picker v-model="chooseDate3" type="daterange" @change="refreshData" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期"
                                    align="right"></el-date-picker>
                    <v-flex xs12 sm6 md2>
                        <v-select v-model="selectWorkId2" :items="workIds" attach chips label="作业组:" value="全部"
                                  item-value="id" item-text="gName" @change="idData"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-btn slot="activator" @click="doPrint" color="primary" dark class="mb-2">打印</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-title>
            <div class="print">
                <h1 style="text-align: center">产值统计表</h1>
                <h3 style="text-align: center">{{startDate}}至{{endDate}}</h3>

                <div v-if="items.length>1">
                    <v-data-table :headers="headers" :items="items" :loading="loading" hide-actions>
                        <template slot="items" slot-scope="props" v-if="props.item.planRateList.length > 0">
                            <tr>
                                <td colspan="4"><b>{{props.item.gName}}</b></td>
                            </tr>
                            <tr v-for="pr in props.item.planRateList" :key="pr.id">
                                <td>{{pr.projectName}}</td>
                                <td>{{pr.projectType}}</td>
                                <td>{{pr.finishDateTime}}</td>
                                <td>{{pr.outputNum.toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td><b>{{props.item.gName}}合计{{props.item.projectSum}}个项目</b></td>
                                <td></td>
                                <td></td>
                                <td><b>{{props.item.outPutNum.toFixed(2)}}</b></td>
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
                <div v-else>
                    <v-data-table :headers="headers" :items="items" :loading="loading" hide-actions>
                        <template slot="items" slot-scope="props"  v-if="props.item.planRateList.length > 0">
                            <tr>
                                <td colspan="4"><b>{{props.item.gName}}</b></td>
                            </tr>
                            <tr v-for="pr in props.item.planRateList" :key="pr.id">
                                <td>{{pr.projectName}}</td>
                                <td>{{pr.projectType}}</td>
                                <td>{{pr.finishDateTime}}</td>
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
                    {text: '项目类型', value: 'projectType'},
                    {text: '完成时间', value: 'finishDateTime'},
                    {text: '产值', value: 'outputNum'}
                ],
                startDate: '', //开始日期
                endDate: '', // 结束日期
                projectSums:0, //总项目数
                outputNumSum: 0, //总产值
                aa:[]
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
                return new Promise((resoleve, reject) => {
                    this.loading = true;
                    axios({
                        methods: 'GET',
                        url: 'outputcharts/',
                        params: {
                            startDate: this.startDate,
                            endDate: this.endDate,
                            workId: this.selectWorkId2
                        },
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response => {
                        this.items = response.data;
                        this.loading = false;
                        resoleve(response.data)
                        response.data.forEach((item) => {
                            this.projectSums = this.projectSums + item.projectSum;
                            this.outputNumSum = this.outputNumSum + item.outPutNum;
                        })
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
</style>
