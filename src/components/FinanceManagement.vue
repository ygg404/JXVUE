<template>
<v-container fluid>
    <v-card>
        <v-card-title class="headline">财务操作</v-card-title>
      <v-card-title>
         <v-layout align-start justify-start row fill-height>
                <v-flex xs4>
                    <el-date-picker v-model="chooseDate" type ="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="dateType">
                        </el-date-picker>
                </v-flex>
                <!--<v-flex xs2><v-select v-model="chooseStage" :items="stages" item-text="name" item-value="name" placeholder="选择阶段" class="chooseT" @change="chooseStageData"></v-select></v-flex>-->
                <v-flex xs3><v-select v-model="chooseType" clearable :items="chooseTypes" item-text="name" item-value="name" placeholder="类型选择" class="chooseT"></v-select></v-flex>
                <v-flex xs2><v-text-field v-model="search" append-icon="search" placeholder="关键词搜索" label="search" single-line hide-details></v-text-field></v-flex>
            </v-layout>
      </v-card-title>
    <v-data-table :headers="headers" :items="projects" :loading="loading" :total-items="totalProjects" :pagination.sync="pagination" class="elevation-1" must-sort>
          <template slot="items" slot-scope="props">
            <td>{{props.item.contractNo}}</td>
            <td>{{props.item.projectName}}</td>
            <td>{{props.item.projectType}}</td>
            <td>{{props.item.projectAuthorize}}</td>
            <td>{{props.item.projectCharge}}</td>
            <td style="min-width: 120px;">{{props.item.startDateTime}}</td>
            <td>{{props.item.projectStage}}</td>
            <td>{{props.item.projectReceivable}}</td>
            <td>{{props.item.projectActuallyReceipts}}</td>
            <td>{{props.item.projectNotReceipts}}</td>
            <td>{{props.item.projectExpenditure}}</td>
            <v-btn color="blue darken-1" flat @click="editFinance(props.item)" title="修改" class="controllEdit"><v-icon small> edit</v-icon>编辑</v-btn>
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
        projects:[],
        types:[],
        chooseTypes:[],
        chooseType:'',
        loading: false,
        totalProjects : 0,
        startDate:'',
        chooseStage:'',
        chooseDate:false,
        stages:[],
        endDate:'',
        search:'',
        p_stage:1,
        clearable:false,
        stageId:9,
        pagination: {},
        headers:[
            {text:'合同编号',value:'contractNo'},
            {text:'项目名称',value:'projectName',sortable:false},
            {text:'项目类型',value:'projectType'},
            {text:'委托单位',value:'projectAuthorize',sortable:false},
            {text:'业务负责人',value:'projectCharge'},
            {text:'启动时间',value:'projectStartTime'},
            {text:'项目阶段',value:'projectStage'},
            {text:'应收',sortable:false},
            {text:'实收',sortable:false},
            {text:'未收',sortable:false},
            {text:'支出',sortable:false},
        ]
    }),
    methods:{
        getProjectsFromApi(){
            console.log(this.stageId)
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
                    url:'project/account/',
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
                    this.totalProjects = response.data.total
                    this.loading = false
                    resoleve(response.data)
                }).catch(error=>{
                    this.loading = false
                    reject(error.response)
                })
            })
        },
        editFinance:function(item){
          this.$router.push({name:'editfinance',query:{'p_no':item.projectNo}});
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
                        this.chooseTypes = response.data
                    }).catch(error =>{
                        reject(error.response.data)
                    })
                })
            },

        getStageFromApi(){
            return new Promise((resolve,reject) =>{
                axios({
                    method:'GET',
                    url:'stage/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    }
                }).then(response => {
                    resolve(response.data)
                    this.stages = response.data
                    this.chooseStage = this.stages[6].name
                    this.stageId = this.stages[6].id
                    this.getProjectsFromApi()
                    .then(success =>{
                    }).catch(error=>{})
                }).catch(error =>{

                })
            })
        },
        chooseStageData(){
            this.stages.forEach(e => {
                    if (e.name == this.chooseStage) {
                        this.stageId = e.id
                    }
                })
            this.pagination.descending = true
            this.pagination.sortBy = 'id'
            this.pagination.rowsPerPage = 25
            this.getProjectsFromApi()
            .then(success =>{
            this.projects = success.data
            this.totalProjects = success.total
            }).catch(error=>{})
            }

    },
    created(){
        this.getStageFromApi().then(success=>{}).catch(error=>{})
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
        }).catch(error=>{})
        this.getTypeFromApi().then(success=>{}).catch(error=>{})

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
.dateType{
  margin-left: 1rem;
  margin-top: 0.5rem
}
.chooseT{
  margin-left: 5px
}
</style>

