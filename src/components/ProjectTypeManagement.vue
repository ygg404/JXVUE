<template>
    <v-container fluid>
        <v-card width="100%">
            <v-flex xs2>
                <v-btn slot="activator" color="primary" class="addProjectType" @click="addProjectType">添加项目类型</v-btn>
            </v-flex>
            <v-dialog max-width="500px" v-model="addTypeDialog" persistent>
                <v-card>
                    <v-card-title><span class="title">添加项目类型</span></v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="type.name" label="分类名称:" :rules="nameRules"></v-text-field>
                            </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="addTypeDialog = false">取消</v-btn>
                        <v-btn color="info" @click="addTypeToApi">新增</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

               <v-dialog max-width="500px" v-model="editTypeDialog" persistent>
                <v-card>
                    <v-card-title><span class="title">更改项目类型</span></v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout wrap>
                            <v-flex md12>
                                     <v-text-field v-model="type.name" label="分类名称:" :rules="nameRules"></v-text-field>
                            </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="editTypeDialog = false">取消</v-btn>
                        <v-btn color="info" @click="editTypeToApi">修改</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-data-table :headers="headers" :items="types" :loading="loading" :total-items="totalTypes" :pagination.sync="pagination" must-sort>
                <template slot="items" slot-scope="props">
                    <td>{{props.item.id}}</td>
                    <td>{{props.item.name}}</td>
                    <td>
                        <v-btn color="blue darken-1" flat class="typeBtn" @click="editTypeDialogData(props.item)"><v-icon small>edit</v-icon>编辑</v-btn>
                        <v-btn color="error" flat @click="deleteType(props.item)"><v-icon color="error" small > delete </v-icon>删除</v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card>
        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
            {{snackbarText}}
        </v-snackbar>
    </v-container>
</template>
<script>
import store from '@/store.js'
export default {
    data:()=>({
        types:[],
        loading:false,
        totalTypes:0,
        pagination:{},
        snackbar:false,
        snackbarColor:'',
        snackbarText:'',
        snackbarTimeout:2000,
        addTypeDialog:'',
        editTypeDialog:'',
        permissions: JSON.parse(localStorage.getItem('permissions')),
        type:{
            id:'',
            name:'',
            code:''
        },
        headers:[
            {text:'编号',value:'id'},
            {text:'分类名称',value:'name'}
        ],
        nameRules:[
            v => !!v || "类型名称不能为空"
        ]
    }),
    methods:{
        getTypeFromApi(){
            return new Promise((resolve,reject) =>{
                this.loading = true
                const { sortBy, descending, page, rowsPerPage } = this.pagination
                axios({
                    method:'GET',
                    url:'project/types/',
                    params:{
                        page: this.pagination.page,
                        descending: this.pagination.descending,
                        sortBy: this.pagination.sortBy,
                        rowsPerPage: this.pagination.rowsPerPage
                    },
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    }
                }).then(response => {
                    this.loading = false
                    resolve(response.data)
                }).catch(error =>{
                    this.loading = false
                    reject(error.response.data)
                })
            })
        },
        addProjectType(){
            if(this.permissions.includes('all_permission')|| this.permissions.includes('sys_setting')){
                this.addTypeDialog = true
            }else{
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = '无操作权限'
                return false
            }
        },
        addTypeToApi(){
            return new Promise((resolve,reject) =>{
                axios({
                    method:'POST',
                    url:'projectTypes/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token') 
                    },
                    data:{
                        name:this.type.name,
                        name_code:this.type.code
                    }
                }).then(response =>{
                    this.type.id = '',
                    this.type.name = '',
                    this.addTypeDialog = false,
                    this.snackbar = true,
                    this.snackbarColor = 'success',
                    this.snackbarText = '添加成功'
                    this.getTypeFromApi()
                    .then(data =>{
                        this.types = data.data
                        totalTypes = data.total
                    })
                   
                }).catch(error =>{
                    this.snackbar = true,
                    this.snackbarColor = 'error',
                    this.snackbarText = error.response.data.message
                })
            })
        },
        editTypeToApi(){
            return new Promise((resolve,reject) =>{
                axios({
                    method:'PUT',
                    url:'projectTypes/'+this.type.id+'/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                    data:{
                        name: this.type.name
                    }
                }).then(response =>{
                    this.type.id = '',
                    this.type.name = ''
                    this.editTypeDialog = false,
                    this.snackbar = true,
                    this.snackbarColor = 'success',
                    this.snackbarText = '修改成功'             
                    this.getTypeFromApi()
                    .then(data => {
                        this.types = data.data
                        totalTypes = data.total
                    })
                    }).catch(error =>{
                        this.snackbar = true,
                        this.snackbarColor = 'error',
                        this.snackbarText = error.response.data.message
                })
            })
        },
        editTypeDialogData(item){
            if(this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')){
                this.type.id = item.id
                this.type.name = item.name
                this.editTypeDialog = true
            }else{
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = '无操作权限'
                return false
            }
        },
        deleteType(item){
            if(this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')){
                if(confirm("确认删除\""+ item.id + "\"?\n删除后将无法复原！")){
                    axios({
                        url:'projectTypes/'+item.id+'/',
                        method: 'DELETE',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(response => {
                        this.snackbarText = '成功删除作业类型',
                        this.snackbarColor = 'success',
                        this.snackbar = true
                        this.getTypeFromApi()
                        .then(response =>{
                            this.types = response.data
                            this.totalTypes = response.total
                        }).catch(error =>{
                            this.snackbar = true,
                            this.snackbarColor = 'error',
                            this.snackbarText = error.response.data.message
                        })
                    })
                }
            }else{
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = '无操作权限'
                return false
            }
        }
    },
    mounted(){
        this.pagination.descending = true
        this.pagination.sortBy = 'id'
        this.pagination.rowsPerPage = 25
        this.getTypeFromApi()
        .then(data =>{
            this.types = data.data
            this.totalTypes = data.total
        })
    },
    watch:{
        pagination:{
            handler(){
                this.getTypeFromApi()
                .then(data =>{
                    this.types = data.data
                    this.totalTypes = data.total
                })
            }
        }
    }
}
</script>
<style>
    .addProjectType{
        margin: 20px
    }
</style>
