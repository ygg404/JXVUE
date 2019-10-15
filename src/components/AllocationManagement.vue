<template>
<v-container fluid>
    <v-card>
        <v-card-title class="headline">项目安排</v-card-title>
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
            <!--<td>{{props.item.projectType}}</td>-->
            <td>{{props.item.projectAuthorize}}</td>
            <td>{{props.item.projectStartTime}}</td>
            <td>{{props.item.projectStage}}</td>
            <v-btn color="blue darken-1" flat @click="editPlan(props.item)" title="修改" class="controllEdit"><v-icon small> edit</v-icon>编辑</v-btn>
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
        chooseDate:false,
        endDate:'',
        search:'',
        p_stage:1,
        clearable:false,
        stageId:2,
        pagination: {},
        headers:[
            {text:'合同编号',value:'contractNo'},
            {text:'项目名称',value:'projectName',sortable:false},
            // {text:'项目类型',value:'projectType'},
            {text:'委托单位',value:'projectAuthorize',sortable:false},
            {text:'启动时间',value:'projectStartTime'},
            {text:'项目阶段',value:'projectStage'}
        ]
    }),
    methods:{
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
                    url:'projectSetUp/',
                    params:{
                        page: this.pagination.page,
                        rowsPerPage: this.pagination.rowsPerPage,
                        sortBy: this.pagination.sortBy,
                        descending: this.pagination.descending,
                        search: this.search,
                        startDate: this.startDate,
                        endDate: this.endDate,
                        p_stage: this.p_stage,
                        stageId: this.stageId,
                        account: ''
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
        editPlan:function(item){
          this.$router.push({name:'editallocation',query:{'p_no':item.projectNo}});
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
        this.pagination.rowsPerPage = 25
        this.pagination.descending = true
        this.pagination.sortBy = 'id'
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
/*.dateType{
  margin-left: 1rem;
  margin-top: 0.5rem
}
.chooseT{
  margin-right: 5rem
}*/
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

