<template>
    <v-container fluid>
        <v-card>
            <v-card-title class="headline">项目产值</v-card-title>
            <v-card-title>
                <v-layout row wrap style="display: flex;flex-wrap: wrap">
                    <el-date-picker v-model="chooseDate" type ="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="dateType"></el-date-picker>
                    <v-flex xs2><v-select v-model="chooseType" clearable :items="chooseTypes" item-text="name" item-value="name" placeholder="类型选择" class="chooseT"></v-select></v-flex>
                    <v-flex xs2><v-text-field v-model="search" append-icon="search" placeholder="关键词搜索" label="search" single-line hide-details></v-text-field></v-flex>
                </v-layout>
            </v-card-title>
            <v-data-table :headers="headers" :items="projects" :loading="loading" :total-items="totalProjects" :pagination.sync="pagination"  class="elevation-1" must-sort>
                <template slot="items" slot-scope="props">
                    <td>{{props.item.contractNo}}</td>
                    <td>{{props.item.projectName}}</td>
                    <td style="min-width: 110px;">{{props.item.projectStartTime}}</td>
                    <td style="min-width: 110px;">{{props.item.workName}}</td>
                    <td>{{props.item.projectOutPut}}</td>
                    <td>{{props.item.projectActuallyOutput}}</td>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
    import store from '@/store.js'
    import moment from 'moment'
    export default {
        data: ()=>({
            userGroup:'',
            projects:[],
            types:[],
            chooseTypes:[],
            chooseType:'',
            loading: false,
            totalProjects : 0,
            startDate:'',
            chooseDate:false,
            endDate:'',
            search:'',
            p_stage:1,
            clearable:false,
            stageId:2,
            pagination: {},
            headers:[
                {text:'合同编号',value:'contractNo',sortable:false},
                {text:'项目名称',value:'projectName',sortable:false},
                {text:'项目启动时间',value:'projectStartTime'},
                {text:'作业组',value:'projectName',sortable:false},
                {text:'预算产值',value:'projectOutPut',sortable:false},
                {text:'实际产值',value:'ActualOutput',sortable:false}
            ],
            useraccount:'',
            permissions:JSON.parse(localStorage.getItem('permissions'))
        }),

        methods:{
            getProjectsFromApi(){
                this.userGroup = sessionStorage.getItem("userGroup")
                if(this.userGroup == null){
                    this.userGroup = ''
                }
                if(this.chooseDate == null || this.chooseDate.length == 0){
                    this.startDate = ''
                    this.endDate = ''
                }else if(this.chooseDate.length > 0){
                    this.startDate = this.chooseDate[0]
                    this.endDate = this.chooseDate[1]
                }
                return new Promise((resolve,reject) =>{
                    if(!this.permissions.includes('all_permission')){
                        this.useraccount = localStorage.getItem('userAccount')
                    }
                    this.loading = true
                    const{ sortBy,descending,page,rowsPerPage} = this.pagination
                    axios({
                        methods:'GET',
                        url:'projectOutPut/',
                        params:{
                            page: this.pagination.page,
                            rowsPerPage: this.pagination.rowsPerPage,
                            sortBy: this.pagination.sortBy,
                            descending: this.pagination.descending,
                            search: this.search,
                            startDate: this.startDate,
                            endDate: this.endDate,
                            userGroup:this.userGroup,
                            userAccount: this.useraccount
                        },
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        this.projects = response.data.data

                        this.projects.forEach((item)=>{
                            item.projectStartTime = item.projectStartTime.substring(0,10);
                        });
                        console.log(this.projects)
                        resoleve(response.data)
                    }).catch(error=>{
                        this.loading = false
                        reject(error.response)
                    })
                })
            },
            getTypeFromApi(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'projectTypes/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(response => {
                        resolve(response.data)
                    }).catch(error =>{
                        reject(error.response.data)
                    })
                })
            }
        },
        mounted(){
            this.startDate =  moment(new Date(new Date().getFullYear(), new Date().getMonth() -1 , 1)).format('YYYY-MM-DD');
            this.endDate =  moment(new Date()).format('YYYY-MM-DD');
            this.chooseDate = [this.startDate ,this.endDate ];

            this.pagination.descending = true
            this.pagination.sortBy = 'id'
            this.pagination.rowsPerPage = 25
            this.getProjectsFromApi()
                .then(success =>{

                    this.projects = success.data
                    this.totalProjects = success.total
                }).catch(error=>{}),
                this.getTypeFromApi()
                    .then(response =>{
                        this.types = response
                        this.chooseTypes = response
                    }).catch(error =>{

                })

        },
        watch:{
            pagination:{
                handler(){
                    this.getProjectsFromApi()
                        .then(success =>{
                            this.projects = success.data
                            this.total = success.data
                        }).catch(error=>{})
                }
            },
            search:{
                handler(){
                    this.getProjectsFromApi().then(data=>{}).catch(error=>{})
                }
            },
            chooseDate:{
                handler(){
                    this.getProjectsFromApi().then(data=>{}).catch(error=>{})
                }
            },
            chooseType:{
                handler(){
                    if(this.chooseType != null){
                        this.search = this.chooseType
                    }else{
                        this.search = ''
                    }
                    this.getProjectsFromApi().then(data=>{}).catch(error=>{})
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
