<template>
    <v-container fluid>
        <v-card width="100%">
            <v-card-title class="headline">文件类型</v-card-title>
            <!--<v-treeview-->
                <!--dense-->
                <!--:open-all = "true"-->
                <!--:items="items"-->
            <!--&gt;</v-treeview>-->

            <el-row>
                <el-button style="margin-left:20px;" type="success" @click="handleAddMain">添加类目</el-button>
                <el-button type="primary" @click="handleViewCate">类目预览</el-button>
            </el-row>
            <el-table v-loading="loading"
                    :data="tableData"
                    style="width: 100%;margin-bottom: 20px;"
                    default-expand-all
                    :row-key="row_key"
                    :expand-row-keys="expandRowKeys"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

                <el-table-column v-if="false" prop="id"></el-table-column>
                <el-table-column v-if="false" prop="pid"></el-table-column>
                <el-table-column

                        prop="name"
                        label="类别名称"
                        max-width="180">
                </el-table-column>
                <el-table-column
                        prop="depth"
                        :formatter="formatDepth"
                        label="类目级别"
                        max-width="40">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                   size="mini"
                                   @click="handleAdd(scope)">添加下级类目</el-button>
                        <el-button
                                size="mini"
                                @click="handleEdit(scope)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="顺序" style="max-width: 50px;">
                    <template slot-scope="scope">
                        <v-btn color="blue darken-1" flat @click="uplocation(scope)" class="controllLo"><v-icon small> arrow_upward</v-icon></v-btn>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog
                    :close-on-click-modal='false'
                    title="类目预览"
                    :visible.sync="viewCateVisible"
                    width="30%"
                    >
                <el-form>
                    <el-cascader style="min-width: 200px;margin-top:15px;margin-left: 15px;" clearable  v-model="value" :options="filetypeList" placeholder="类目选择" @change="handleItemChange"></el-cascader>
                </el-form>
                <el-form>
                    <div style="min-height: 120px;"></div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="viewCateVisible=false">关闭</el-button>
                  </span>
            </el-dialog>

            <el-dialog
                    :close-on-click-modal='false'
                    title="添加文件类目"
                    :visible.sync="dialogVisible"
                    width="30%">
                <el-form :label-position="left" label-width="100px" :rules="rules" :model="fileItem" ref="fileItem">
                    <el-form-item  label="类目名称:" prop="name">
                        <el-input v-model="fileItem.name" placeholder="请输入类目名称"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="resetForm('fileItem')">取 消</el-button>
                    <el-button type="primary" @click="addForm('fileItem')">确 定</el-button>
                  </span>
            </el-dialog>

            <el-dialog
                    title="修改文件类目"
                    :visible.sync="editVisible"
                    :close-on-click-modal='false'
                    width="30%">
                <el-form :label-position="left" label-width="100px" :rules="rules" :model="fileItem" ref="fileItem">
                    <el-form-item label="上级类目:" >
                        <el-input v-model="fileItem.parentName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="类目名称:" prop="name">
                        <el-input v-model="fileItem.name" placeholder="请输入类目名称"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="resetForm('fileItem')">取 消</el-button>
                    <el-button type="primary" @click="updateForm('fileItem')">确 定</el-button>
                  </span>
            </el-dialog>

            <el-dialog
                    title="添加下级类目"
                    :visible.sync="addVisible"
                    :close-on-click-modal='false'
                    width="30%">
                <el-form :label-position="left" label-width="100px" :rules="rules" :model="fileItem" ref="fileItem">
                    <el-form-item label="上级类目:" >
                        <el-input v-model="fileItem.parentName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="类目名称:" prop="name" >
                        <el-input v-model="fileItem.name" placeholder="请输入类目名称"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="resetForm('fileItem')">取 消</el-button>
                    <el-button type="primary" @click="addForm('fileItem')">确 定</el-button>
                  </span>
            </el-dialog>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "FileManagement",
        data() {
            return {
                dialogVisible:false,
                editVisible:false,
                addVisible:false,
                open: true,
                loading:false,
                tableData: [],
                fileItem: {
                    pid: '',
                    parentName:'',
                    id:'',
                    name:'',
                },
                parentList:'', //父类目录
                rules: {
                    name: [
                        { required: true, message: '请输入类目名称', trigger: 'blur' },
                    ],
                },
                expandRowKeys:[],
                viewCateVisible:false,
                filetypeList:[]
            };
        },
        computed: {

        },
        mounted() {
            this.getFiletypelistFromApi();

        },
        methods: {
            row_key(row){
                return row.name;
            },
            handleViewCate:function(){
                this.viewCateVisible = true;
            },
            // 三个操作结点的事件
            handleDelete:function(item){
                return new Promise((resolve,reject) =>{
                    this.$confirm('此操作将永久删除该类目"'+ item.row.name +'", 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                            axios({
                                url: '/filetype/',
                                method: 'DELETE',
                                headers: {
                                    Authorization: 'Bearer ' +sessionStorage.getItem('token')
                                },
                                params:{
                                    id:item.row.id
                                }
                            }).then(response => {
                                this.$message({
                                    type: 'success',
                                    message: response.data.message
                                });
                                this.getFiletypelistFromApi();
                            }).catch(error=>{})
                        });
                });
            },
            handleAddMain:function(){
              this.dialogVisible = true;
              this.fileItem.id = '';
              this.fileItem.name = '';
              this.fileItem.pid = 0;
              this.fileItem.sort = 999;
            },
            handleAdd:function(item){
                this.addVisible = true;
                this.fileItem.id = '';
                this.fileItem.name = '';
                let plname = this.getAllParent(this.tableData , item.row.id)
                this.fileItem.parentName = plname == ''?item.row.name: plname  +  item.row.name ;
                this.fileItem.pid = item.row.id;
            },
            handleEdit:function(item){
                this.editVisible = true;
                this.fileItem.id = item.row.id;
                this.fileItem.name = item.row.name;
                this.fileItem.parentName = this.getAllParent(this.tableData , item.row.id);
                this.fileItem.pid = item.row.pid;
                console.log(item.row.pid)
                console.log(item.row.id);
                console.log( this.getAllParent(this.tableData , item.row.id) );
                //this.$emit("onAppendClick", this.node);
            },
            //获取所有父类
            getAllParent:function( datalist , id){
                //console.log('datas：' + datalist)
                for(let data of datalist){
                    if(data.id == id ){
                      //  console.log(data.name);
                        return '';
                    }
                    else if(data.children != undefined) {
                       // console.log(data.children)
                        let name = this.getAllParent(data.children, id)

                        if (name != undefined) {
                           // console.log(data.name + '>'+ name);
                            return data.name + '/'+ name
                        }
                    }
                    else {
                        return;
                    }
                }
            },
            //获取所有文件类型
            getFiletypelistFromApi:function(){
                return new Promise((resolve,reject) =>{
                    this.loading = true
                    axios({
                        methods:'GET',
                        url:'filetype/getFileTypeList/',
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        for(let tdata of response.data) this.expandRowKeys.push(tdata.name);
                        this.filetypeList =this.formateTreeCascader(response.data, 0 , 1);
                        this.tableData =this.formateTreelist(response.data, 0 , 1);

                        this.loading = false
                        resoleve(response.data)
                    }).catch(error=>{
                        this.loading = false
                        //reject(error.response)
                    })
                })
            },
            //形成类目树形json
            formateTreelist:function(datalist,pid,depth){
                let flist = [];
                for ( let i = 0; i <datalist.length; i++){
                    if(datalist[i].pid == pid){
                        let file = {
                            id : datalist[i].id,
                            pid: datalist[i].pid,
                            depth:depth,
                            name : datalist[i].name,
                            sort:datalist[i].sort
                        }
                        flist.push(file);
                    }
                }
                for(let f of flist){
                    f.children = this.formateTreelist(datalist,f.id , depth + 1);
                }
                return flist;
            },
            //形成类目树形级联器
            formateTreeCascader:function(datalist,pid,depth){
                let flist = [];
                for ( let i = 0; i <datalist.length; i++){
                    if(datalist[i].pid == pid){
                        let file = {
                            value : datalist[i].id,
                            label : datalist[i].name
                        }
                        flist.push(file);
                    }
                }
                for(let f of flist){
                    let children = this.formateTreeCascader(datalist,f.value , depth + 1);
                    if(children.length != 0 ) f.children = children;
                }
                return flist;
            },
            addForm:function(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        return new Promise((resolve,reject) =>{
                            this.loading = true
                            axios({
                                method:'POST',
                                url:'filetype/addFiletype/',
                                headers:{
                                    Authorization: 'Bearer ' + sessionStorage.getItem("token")
                                },
                                data:{
                                    id: this.fileItem.id,
                                    pid: this.fileItem.pid,
                                    sort: this.fileItem.sort,
                                    name: this.fileItem.name
                                }
                            }).then(response=>{
                                this.$message({
                                    type: 'success',
                                    message: response.data.message
                                });
                                this.dialogVisible = false;
                                this.addVisible = false;
                                this.loading = false;
                                this.getFiletypelistFromApi();
                                //resoleve(response.data)
                            }).catch(error=>{
                                this.loading = false
                               // reject(error.response)
                            })
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            updateForm:function(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        return new Promise((resolve,reject) => {
                            this.loading = true
                            axios({
                                method: 'POST',
                                url: 'filetype/update/',
                                headers: {
                                    Authorization: 'Bearer ' + sessionStorage.getItem("token")
                                },
                                data: {
                                    id: this.fileItem.id,
                                    pid: this.fileItem.pid,
                                    sort: this.fileItem.sort,
                                    name: this.fileItem.name
                                }
                            }).then(response => {
                                this.$message({
                                    type: 'success',
                                    message: response.data.message
                                });
                                this.editVisible = false;
                                this.loading = false;
                                this.getFiletypelistFromApi();
                                //resoleve(response.data)
                            }).catch(error => {
                                this.loading = false
                                // reject(error.response)
                            })
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm:function(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible = false;
                this.editVisible = false;
                this.addVisible = false;
            },
            //改变列表顺序
            uplocation:function(item){
                return new Promise((resolve,reject) => {
                        axios({
                            method: 'POST',
                            url: 'filetype/updatesort/',
                            headers: {
                                Authorization: 'Bearer ' + sessionStorage.getItem("token")
                            },
                            data: {
                                id: item.row.id,
                                pid: item.row.pid,
                                sort: item.row.sort,
                                name: item.row.name
                            }
                        }).then(response => {
                            this.getFiletypelistFromApi();
                        })
                });
            },
            // 菜单等级
            formatDepth:function(row, column) {
                let depthList = [ '一','二','三','四','五','六','七','八'];
                return '第' + depthList[row.depth - 1] + '级类目' ;
            },
        }
    }
</script>
