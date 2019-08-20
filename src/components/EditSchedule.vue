<template>
    <v-container fluid>
        <v-expansion-panel v-model="schedulePanel" expand>
            <v-expansion-panel-content v-for="schedule in schedules" :key="schedule.id">
                <template v-slot:header>
                    <h3>{{schedule.projectStartTime}}</h3>
                </template>
                <v-card color="grey lighten-4">
                    <v-card-text>{{schedule.projectNote}}</v-card-text>
                    <v-layout justify-end>
                        <v-btn color="blue darken-1" flat @click="deleteItem(schedule)" title="删除" class="controllDelete"><v-icon color="error" small>delete</v-icon></v-btn>
                    </v-layout>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>

        <v-dialog max-width="500px" v-model="addScheduleDialog" persistent>
            <v-card>
                <v-card-title><span class="title">添加进度内容</span></v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout column>
                            <v-text-field v-model="createdTime" label="填写日期:"  prepend-icon="event" disabled></v-text-field>
                            <v-textarea outline v-model="scheduleNote" :rules="noteRules" label="进度内容" ></v-textarea>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="addScheduleDialog = false">取消</v-btn>
                    <v-btn color="info" @click="addSchedule()">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-layout align-start justify-center fill-height class="btnInfo">
            <v-btn color="success" @click="addScheduleToApi">新增</v-btn>
            <v-btn color="orange" class="white--text" @click="$router.go(-1)">返回</v-btn>
        </v-layout>

        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
            {{snackbarText}}
        </v-snackbar>
    </v-container>
</template>
<script>
import store from '@/store.js'
export default {
    data:()=>({
        schedules:[],
        projectNo:'',
        scheduleNote:'',
        schedulePanel:[],
        addScheduleDialog:false,
        snackbar:false,
        snackbarColor:'',
        snackbarText:'',
        snackbarTimeout:2000,
        createdTime:new Date().toISOString().substr(0, 10),
        permissions: JSON.parse(localStorage.getItem('permissions')),
        noteRules:[
            v => !!v || "内容不能为空"
        ]
    }),
    methods:{
        getScheduleFromApi(){
            return new Promise((resolve,reject)=>{
                axios({
                    methods:'GET',
                    url:'schedule/',
                    params:{
                        projectNo : this.projectNo
                    },  
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                }).then(success=>{
                    this.schedules = success.data
                }).catch(error=>{

                })
            })
        },
        addSchedule(){
            return new Promise((resolve,reject)=>{
                axios({
                    method:'POST',
                    url:'schedule/',
                    data:{
                        projectNo : this.projectNo,
                        projectStartTime : this.createdTime,
                        projectNote : this.scheduleNote
                    },
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                }).then(success=>{
                    this.schedules = success.data
                    this.addScheduleDialog = false
                    this.snackbar = true
                    this.snackbarColor = 'success'
                    this.snackbarText = '添加成功'
                      /*setTimeout(_=>{
                            this.$router.go(-1)
                        },1000)*/
                    this.getScheduleFromApi().then(success=>{}).catch(error=>{})
                }).catch(error=>{
                    this.snackbar = false,
                    this.snackbarColor = 'error',
                    this.snackbarText = error.response.data.message
                })
            })
        },
        addScheduleToApi(){
            this.addScheduleDialog = true
        },
        deleteItem(item){
            if(confirm("确认删除日期为\""+ item.projectStartTime + "\"的进度记录?\n删除后将无法复原！")){
                axios({
                    url:'schedule/'+item.id+'/',
                    method: 'DELETE',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    }
                }).then(response => {
                    this.snackbarText = '成功删除进度记录',
                    this.snackbarColor = 'success',
                    this.snackbar = true
                    this.getScheduleFromApi()
                    .then(response =>{
                    }).catch(error =>{
                    })
                }).catch(error=>{
                    this.snackbar = true,
                    this.snackbarColor = 'error',
                    this.snackbarText = error.response.data.message
                })
            }
        }
    },
    mounted(){
        this.projectNo = this.$route.query.p_no
        this.getScheduleFromApi().then(success=>{}).catch(error=>{})
    }
}
</script>
<style>
.btnInfo{
    margin-top: 24px
}
</style>
