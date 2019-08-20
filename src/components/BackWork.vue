<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                <v-dialog max-width="500px" v-model="showBackDialog" persistent>
                    <v-card>
                        <v-card-title><span class="title">查看返修</span></v-card-title>
                        <div v-for="bn in backNotes" :key="bn.id">
                            <v-card-text style="margin: 10px">
                                <v-text-field v-model="bn.createTime" label="返修时间:" prepend-icon="timer" disabled></v-text-field>
                                <v-textarea prepend-icon="book" name="input-7-4" label="返修意见" v-model="bn.backNote" disabled></v-textarea>
                            </v-card-text>
                        </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="info" flat @click="colseshowBackDialog">取消</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-layout row wrap style="display: flex;flex-wrap: wrap">
                    <el-date-picker v-model="chooseDate" type ="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="dateType">
                    </el-date-picker>
                    <v-flex xs2><v-select v-model="chooseType" clearable :items="chooseTypes" item-text="name" item-value="name" placeholder="类型选择" class="chooseT"></v-select></v-flex>
                    <v-flex xs2><v-text-field v-model="search" append-icon="search" placeholder="关键词搜索" label="search" single-line hide-details></v-text-field></v-flex>
                </v-layout>
            </v-card-title>
            <v-data-table :headers="headers" :items="projects" :loading="loading" :total-items="totalProjects" :pagination.sync="pagination" class="elevation-1" must-sort>
                <template slot="items" slot-scope="props">
                    <td>{{props.item.projectNo}}</td>
                    <td>{{props.item.projectName}}</td>
                    <td>{{props.item.projectType}}</td>
                    <td>{{props.item.projectAuthorize}}</td>
                    <td>{{props.item.projectStartTime}}</td>
                    <td>{{props.item.projectStage}}</td>
                    <v-btn color="blue darken-1" flat @click="backwork(props.item)" title="查看" class="controllEdit"><v-icon small> search</v-icon></v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
    import store from '@/store.js'
    export default {
        data: ()=>({
            backNotes:[],
            backCreateTime:'',
            backNote:'',
            showBackDialog:false,
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
            stageId:3,
            pagination: {},
            headers:[
                {text:'项目编码',value:'projectNo'},
                {text:'项目名称',value:'projectName',sortable:false},
                {text:'项目类型',value:'projectType'},
                {text:'委托单位',value:'projectAuthorize',sortable:false},
                {text:'开始时间',value:'projectStartTime'},
                {text:'项目阶段',value:'projectStage'}
            ]
        }),
        methods:{
            colseshowBackDialog(){
                this.backCreateTime = ''
                this.backNote = ''
                this.showBackDialog = false
            },
            getProjectsFromApi(){
                if(this.chooseDate == null || this.chooseDate.length == 0){
                    this.startDate = ''
                    this.endDate = ''
                }else if(this.chooseDate.length > 0){
                    this.startDate = this.chooseDate[0]
                    this.endDate = this.chooseDate[1]
                }
                return new Promise((resolve,reject) =>{
                    this.loading = true
                    const{ sortBy,descending,page,rowsPerPage} = this.pagination
                    axios({
                        methods:'GET',
                        url:'projectWorkBack/',
                        params:{
                            page: this.pagination.page,
                            rowsPerPage: this.pagination.rowsPerPage,
                            sortBy: this.pagination.sortBy,
                            descending: this.pagination.descending,
                            search: this.search,
                            startDate: this.startDate,
                            endDate: this.endDate,
                            p_stage: this.p_stage,
                            stageId: this.stageId
                        },
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        this.projects = response.data.data
                        this.loading = false
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
            },
            backwork(item){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'project/back/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        params:{
                            projectNo:item.projectNo
                        }
                    }).then(response => {
                        resolve(response.data)
                        this.backNotes = response.data;
                        this.showBackDialog = true
                    }).catch(error =>{
                        reject(error.response)
                    })
                })

            }

        },
        mounted(){
            this.pagination.rowsPerPage = 5
            this.getProjectsFromApi()
                .then(success =>{
                    this.projects = success.data
                    this.totalProjects = success.total
                }).catch(error=>{})
            this.getTypeFromApi()
                .then(response =>{
                    this.types = response
                    this.chooseTypes = response
                }).catch(error =>{})
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

