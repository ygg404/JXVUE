<template>
    <v-container fluid>
        <v-card width="100%">
                <v-flex xs2>
                    <v-btn slot="activator" color="primary" class="addShort" @click="addShort">新增快捷短语</v-btn>
                </v-flex>

                    <v-dialog max-width="500px" v-model="addShortDialog" persistent>
                        <v-card>
                            <v-card-title><span class="title">添加快捷短语</span></v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-layout wrap>
                                    <v-flex md12>
                                        <v-select v-model="short.name" :items="types" label="输入项" item-value="type_name" item-text="type_name"></v-select>
                                        <v-text-field v-model="short.note" label="内容:" :rules="noteRules"></v-text-field>
                                    </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click="addShortDialog = false">取消</v-btn>
                                <v-btn color="info" @click="addShortToApi">新增</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog max-width="500px" v-model="editShortDialog" persistent>
                        <v-card>
                            <v-card-title><span class="title">更改快捷短语</span></v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-layout wrap>
                                    <v-flex md12>
                                        <v-select v-model="short.name" :items="types" label="输入项" item-value="type_name" item-text="type_name"></v-select>
                                        <v-text-field v-model="short.note" label="内容:" :rules="noteRules"></v-text-field>
                                    </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click="editShortDialog = false">取消</v-btn>
                                <v-btn color="info" @click="editShortToApi">修改</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>


                <v-data-table :headers="headers" :items="shorts" :loading="loading" :total-items="totalShorts" :pagination.sync="pagination" must-sort>
                    <template slot="items" slot-scope="props">
                    <td>{{props.item.id}}</td>
                    <td>{{props.item.shortName}}</td>
                    <td>{{props.item.shortNote}}</td>
                    <td>
                        <v-btn color="blue darken-1" flat class="shortBtn" @click="editShortDialogData(props.item)"><v-icon small>edit</v-icon>编辑</v-btn>
                        <v-btn color="error" flat @click="deleteShort(props.item)"><v-icon color="error" small>delete</v-icon>删除</v-btn>
                    </td>
                    </template>
                </v-data-table>
                <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
                    {{snackbarText}}
                </v-snackbar>
        </v-card>
    </v-container>
</template>

<script>
import store from '@/store.js'
export default {
    data:()=>({
        shorts:[],
        types:[],
        totalShorts:0,
        loading:false,
        pagination:{},
        addShortDialog:'',
        editShortDialog:'',
        snackbar:false,
        snackbarColor:'',
        snackbarText:'',
        snackbarTimeout:2000,
        permissions: JSON.parse(localStorage.getItem('permissions')),
        short:{
            id:'',
            name:'',
            note:''
        },
        headers:[
            {text:'编号',value:'id'},
            {text:'输入项',value:'shortcut_name'},
            {text:'文字内容',value:'shortcut_note'}
        ],
        nameRules:[
            v => !!v || "输入项不能为空"
        ],
        noteRules:[
            v => !!v || "内容不能为空"
        ]
    }),
    methods:{
        getShortFromApi(){
            return new Promise((resolve,reject) =>{
                this.loading = true
                const{ page, rowsPerPage, descending, sortBy } = this.pagination
                axios({
                    method:'GET',
                    url:'shortcut/',
                    params:{
                        page: this.pagination.page,
                        rowsPerPage: this.pagination.rowsPerPage,
                        descending: this.pagination.descending,
                        sortBy: this.pagination.sortBy
                    },
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    }
                }).then(response => {
                    this.loading = false
                    resolve(response.data)
                }).catch(error => {
                    this.loading = false
                    reject(error.response.data)
                })
            })
        },
        getTypeFromApi(){
            return new Promise((resolve,reject) =>{
                axios({
                    method:'GET',
                    url:'shortcut/type/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    }
                }).then(response =>{
                    resolve(response.data)
                }).catch(error =>{
                    reject(error.response.data)
                })
            })
        },
        addShort(){
            if(!this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')){
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = '无操作权限'
                return false
            }else{
                this.getTypeFromApi()
                .then(success =>{
                    this.types = success
                })
                this.addShortDialog = true
            }
        },
        addShortToApi(){
            return new Promise((resolve,reject) =>{
                axios({
                    method:'POST',
                    url:'shortcut/',
                    headers:{
                        Authorization: "Bearer " +sessionStorage.getItem('token') 
                    },
                    data:{
                        shortName:this.short.name,
                        shortNote:this.short.note
                    }
                }).then(response =>{
                    this.short.id = '',
                    this.short.name = '',
                    this.short.note = '',
                    this.addShortDialog = false,
                    this.snackbar = true,
                    this.snackbarColor = 'success',
                    this.snackbarText = '添加成功',
                    this.getShortFromApi()
                    .then(data =>{
                        this.shorts = data.data
                        this.totalShorts = data.total
                    })
                }).catch(error =>{
                    this.snackbar = true,
                    this.snackbarColor = 'error',
                    this.snackbarText = error.response.data.message
                })
            })
        },
        editShortToApi(){
            return new Promise((resolve,reject) =>{
                axios({
                    method:'PUT',
                    url:'shortcut/'+this.short.id+'/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                    data:{
                        shortName:this.short.name,
                        shortNote:this.short.note
                    }
                }).then(response =>{
                    this.short.id = '',
                    this.short.name = '',
                    this.short.note = ''
                    this.editShortDialog = false,
                    this.snackbar = true,
                    this.snackbarColor = 'success',
                    this.snackbarText = '添加成功',          
                    this.getShortFromApi()
                    .then(data => {
                        this.shorts = data.data
                        this.totalShorts = data.total
                    })
                }).catch(error =>{
                    this.snackbar = true,
                    this.snackbarColor = 'error',
                    this.snackbarText = error.response.data.message
                })
            })
        },
        editShortDialogData(item){
            if(!this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')){
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = '无操作权限'
                return false
            }else{
                this.getTypeFromApi()
                .then(success =>{
                    this.types = success
                })
                this.short.id = item.id
                this.short.name = item.shortName
                this.short.note = item.shortNote
                this.editShortDialog = true
            }
        },
        deleteShort(item){
            if(!this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')){
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = '无操作权限'
                return false
            }
            if(confirm("确认删除\""+ item.id + "\"?\n删除后将无法复原！")){
                axios({
                    url:'shortcut/'+item.id+'/',
                    method: 'DELETE',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    }
                }).then(response => {
                    this.snackbarText = '成功删除作业类型',
                    this.snackbarColor = 'success',
                    this.snackbar = true
                    this.getShortFromApi()
                    .then(response =>{
                        this.shorts = response.data
                        this.totalShorts = response.total
                    }).catch(error =>{
                        this.snackbar = true,
                        this.snackbarColor = 'error',
                        this.snackbarText = error.response.data.message
                    })
                })
            }
        }
    },
    mounted(){
        this.pagination.descending = true
        this.pagination.rowsPerPage = 25
        this.getShortFromApi()
        .then(data=>{
            this.shorts = data.data
            this.totalShorts = data.total
        })
    },
    watch:{
        pagination:{
            handler(){
                this.getShortFromApi()
                .then(data=>{
                    this.shorts = data.data
                    this.totalShorts = data.total
                })
            }
        }
    }
}
</script>
    
<style>
    .addShort{
        margin: 20px
    }
</style>
