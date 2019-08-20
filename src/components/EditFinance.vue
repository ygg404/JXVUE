<template>
    <v-container fluid>
        <v-layout align-center justify-center column fill-height>
            <v-expansion-panel v-model="infoPanel" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>项目基本信息</h3>
                    </template> 
                    <v-card color="grey lighten-4">
                    <v-layout>
                        <v-flex>
                            <v-card-text class="subheading">项目名称:{{project.projectName}}</v-card-text>
                            <v-card-text class="subheading"><blockquote>委托单位:{{project.projectAuthorize}}</blockquote></v-card-text>
                            <v-card-text class="subheading">项目编码:{{projectNo}}</v-card-text>
                            <v-card-text class="subheading">项目类型:{{project.projectType}}</v-card-text>
                            <v-card-text class="subheading">项目金额:{{project.projectMoney}}</v-card-text>
                        </v-flex>
                        <v-flex>
                            <v-card-text class="subheading">项目阶段:{{project.projectStage}}</v-card-text>
                            <v-card-text class="subheading">联系人:{{project.projectUser}}</v-card-text>
                            <v-card-text class="subheading">联系电话:{{project.projectPhone}}</v-card-text>
                        </v-flex>
                    </v-layout>
                </v-card>  
                </v-expansion-panel-content>
            </v-expansion-panel>
               <v-expansion-panel v-model="accountPanel" expand>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <h3>收支信息</h3>
                    </template> 
                    <v-card color="grey lighten-4">
                    <v-layout>
                            <v-card-text class="subheading">项目应收:{{project.projectMoney}}</v-card-text>
                            <v-card-text class="subheading"><blockquote>未收款项:{{projectNot}}</blockquote></v-card-text>
                            <v-card-text class="subheading">已收款项:{{projectGet}}</v-card-text>
                            <v-card-text class="subheading">支出款项:{{projectOut}}</v-card-text>
                    </v-layout>
                </v-card>  
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-layout>

        <v-card class="accountCard">
                    <v-card-text>
                    <v-data-table :headers="headers" hide-actions :items="project.accounts">
                         <template slot="items" slot-scope="props">
                            <td>{{props.item.startDateTime}}</td>
                            <td>{{props.item.typeName}}</td>
                            <td>{{props.item.accountNum}}</td>
                            <td>{{props.item.accountNote}}</td>
                            <td><v-btn icon small><v-icon color="error" @click="deleteItem(props.item)">delete</v-icon></v-btn></td>
                        </template>
                    </v-data-table>
                    </v-card-text>
            </v-card>

            
              <v-dialog max-width="500px" v-model="addAccountDialog" persistent>
                        <v-card>
                            <v-card-title><span class="title">添加收支数据</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-layout wrap>
                                    <v-flex md12>
                                      <v-text-field v-model="accountMoney" label="金额:" :rules="noteRules" prepend-icon="monetization_on" type="number"></v-text-field>
                                         <v-radio-group v-model="chooseType" row >
                                            <v-radio label="收款" value="0"></v-radio>
                                            <v-radio label="支出" value="1"></v-radio>
                                        </v-radio-group>
                                      <v-text-field v-model="accountNote" label="备注:" :rules="noteRules" prepend-icon="import_contacts"></v-text-field>
                                      <v-menu v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                      <template v-slot:activator="{ on }">
                                        <v-text-field v-model="startDateTime" label="选择添加时间:" :rules="noteRules" prepend-icon="event" readonly v-on="on"></v-text-field>
                                      </template>
                                          <v-date-picker v-model="startDateTime" @input="dateMenu = false"></v-date-picker>
                                      </v-menu>
                                    </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click="addAccountDialog = false">取消</v-btn>
                                <v-btn color="info" @click="addAccountInfo">添加</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

        <v-layout align-center justify-center fill-height class="bottomBtn">
            <v-btn color="info" @click="addAccount">新增</v-btn>
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
        infoPanel:[false],
        accountPanel:[true],
        addAccountDialog:false,
        dateMenu:false,
        chooseType:'0',
        accountMoney:0,
        accountNote:'', 
        accountType:'',
        startDateTime:new Date().toISOString().substr(0, 10),
        projectNo:'',
        projectNot:0,
        projectGet:0,
        projectOut:0,
        project:{
            projectAuthorize:'',
            projectMoney:'',
            projectName:'',
            projectOutPut:0,
            projectStage:'',
            projectType:'',
            projectUser:'',
            projectPhone:'',
            accounts:[],
        },
        snackbar:false,
        snackbarColor:'',
        snackbarText:'',
        snackbarTimeout:2000,
        noteRules:[
            v => !!v || "内容不能为空"
        ],
        headers:[
            {text:'日期',sortable:false},
            {text:'收支',sortable:false},
            {text:'金额',sortable:false},
            {text:'备注',sortable:false}
        ]
    }),
    methods:{
        getProjectsFromApi(){  
          this.projectNo = this.$route.query.p_no
          return new Promise((resolve,reject) =>{
                axios({
                    methods:'GET',
                    url:'project/account/',
                    params:{
                        projectNo:this.projectNo
                    },
                    headers:{
                        Authorization: 'Bearer ' + sessionStorage.getItem("token")
                    }
                }).then(response=>{
                    resolve(response.data)
                    this.project.projectAuthorize = response.data.projectAuthorize
                    this.project.projectMoney = response.data.projectMoney
                    this.project.projectName = response.data.projectName
                    this.project.projectOutPut = response.data.projectOutPut
                    this.project.projectStage = response.data.projectStage
                    this.project.projectType = response.data.projectType
                    this.project.projectUser = response.data.userName
                    this.project.projectPhone = response.data.userPhone
                    this.project.accounts = response.data.accounts
                    this.projectGet = 0
                    this.projectOut = 0
                    response.data.accounts.forEach(element => {
                        if(element.accountType == 0){           //收款数据
                            this.projectGet += element.accountNum
                        }else if(element.accountType == 1){         //支出数据
                            this.projectOut += element.accountNum
                        }
                    });
                    this.projectNot = this.project.projectMoney - this.projectGet
                }).catch(error=>{
                    reject(error.response)
                })
            })
        },
        addAccount(){
            this.addAccountDialog = true
        },
        addAccountInfo(){
            return new Promise((resolve,reject)=>{
                axios({
                    method:'POST',
                    url:'project/addAccount/',
                    data:{
                        projectNo:this.projectNo,
                        accountType:this.chooseType,
                        accountNote:this.accountNote,
                        accountNum:this.accountMoney,
                        startDateTime:this.startDateTime
                    },
                    headers:{
                        Authorization: 'Bearer ' + sessionStorage.getItem("token")
                    }
                }).then(response=>{
                    resolve(response.data)
                    this.addAccountDialog = false
                    this.snackbarColor = 'success'
                    this.snackbarText = '提交成功'
                    this.snackbar = true
                    this.getProjectsFromApi().then(success=>{}).catch(error=>{})
                }).catch(error=>{
                    reject(error.response)
                    this.snackbarColor = 'error'
                    this.snackbarText = error.response.data
                    this.snackbar = true
                })
            })
        },
        deleteItem(item){
            if(confirm("确认删除编号为\""+item.id+"\"的收支记录?\n删除后将无法复原!")){
                axios({
                url: 'account/' + item.id + '/',
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' +sessionStorage.getItem('token')
                },           
                params:{
                    projectNo:item.projectNo
                }
                }).then(response => {
                this.snackbarText = '成功删除一条收支数据'
                this.snackbarColor = 'success'
                this.snackbar = true
                this.getProjectsFromApi().then(success=>{}).catch(error=>{})
            })
        }
        }
     },
     mounted(){
         this.getProjectsFromApi().then(success=>{}).catch(error=>{})
     }
}
</script>
<style>
.accountCard{
    margin-top: 24px
}
.bottomBtn{
    margin-top: 24px
}
</style>
