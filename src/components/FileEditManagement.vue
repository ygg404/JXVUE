<template>
    <v-container fluid>
        <v-card width="100%">
            <v-card-title class="headline">文件管理</v-card-title>
            <v-card-title>
                <v-layout row wrap style="display: flex;flex-wrap: wrap">
                    <el-date-picker v-model="chooseDate" type ="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="dateType">
                    </el-date-picker>
                    <v-flex xs2><v-select v-model="user" :items="userList" item-text="userName" item-value="userName" placeholder="上传者" class="chooseT" clearable ></v-select></v-flex>

                    <v-flex xs2><v-text-field v-model="search" append-icon="search" placeholder="关键词搜索" label="search" single-line hide-details clearable style="margin-left: 10px;"></v-text-field></v-flex>
                    <v-flex xs3><el-cascader style="min-width: 200px;margin-top:15px;margin-left: 15px;" clearable  v-model="value" :options="filetypeList" placeholder="类目选择" @change="handleItemChange"></el-cascader></v-flex>
                    <v-flex xs1><v-btn slot="activator" color="primary" dark class="mb-2" @click="openFileDialog">提交文件</v-btn></v-flex>
                </v-layout>

            </v-card-title>
            <v-data-table :headers="headers" :items="filelist" :loading="loading" :total-items="totalFile" :pagination.sync="pagination" class="elevation-1" must-sort>
                <template slot="items" slot-scope="props">
                    <td>{{props.item.fileNo}}</td>
                    <td>{{props.item.fileName}}</td>
                    <td>{{props.item.filetype}}</td>
                    <td>{{props.item.createUser}}</td>
                    <td>{{props.item.createTime}}</td>
                    <v-btn color="blue darken-1" flat @click="viewPdfDialog(props.item)" title="查看" class="controllEdit"><v-icon small> search</v-icon>预览</v-btn>
                    <v-btn color="green" flat @click="downloadFile(props.item)" title="下载" class="controllEdit"><v-icon small>gavel </v-icon>下载</v-btn>
                    <v-btn color="blue darken-1" flat @click="editFileListDialog(props.item)" title="修改" class="controllEdit" v-if="props.item.createUserId == userId || permissions.includes('all_permission')" ><v-icon small> edit</v-icon>修改</v-btn>
                    <v-btn color="red" flat @click="deleteFileDialog(props.item)" title="删除" class="controllEdit" v-if="props.item.createUserId == userId || permissions.includes('all_permission')" ><v-icon small>delete </v-icon>删除</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog max-width="500px" v-model="addFileDialog" persistent>
            <v-card>
                <v-card-title><span class="title">上传文件</span></v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="fileItem.fileName" label="文件名名称:" prepend-icon="book" :rules="noteRules"></v-text-field>
                                <v-flex xs3><el-cascader style="min-width: 200px;margin-top:15px;margin-left: 15px;" clearable v-model="fileItem.fileType" :options="filetypeList" placeholder="类目选择" :rules="noteRules" @change="handlePostItemChange"></el-cascader></v-flex>
                                <el-upload :rules="noteRules"
                                            :action="uploadUrl"
                                           :limit="1"
                                           name="file"
                                           accept=".pdf,.docx,.doc,.xls,.xlsx,.ppt,.pptx,.rar,.zip"
                                           :on-change="onUploadChange"
                                           :headers="tokenHeaders"

                                           :on-success="handleSuccess"
                                           :on-error="handleError"
                                           :file-list="fileuploadList">
                                    <el-button size="small" plain style="margin:20px 15px 0 ">选择文件</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传pdf、word、ppt、excel文件，且不超过10M</div>
                                </el-upload>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="colseFileDialog">取消</v-btn>
                    <v-btn color="info" @click="addFileToApi">提交</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog max-width="500px" v-model="editFileDialog" persistent>
            <v-card>
                <v-card-title><span class="title">修改上传文件信息</span></v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="fileItem.fileName" label="文件名名称:" prepend-icon="book" :rules="noteRules"></v-text-field>
                                <v-flex xs3><el-cascader style="min-width: 200px;margin-top:15px;margin-left: 15px;" clearable v-model="fileItem.fileType" :options="filetypeList" placeholder="类目选择" :rules="noteRules" @change="handlePostItemChange"></el-cascader></v-flex>
                                <el-upload :rules="noteRules"
                                           :action="uploadUrl"
                                           :limit="1"
                                           name="file"
                                           accept=".pdf,.docx,.doc,.xls,.xlsx,.ppt,.pptx,.rar,.zip"
                                           
                                           :headers="tokenHeaders"
                                           :on-change="onUploadChange"
                                           :on-success="handleSuccess"
                                           :on-error="handleError"
                                           :file-list="fileuploadList">
                                    <el-button size="small" plain style="margin:20px 15px 0 ">选择文件</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传pdf、word、ppt、excel文件，且不超过10M</div>
                                </el-upload>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="colseFileDialog">取消</v-btn>
                    <v-btn color="info" @click="updateFileToApi">更新</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--&lt;!&ndash;PDF 预览&ndash;&gt;-->
        <!--<el-dialog :title="文件预览"-->
                   <!--:visible.sync="viewVisible" width="80%" center-->
                   <!--@close='closeDialog'>-->
            <!--<div style="margin-bottom: 15px; text-align: right">-->
                <!--<el-button type="primary" size="small" @click.stop="previousPage">-->
                    <!--上一页-->
                <!--</el-button>-->
                <!--<el-button type="primary" size="small" @click.stop="nextPage">-->
                    <!--下一页-->
                <!--</el-button>-->
                <!--<span>当前第{{pdfPage}}页 / 共{{pageCount}}页</span>-->
            <!--</div>-->

            <!--<div >-->
                <!--<pdf-->
                        <!--:src="src"-->
                        <!--:page="pdfPage"-->
                        <!--@num-pages="pageCount = $event"-->
                        <!--@page-loaded="pdfPage = $event"-->
                        <!--style="display: inline-block; width: 100%"-->
                <!--&gt;</pdf>-->
            <!--</div>-->
        <!--</el-dialog>-->

        <v-dialog v-model="viewVisible" persistent width="85%"  >
            <v-card>
                <v-card-title><span class="title">文件预览</span>
                    <v-spacer></v-spacer>
                    <v-btn icon  @click="closeViewFileDialog">
                        <v-icon :color="color" large>close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <iframe
                                :src="url"
                                width="100%"
                                :height="wheight" />
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    import pdf from 'vue-pdf';
    import baseConf from '../plugins/BaseConfig'
    import store from "@/store.js"

    export default {
        name: "FileEditManagement",
        data: ()=>({
            color:'blue',
            url:'',
            userId: localStorage.getItem('userId'),
            user:'',
            userList:[],
            addFileDialog:false,
            editFileDialog:false,
            loading: false,
            filelist:[],
            fileuploadList:[],
            filetypeList:[],
            filetypeListArray:[],
            totalFile : 0,
            startDate:'',
            endDate:'',
            search:'',
            searchUserId:'',
            searchItemId:'',
            pagination: {},
            chooseDate:false,
            uploadUrl: baseConf.uploadUrl,
            headers:[
                {text:'文件编号',value:'fileNo'},
                {text:'文件名称',value:'fileName',sortable:false},
                {text:'文件所属类目',value:'fileType'},
                {text:'上传者',value:'createUser',sortable:false},
                {text:'上传时间',value:'createTime'}
            ],
            fileItem:{
                fileName : '',
                fileType : '',
                filetypeId: '',
                fileUrl:'',
                createTime:'',
            },
            tokenHeaders:{
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            noteRules:[
                v => !!v || "内容不能为空"
            ],
            //PDF预览
            viewVisible: false,
            src: null,
            pdfPage : 1,
            pageCount: 0,
            wheight:'',
            permissions:store.state.permissions,
        }),
        mounted(){
            this.wheight = (window.innerHeight - 230)  + 'px'
            this.pagination.descending = true;
            this.pagination.sortBy = 'fileNo';
            this.pagination.rowsPerPage = 25;
            this.getFiletypelistFromApi();
            this.getFilelistFromApi().then(data=>{}).catch(error=>{});
            this.getUserListFromApi().then(response=>{
                this.userList = response
            }).catch(error=>{});
        },
        methods:{
            //文件上传对话框初始化
            initFileItem:function(){
                this.fileuploadList = [];
                this.fileItem.fileName = '';
                // this.fileItem.fileType = '';
                this.fileItem.fileUrl = '';
                this.fileItem.filetypeId = '';
                this.fileItem.createTime = '';

            },
            colseFileDialog:function(item){
                this.editFileDialog = false;
                this.addFileDialog = false;
                this.initFileItem();
               // this.value = '';
            },
            openFileDialog(){
                this.initFileItem();
                this.addFileDialog = true;
            },
            getUserListFromApi() {
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'GET',
                        url: 'user/',
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(response => {
                        resolve(response.data)
                    }).catch(error => {
                        reject(error.response.data)
                    })
                })
            },
            //获取所有文件类型
            getFiletypelistFromApi:function(){
                return new Promise((resolve,reject) =>{
                    axios({
                        methods:'GET',
                        url:'filetype/getFileTypeList/',
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        this.filetypeListArray = response.data;
                        this.filetypeList =this.formateTreelist(response.data, 0 , 1);
                        console.log(this.filetypeList);
                        resoleve(response.data)
                    }).catch(error=>{
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
                            value : datalist[i].id,
                            label : datalist[i].name
                        }
                        flist.push(file);
                    }
                }
                for(let f of flist){
                    let children = this.formateTreelist(datalist,f.value , depth + 1);
                    if(children.length != 0 ) f.children = children;
                }
                return flist;
            },
            // 文件上传成功时的钩子
            handleSuccess(res, file, fileList) {
                this.$notify.success({
                    title: '成功',
                    message: '文件上传成功'
                });
                this.fileItem.fileName = file.name;
                this.fileItem.fileUrl = res.message;
            },
            // 文件上传失败时的钩子
            handleError(err, file, fileList) {
                this.$notify.error({
                    title: '错误',
                    message: '文件上传失败'
                });
            },
            // 上传文件之前的钩子
            onUploadChange(file){
                let size = file.size / 1024 / 1024
                if(size > 10) {
                    this.$notify.warning({
                        title: '警告',
                        message: '文件大小必须小于10M'
                    })
                    return false;
                }else{
                    return true;
                }
            },
            getFilelistFromApi:function () {
                if(this.chooseDate == null || this.chooseDate.length == 0){
                    this.startDate = ''
                    this.endDate = ''
                }else if(this.chooseDate.length > 0){
                    this.startDate = this.chooseDate[0]
                    this.endDate = this.chooseDate[1]
                }
                if(this.search == null){
                    this.search = '';
                }
                return new Promise((resolve,reject) =>{
                    this.loading = true
                    axios({
                        methods:'GET',
                        url:'filelist/getFilelist/',
                        params:{
                            page: this.pagination.page,
                            rowsPerPage: this.pagination.rowsPerPage,
                            sortBy: this.pagination.sortBy,
                            descending: this.pagination.descending,
                            search: this.search,
                            startDate: this.startDate,
                            endDate: this.endDate,
                            userId:this.searchUserId,
                            typeId:this.searchItemId
                        },
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        this.filelist = response.data.data;
                        for(let file of this.filelist){
                            file.filetype = this.getAllParent(this.filetypeListArray , file.filetypeId);
                        }
                        this.totalFile = response.data.total
                        this.loading = false
                     //   resoleve(response.data)
                    }).catch(error=>{
                        this.loading = false
                    //    reject(error.response)
                    })
                })
            },
            //修改编辑窗口
            editFileListDialog:function(item){
                this.editFileDialog = true;
                this.fileuploadList = [];
                this.fileuploadList = this.fileuploadList.push(item.fileName);
                this.fileItem.fileNo = item.fileNo;
                this.fileItem.filetypeId = item.filetypeId;
                this.fileItem.fileName = item.fileName;
                this.fileItem.fileType = this.getAllFiletypeId([] , item.filetypeId);
                this.fileItem.fileUrl = item.fileUrl;
                this.fileItem.createTime = item.createTime;

            },
            //根据类别id获取所有父类id
            getAllFiletypeId:function(filetypelist ,id){
                filetypelist.unshift(id);
                //找出父id
                let pid = 0;
                for(let index = 0; index < this.filetypeListArray.length; index++ ){
                    if(this.filetypeListArray[index].id == id){
                        pid = this.filetypeListArray[index].pid;
                    }
                }
                if(pid == 0){
                    return filetypelist;
                }else{
                    for(let index = 0; index < this.filetypeListArray.length; index++ ){
                        if(this.filetypeListArray[index].id == pid){
                            return this.getAllFiletypeId(filetypelist , pid);
                        }
                    }
                }

            },


            //删除文件
            deleteFileDialog:function (item) {
                return new Promise((resolve, reject) => {
                    this.$confirm('此操作将永久删除该文件编号为"' + item.fileNo + '", 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios({
                            url: '/filelist/',
                            method: 'DELETE',
                            headers: {
                                Authorization: 'Bearer ' + sessionStorage.getItem("token")
                            },
                            params: {
                                fileNo: item.fileNo,
                            }
                        }).then(response => {
                            this.$message({
                                type: 'success',
                                message: response.data.message
                            });
                            this.getFilelistFromApi();
                        }).catch(error => {
                        })
                    })
                })
            },
            //下载文件
            downloadFile(item){
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = baseConf.webUrl + 'fileList/download/?fileNo=' + item.fileNo
                link.setAttribute('download', item.fileName)
                document.body.appendChild(link)
                link.click()
            },


            //关闭窗口初始化PDF页码
            closeDialog(){
                this.pdfPage = 1;
            },
            closeViewFileDialog(){
                this.url = '';  //清空文件地址
                this.viewVisible = false;
            },
            //PDF改变页数
            previousPage(){
                var p = this.pdfPage
                p = p>1?p-1:this.pageCount
                this.pdfPage = p
            },
            nextPage(){
                var p = this.pdfPage
                p = p<this.pageCount?p+1:1
                this.pdfPage = p
            },
            //预览文件
            viewPdfDialog:function (item) {
                this.viewVisible = true;
                let postfix = item.fileUrl.substring(item.fileUrl.lastIndexOf('.'));
                console.log(postfix);
                if(postfix == '.pdf'){
                    this.url = baseConf.uploadFileUrl + item.fileUrl;
                }else{
                    this.url = 'https://view.officeapps.live.com/op/view.aspx?src=' + baseConf.uploadFileUrl + item.fileUrl;
                }
                //this.previewPDF(item)
            },
            //查询类目选择改变
            handleItemChange:function(val){
                if(val.length == 0){
                    this.searchItemId = ''
                }else {
                    this.searchItemId = val[val.length - 1];
                }
                this.getFilelistFromApi();
            },
            //提交编辑类目选择改变
            handlePostItemChange:function (val) {
                if(val.length == 0){
                    this.fileItem.filetypeId = ''
                }else {
                    this.fileItem.filetypeId = val[val.length - 1];
                }
            },
            //提交文件
            addFileToApi:function () {
                if(this.fileItem.fileUrl == "" || this.fileItem.filetypeId == "" || this.fileItem.fileName == "" ){
                    this.$message({
                        type: 'error',
                        message: '有必填项为空'
                    });
                    return false
                }
                return new Promise((resolve,reject) =>{
                    axios({
                        url: '/filelist/addFilelist/',
                        method: 'POST',
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                            },
                            data: {
                                fileNo: '',
                                fileName: this.fileItem.fileName,
                                fileUrl: this.fileItem.fileUrl,
                                filetypeId:this.fileItem.filetypeId,
                                createUserId: this.userId,
                                createTime: ''
                            }
                        }).then(response => {
                            this.$message({
                                type: 'success',
                                message: response.data.message
                            });
                            this.initFileItem();
                            this.addFileDialog = false;
                            this.getFilelistFromApi();
                        }).catch(error => {
                        })
                    })

            },
            //更新文件信息
            updateFileToApi:function () {
                if(this.fileItem.fileUrl == "" || this.fileItem.filetypeId == "" || this.fileItem.fileName == "" ){
                    this.$message({
                        type: 'error',
                        message: '有必填项为空'
                    });
                    return false
                }
                return new Promise((resolve,reject) =>{
                    axios({
                        url: '/filelist/update/',
                        method: 'POST',
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        },
                        data: {
                            fileNo: this.fileItem.fileNo,
                            fileName: this.fileItem.fileName,
                            fileUrl: this.fileItem.fileUrl,
                            filetypeId:this.fileItem.filetypeId,

                        }
                    }).then(response => {
                        this.$message({
                            type: 'success',
                            message: response.data.message
                        });
                        this.initFileItem();
                        this.editFileDialog = false;
                        this.getFilelistFromApi();
                    }).catch(error => {
                    })
                })
            },
            //获取所有类目父类
            getAllParent:function( datalist , pid){
                if(pid == 0){
                    return ''
                }
                for(let data of datalist){
                    if(data.id == pid ){
                        return  this.getAllParent(datalist , data.pid) + '/' + data.name;
                    }
                }
            },
        },
        watch: {
            pagination: {
                handler() {
                    this.getFilelistFromApi()
                        .then(success => {
                            this.projects = success.data
                            this.total = success.data
                        }).catch(error => {

                    })
                }
            },
            search: {
                handler() {
                    this.getFilelistFromApi().then(data => {
                    }).catch(error => {
                    })
                }
            },
            chooseDate:{
                handler(){
                    this.getFilelistFromApi().then(data=>{}).catch(error=>{})
                }
            },
            user:{
                handler() {
                    this.searchUserId = '';
                    for(let userInfo of this.userList){
                        if(userInfo.userName == this.user){
                            this.searchUserId = userInfo.id;
                            break;
                        }
                    }
                    this.getFilelistFromApi().then(data => {
                    }).catch(error => {
                    })
                }
            },
        }
    }
</script>

<style scoped>
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

    .closeBtn{
        margin-right: 10px;
        color:dodgerblue;
    }
</style>