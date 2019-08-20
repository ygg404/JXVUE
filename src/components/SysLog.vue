<template>
    <v-container fluid>
        <v-card>
            <v-card-title class="headline mb-0">系统日志
                <v-spacer></v-spacer>
                <v-flex xs6>
                    <el-date-picker v-model="chooseDate" type ="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                </v-flex>
                <v-flex xs3><v-text-field v-model="search" append-icon="search" placeholder="关键词搜索" label="search" single-line hide-details></v-text-field></v-flex>    
            </v-card-title>
            <v-data-table :headers="headers" :items = "logs" :loading="loading" :total-items="totalLogs" :pagination.sync="pagination" must-sort>
                <template slot="items" slot-scope="props">
                    <td>{{props.item.userName}}</td>
                    <td>{{props.item.userContent}}</td>
                    <td>{{props.item.startTime}}</td>
                    <td>{{props.item.requestIp}}</td>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>
<script>
import store from '@/store.js'
export default {
    data:() =>({
        totalLogs:0,
        loading:false,
        search:'',
        startDate:'',
        chooseDate:[],
        endDate:'',
        pagination:{},
        logs:[],
        headers:[
            {text:'用户名',value:'user_name'},
            {text:'用户操作内容',value:'content'},
            {text:'操作时间',value:'operationTime'},
            {text:'操作ip',sortable:false}
        ]
    }),
    methods:{
        getLogFromApi(){
            return new Promise((resolve,reject) =>{
                if(this.chooseDate.length > 0){
                    this.startDate = this.chooseDate[0]
                    this.endDate = this.chooseDate[1]
                }else if(this.chooseDate == null){
                    this.startDate = ''
                    this.endDate = ''
                }
                this.loading = true
                const { sortBy, descending, page, rowsPerPage } = this.pagination
                axios({
                    method:"GET",
                    url:"log/",
                    params:{
                        page: this.pagination.page,
                        rowsPerPage: this.pagination.rowsPerPage,
                        descending: this.pagination.descending,
                        sortBy: this.pagination.sortBy,
                        search: this.search,
                        startDate: this.startDate,
                        endDate: this.endDate
                    },
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    }
                }).then(response =>{
                    this.loading = false
                    resolve(response.data)
                }).catch(error =>{
                    this.loading = false
                    reject(error.response.data)
                })
            })
        }
    },
    mounted(){
        this.pagination.descending = true
        this.pagination.sortBy = 'operationTime'
        this.pagination.rowsPerPage = 25
        this.getLogFromApi()
        .then(data =>{
            this.logs = data.data
            this.totalLogs = data.total
        })
    },
    watch:{
        pagination:{
            handler(){
                this.getLogFromApi()
                .then(data=>{
                    this.logs = data.data
                    this.totalLogs = data.total
                })
            }
        },
        search:{
            handler(){
                this.getLogFromApi()
                .then(data =>{
                    this.logs = data.data
                    this.totalLogs = data.total
                })
            }
        },
        chooseDate:{
            handler(){
                this.getLogFromApi()
                .then(data=>{
                    this.logs = data.data
                    this.totalLogs = data.total
                })
            }
        }
    }
   
}
</script>
