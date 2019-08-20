<template>
    <div>
        <v-container fluid>
            <v-card width="100%">
                <v-card-title>
                    <v-layout row wrap style="display: flex;flex-wrap: wrap">
                        <el-date-picker v-model="chooseDate2" type="daterange" @change="refreshData" range-separator="至"
                                        start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
                        <v-flex xs12 sm6 md2>
                            <v-select v-model="selectGroup" :items="Groups" attach chips label="业务负责人:"
                                      item-value="projectCharge" item-text="projectCharge" @change="GroupData"></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-btn slot="activator" @click="doPrint" color="primary" dark class="mb-2">打印</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <div class="print">
                    <h1 style="text-align: center">公司业务收费统计表</h1>
                    <h3 style="text-align: center">{{startDate}}至{{endDate}}</h3>
                    <v-data-table :headers="headers" :items="items" :loading="loading" hide-actions>
                        <template slot="items" slot-scope="props">
                            <td>{{props.item.projectName}}</td>
                            <td>{{props.item.projectAuthorize}}</td>
                            <td>{{props.item.userName}}</td>
                            <td>{{props.item.userPhone}}</td>
                            <td>{{props.item.projectReceivable}}</td>
                            <td>{{props.item.projectActuallyReceipts}}</td>
                            <td>{{props.item.projectNotReceipts}}</td>
                            <td>{{props.item.projectCharge}}</td>
                        </template>
                        <template v-slot:footer>
                            <td colspan="4"><b>合计{{projectNumSum}}个项目</b></td>
                            <td><b>{{projectMoneySum.toFixed(2)}}</b></td>
                            <td><b>{{projectNotReceiptsSum.toFixed(2)}}</b></td>
                            <td><b>{{projectGetMoneySum.toFixed(2)}}</b></td>
                            <td></td>
                        </template>
                    </v-data-table>
                </div>
            </v-card>
        </v-container>
    </div>
</template>
<script>
    import store from '@/store.js'
    import moment from 'moment'

    export default {
        data() {
            return {
                startDate: '',
                endDate: '',
                chooseDate2: [],
                loading: false,
                items: [],
                Groups: [],
                selectGroup: '全部',
                headers: [
                    {text: '项目名称', value: 'project_name'},
                    {text: '委托单位', value: 'project_authorize'},
                    {text: '联系人', value: 'user_name'},
                    {text: '联系电话', value: 'user_phone'},
                    {text: '应收', value: 'project_money'},
                    {text: '实收', value: 'projectActuallyReceipts'},
                    {text: '未收', value: 'projectNotReceipts'},
                    {text: '业务负责人', value: 'project_charge'}
                ],
                projectNumSum: 0,       //项目总数
                projectMoneySum: 0,     //应收总数
                projectNotReceiptsSum:0,//实收总数
                projectGetMoneySum: 0,  // 未收总数
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
            getChargeChartFromApi() {
                return new Promise((resoleve, reject) => {
                    this.loading = true
                    //显示数据
                    axios({
                        methods: 'GET',
                        url: 'toll/',
                        params: {
                            startDate: this.startDate,
                            endDate: this.endDate,
                            project_charge: this.selectGroup,
                        },
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response => {
                        this.items = response.data;
                        this.loading = false
                        resoleve(response.data)

                        this.projectNumSum = response.data.length;
                        response.data.forEach((item) => {
                            this.projectMoneySum = this.projectMoneySum + item.projectReceivable;
                            this.projectNotReceiptsSum = this.projectNotReceiptsSum + item.projectActuallyReceipts;
                            this.projectGetMoneySum = this.projectGetMoneySum + item.projectNotReceipts;
                        })
                    }).catch(error => {
                        this.loading = false
                        reject(error.response.data)
                    });
                })
            },
            getProjectChargeFromApi() {
                return new Promise((resolve, reject) => {
                    //加载所有业务人员
                    axios({
                        method: 'GET',
                        url: 'projectCharge/',
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
                this.startDate = moment(this.chooseDate2[0]).format('YYYY-MM-DD');
                this.endDate = moment(this.chooseDate2[1]).format('YYYY-MM-DD');
                this.projectNumSum = 0      //项目总数
                this.projectMoneySum = 0    //应收总数
                this.projectNotReceiptsSum = 0//实收总数
                this.projectGetMoneySum = 0  // 未收总数
                // 刷新数据
                this.getChargeChartFromApi();
            },
            GroupData() {
                // 刷新数据
                this.projectNumSum = 0      //项目总数
                this.projectMoneySum = 0    //应收总数
                this.projectNotReceiptsSum = 0//实收总数
                this.projectGetMoneySum = 0  // 未收总数
                this.getChargeChartFromApi();
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
            this.getChargeChartFromApi();
            this.getProjectChargeFromApi()
                .then(success => {
                    this.Groups = success.data
                    let ab = {projectCharge: '全部'};
                    this.Groups.unshift(ab);
                });

        },
        watch: {
            selectGroup: {
                header() {
                    this.getProjectChargeFromApi().then(data=>{
                        this.items = data.data
                    })
                }
            },
            chooseDate2: {
                handler(newName, oldName) {
                    if (newName === null) {
                        // 刷新数据
                        this.projectNumSum = 0      //项目总数
                        this.projectMoneySum = 0    //应收总数
                        this.projectNotReceiptsSum = 0//实收总数
                        this.projectGetMoneySum = 0  // 未收总数
                        this.getDate();
                        this.getChargeChartFromApi();
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
