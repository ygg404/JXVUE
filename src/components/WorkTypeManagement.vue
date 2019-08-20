<template>
<v-container fluid>
    <v-card width="100%">
        <v-flex xs2>
            <v-btn slot="activator" color="primary" class="addType" @click="addType"> 添加作业类型 </v-btn>
        </v-flex>
            <v-dialog max-width="500px" v-model="addTypeDialog" persistent>
                <v-card>
                    <v-card-title><span class="title">添加作业类型</span></v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="type.name" label="作业类型名称:"></v-text-field>
                                <v-text-field v-model="type.unit" label="工作量计量单位:"></v-text-field>
                                <v-text-field v-model="type.output" label="每单位产值:" type="number"></v-text-field>
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
                    <v-card-title><span class="title">更改作业类型</span></v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="type.name" label="作业类型名称:"></v-text-field>
                                <v-text-field v-model="type.unit" label="工作量计量单位:"></v-text-field>
                                <v-text-field v-model="type.output" label="每单位产值:" type="number" ></v-text-field>
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
                <td>{{props.item.typeName}}</td>
                <td>{{props.item.typeUnit}}</td>
                <td>{{props.item.typeOut}}</td>
                <td>
                    <v-btn color="blue darken-1" flat class="typeBtn" @click="editTypeDialogData(props.item)"><v-icon small>edit</v-icon>编辑</v-btn>
                    <v-btn color="error" flat @click="deleteType(props.item)"><v-icon color="error" small>delete</v-icon>删除</v-btn>
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
        search:'',
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
            unit:'',
            output:''
        },
        headers:[
            {text:'编号',value:'id'},
            {text:'作业类型名称',value:'type_name'},
            {text:'工作计量单位',value:'unit'},
            {text:'每单位产值',value:'unit_output'}
        ]
    }),
    methods:{
        getTypesFromApi(){
            return new Promise((resolve,reject) =>{
                this.loading = true
                const { sortBy, descending, page, rowsPerPage } = this.pagination
                axios({
                    method:'GET',
                    url:'workType/',
                    params:{
                        page: this.pagination.page,
                        rowsPerPage: this.pagination.rowsPerPage,
                        descending: this.pagination.descending,
                        sortBy: this.pagination.sortBy,
                        search: this.search
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
        },
        addType(){
            if(this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')){
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
                    url:'workType/',
                    headers:{
                        Authorization: "Bearer " +sessionStorage.getItem('token') 
                    },
                    data:{
                        typeName:this.type.name,
                        typeUnit:this.type.unit,
                        typeOutput:this.type.output
                    }
                }).then(response =>{
                    this.getTypesFromApi()
                    .then(data =>{
                        this.types = data.data
                        this.totalTypes = data.total
                    })
                    this.type.id = '',
                    this.type.name = '',
                    this.type.unit = '',
                    this.type.output = '',
                    this.addTypeDialog = false,
                    this.snackbar = true,
                    this.snackbarColor = 'success',
                    this.snackbarText = '添加成功'
                }).catch(error =>{
                    this.snackbar = false,
                    this.snackbarColor = 'error',
                    this.snackbarText = error.response.data.message
                })
            })
        },
        editTypeToApi(){
            return new Promise((resolve,reject) =>{
                axios({
                    method:'PUT',
                    url:'workType/'+this.type.id+'/',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    },
                    data:{
                        typeName: this.type.name,
                        typeUnit: this.type.unit,
                        typeOutput: this.type.output
                    }
                }).then(response =>{
                    this.type.id = '',
                    this.type.name = '',
                    this.type.unit = '',
                    this.type.output = '',
                    this.editTypeDialog = false,
                    this.snackbar = true,
                    this.snackbarColor = 'success',
                    this.snackbarText = '添加成功'             
                    this.getTypesFromApi()
                    .then(data => {
                        this.types = data.data
                        totalTypes = data.total
                    })
                }).catch(error =>{
                        this.snackbar = false,
                        this.snackbarColor = 'error',
                        this.snackbarText = error.response.data.message
                    })
            })
        },
        editTypeDialogData(item){
            if(!this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')){
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = '无操作权限'
                return false
            }else{
                this.type.id = item.id
                this.type.name = item.typeName
                this.type.unit = item.typeUnit
                this.type.output = item.typeOutput
                this.editTypeDialog = true
            }
        },
        deleteType(item){
            if(!this.permissions.includes('all_permission') || this.permissions.includes('sys_setting')){
                this.snackbar = true
                this.snackbarColor = 'error'
                this.snackbarText = '无操作权限'
                return false
            }
            if(confirm("确认删除\""+ item.id + "\"?\n删除后将无法复原！")){
                axios({
                    url:'workType/'+item.id+'/',
                    method: 'DELETE',
                    headers:{
                        Authorization: "Bearer " + sessionStorage.getItem('token')
                    }
                }).then(response => {
                    this.snackbarText = '成功删除作业类型',
                    this.snackbarColor = 'success',
                    this.snackbar = true
                    this.getTypesFromApi()
                    .then(response =>{
                        this.types = response.data
                        this.totalTypes = response.total
                    })
                }).catch(error =>{
                        this.snackbar = true,
                        this.snackbarColor = 'error',
                        this.snackbarText = error.response.data.message
                    })
            }
        }
    },
    mounted(){
        this.pagination.descending = true
        this.pagination.rowsPerPage = 25
        this.getTypesFromApi()
        .then(data =>{
            this.types = data.data
            this.totalTypes = data.total
        })
    },
    watch:{
        pagination:{
            handler(){
                this.getTypesFromApi()
                .then(data=>{
                    this.types = data.data
                    this.totalTypes = data.total
                })
            }
        }
    }
}
</script>
<style>
    .addType{
        margin: 20px
    }
</style>
