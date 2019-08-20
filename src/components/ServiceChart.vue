<template>
    <v-container fluid>
        <v-card width="100%">
            <v-card-title>
                <v-layout row wrap style="display: flex;flex-wrap: wrap">
                    <el-date-picker v-model="chooseDate5" type="daterange" @change="refreshData" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
                    <v-flex xs12 sm6 md2>
                        <v-btn slot="activator" color="primary" @click="doPrint" dark class="mb-2">打印</v-btn>
                    </v-flex>

                </v-layout>
            </v-card-title>
            <!--startprint-->
            <div class="print">
                <h1 style="text-align: center">业务员统计汇总表</h1>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <h3 style="text-align: center">{{startDate}}至{{endDate}}</h3>
                <v-data-table :headers="headers" :items="items" :loading="loading" hide-actions>
                    <template slot="items" slot-scope="props">
                        <tr>
                            <td colspan="4"><b>{{props.item.projectBusiness}}</b></td>
                        </tr>
                        <tr v-for="l in props.item.list" :key="l.projectName">
                            <td>{{l.projectName}}</td>
                            <td>{{l.projectMoney.toFixed(2)}}</td>
                            <td>{{l.projectGetMoney.toFixed(2)}}</td>
                            <td>{{l.projectNotReceipts.toFixed(2)}}</td>
                        </tr>
                        <tr>
                            <td><b>共{{props.item.projectNum}}个项目</b></td>
                            <td><b>{{props.item.projectMoney.toFixed(2)}}</b></td>
                            <td><b>{{props.item.projectGetMoney.toFixed(2)}}</b></td>
                            <td><b>{{props.item.projectNotReceipts.toFixed(2)}}</b></td>
                        </tr>
                    </template>
                    <template v-slot:footer>
                        <td><b>合计{{projectNumSum}}个项目</b></td>
                        <td><b>{{projectMoneySum.toFixed(2)}}</b></td>
                        <td><b>{{projectGetMoneySum.toFixed(2)}}</b></td>
                        <td><b>{{projectNotReceiptsSum.toFixed(2)}}</b></td>
                    </template>
                </v-data-table>
            </div>
            <!--endprint-->
        </v-card>
    </v-container>
</template>


<script>
    import store from '@/store.js'
    import moment from 'moment'

    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                startDate: '',
                chooseDate5: [],
                endDate: '',
                loading: false,
                items: [],
                headers: [
                    {text: '业务员', value: 'projectBusiness'},
                    {text: '应收', value: 'projectMoney'},
                    {text: '实收', value: 'projectNotReceipts'},
                    {text: '未收', value: 'projectGetMoney'}
                ],
                projectNumSum: 0,       //项目总数
                projectMoneySum: 0,     //应收总数
                projectNotReceiptsSum:0,//实收总数
                projectGetMoneySum: 0,  // 未收总数
                aa:[]
            }
        },
        methods: {
            handleRemove(file, fileList) {
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            doPrint(){
                var newstr = document.getElementsByClassName('print')[0].innerHTML;
                document.body.innerHTML = newstr
                window.print()
                // 重新加载页面，以刷新数据
                window.location.reload()
            },
            getServiceChartFromApi() {
                return new Promise((resoleve, reject) => {
                    this.loading = true
                    axios({
                        methods: 'GET',
                        url: 'project/business/',
                        params: {
                            startDate: this.startDate,
                            endDate: this.endDate
                        },
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response => {
                        this.loading = false
                        resoleve(response.data)
                        this.items = response.data;
                        response.data.forEach((item) => {
                            this.projectNumSum = this.projectNumSum + item.projectNum;
                            this.projectMoneySum = this.projectMoneySum + item.projectMoney;
                            this.projectNotReceiptsSum = this.projectNotReceiptsSum + item.projectNotReceipts;
                            this.projectGetMoneySum = this.projectGetMoneySum + item.projectGetMoney;
                        })
                    }).catch(error => {
                        this.loading = false,
                            reject(error.response.data)
                    })
                })
            },
            refreshData() {
                // 格式日期
                this.startDate = moment(this.chooseDate5[0]).format('YYYY-MM-DD');
                this.endDate = moment(this.chooseDate5[1]).format('YYYY-MM-DD');
                this.projectNumSum = 0      //项目总数
                this.projectMoneySum = 0    //应收总数
                this.projectNotReceiptsSum = 0//实收总数
                this.projectGetMoneySum = 0  // 未收总数
                // 刷新数据
                this.getServiceChartFromApi();
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
            this.getServiceChartFromApi();
        },
        watch: {
            chooseDate5: {
                handler(newName, oldName) {
                    if (newName === null) {
                        // 刷新数据
                        this.projectNumSum = 0      //项目总数
                        this.projectMoneySum = 0    //应收总数
                        this.projectNotReceiptsSum = 0//实收总数
                        this.projectGetMoneySum = 0  // 未收总数
                        this.getDate();
                        this.getServiceChartFromApi();
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
