<template >
    <v-container fluid>
        <v-card width="100%">
            <v-card-title>
                <v-layout row wrap style="display: flex;flex-wrap: wrap">
                    <el-date-picker v-model="chooseDate4" type="daterange" @change="refreshData" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
                    <v-flex xs12 sm6 md2>
                        <v-btn slot="activator" @click="doPrint" color="primary" dark class="mb-2">打印</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-title>
            <div class="print">
                <h1 style="text-align: center">各部门汇总产值统计表</h1>
                <h3 style="text-align: center">{{startDate}}至{{endDate}}</h3>
                <v-data-table :headers="headers" :loading="loading" :items="items" hide-actions>
                    <template slot="items" slot-scope="props">
                        <tr>
                            <td>{{ props.item.gName }}</td>
                            <td>{{ props.item.projectSum }}</td>
                            <td>{{ props.item.outPutNum }}</td>
                        </tr>
                    </template>
                    <template v-slot:footer>
                        <td><b>合计</b></td>
                        <td><b>{{projectSums}}</b></td>
                        <td><b>{{outPutNumSum.toFixed(2)}}</b></td>
                    </template>
                </v-data-table>
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
                items: [],
                startDate: '',
                chooseDate4:[],
                endDate: '',
                loading: false,
                headers: [
                    {text: '部门名称', value: 'gName',sortable:false},
                    {text: '项目数', value: 'projectSum',sortable:false},
                    {text: '产值', value: 'outPutNum',sortable:false}
                ],
                projectSums: 0,     //项目总数
                outPutNumSum: 0,     //产值总数
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
            getCollectChartFromApi() {
                return new Promise((resoleve, reject) => {
                    this.loading = true
                    axios({
                        methods: 'GET',
                        url: 'outputs/',
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
                        response.data.forEach((item)=>{
                            this.projectSums = this.projectSums + item.projectSum;
                            this.outPutNumSum = this.outPutNumSum + item.outPutNum;
                        })
                    }).catch(error => {
                        this.loading = false,
                            reject(error.response.data)
                    })
                })
            },
            refreshData() {
                this.projectSums = 0;
                this.outPutNumSum = 0;
                // 格式日期
                this.startDate = moment(this.chooseDate4[0]).format('YYYY-MM-DD');
                this.endDate = moment(this.chooseDate4[1]).format('YYYY-MM-DD');
                // 刷新数据
                this.getCollectChartFromApi();
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
            this.getCollectChartFromApi();
        },
        watch: {
            chooseDate4: {
                handler(newName, oldName) {
                    if (newName === null) {
                        // 刷新数据
                        this.projectSumsprojectSums = 0;
                        this.outPutNumSum = 0;
                        this.getDate();
                        this.getCollectChartFromApi();
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
