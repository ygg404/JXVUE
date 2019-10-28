<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                <v-layout align-start justify-start row fill-height>
                    <v-flex xs2>
                        <v-btn slot="activator" color="primary" dark class="mb-2" @click="addContract">添加合同</v-btn>
                    </v-flex>
                    <v-flex xs5>
                        <el-date-picker v-model="chooseDate" type ="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="dateType">
                        </el-date-picker>
                    </v-flex>
                    <v-flex xs3><v-text-field v-model="search" append-icon="search" placeholder="关键词搜索" label="search" single-line hide-details></v-text-field></v-flex>
                </v-layout>
            </v-card-title>


            <el-table :data="contracts" border v-loading="loading" style="width: 100%" class="elTable" @sort-change="changeSort">
                <el-table-column type="expand" >
                    <template slot-scope="props">
                        <el-table  :data="props.row.planRateList" style="width: 100%;" :row-class-name="getTableclass" border>
                            <el-table-column label="项目名称" prop="projectName"></el-table-column>
                            <el-table-column label="项目启动时间" prop="startDateTime"></el-table-column>
                            <el-table-column label="预算产值" prop="project_output"></el-table-column>
                            <el-table-column label="实际产值" prop="actuallyOutput"></el-table-column>
                            <el-table-column prop="project_rate" label="进度" >
                                <template slot-scope="scope">
                                    <el-progress :text-inside="true"  :stroke-width="26" :percentage="scope.row.project_rate" ></el-progress>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column prop="contractNo" header-align="center" align="center" width="120" label="合同编号" sortable :sort-orders="['descending','ascending']"></el-table-column>
                <el-table-column prop="contractName" header-align="center" align="left" label="合同名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="contractAuthorize" header-align="center" align="center" label="委托单位" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="typeId" header-align="center" align="center" width="100" label="合同类型">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.typeId === 0" size="small" type="danger">合同委托</el-tag>
                        <el-tag v-else-if="scope.row.typeId === 1" size="small" type="success">一般合同</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="contractAddTime" header-align="center" align="center" width="120" label="签订时间"></el-table-column>
                <el-table-column header-align="center" align="left" width="300" label="操作" style="z-index: -1">
                    <template slot-scope="scope">
                        <el-button type="warning" size="mini" @click="addProject(scope.row)">添加项目</el-button>
                        <el-button type="primary" size="mini" @click="editContractDialogData(scope.row)">修改</el-button>
                        <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
                        <el-button v-if="scope.row.fileName" type="success" size="mini" @click="downloadFile(scope.row)">下载</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 7px;width: auto;text-align: right;"
                    @size-change="sizeChangeHandle"
                    @current-change="currentChangeHandle"
                    :current-page="pagination.page"
                    :page-sizes="[25, 50, 100]"
                    :page-size="pagination.rowsPerPage"
                    :total="totalContracts"
                    layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </v-card>

        <v-dialog max-width="500px" v-model="addContractDialog" persistent>
            <v-card>
                <v-card-title><span class="title">添加合同</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="contract.contractName" label="合同名称:" :rules="noteRules" prepend-icon="calendar_today"></v-text-field>
                                <v-text-field v-model="contract.contractNo" label="合同编号:" :rules="noteRules" prepend-icon="book" disabled></v-text-field>
                                <v-select v-model="contract.projectType" label="项目类型:" :rules="noteRules" :items="types" item-text="name" item-value="name" prepend-icon="storage" multiple></v-select>
                                <v-text-field v-model="contract.contractMoney" label="合同金额:" :rules="noteRules" prepend-icon="monetization_on" type="number"></v-text-field>
                                <v-radio-group v-model="contract.typeId" :rules="noteRules" row>
                                    <v-radio label="合同委托" value="0"></v-radio>
                                    <v-radio label="一般委托" value="1"></v-radio>
                                </v-radio-group>
                                <v-text-field v-model="contract.contractAuthorize" label="委托单位:" :rules="noteRules" prepend-icon="event_note" ></v-text-field>
                                <v-text-field v-model="contract.contractNote" label="委托要求:" :rules="noteRules" prepend-icon="description" ></v-text-field>
                                <v-text-field v-model="contract.contractUserName" label="联系人:" prepend-icon="how_to_reg"></v-text-field>
                                <v-text-field v-model="contract.contractUserPhone" label="联系电话:" @blur="getPhone()" prepend-icon="call"></v-text-field>
                                <v-select label="业务负责人:" v-model="contract.contractBusiness" :rules="noteRules" :items="projectCharges" item-text="userName" item-value="userName" prepend-icon="work"></v-select>
                                <!-- <v-text-field v-model="" label="签订时间:" :rules="noteRules" prepend-icon="event" readonly></v-text-field> -->
                                 <v-menu v-model="addDateMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="contract.contractAddTime" label="签订时间:" prepend-icon="event" readonly  v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="contract.contractAddTime" @input="addDateMenu = false"></v-date-picker>
                                    </v-menu>
                                <el-upload :action="upContractUrl"
                                        :data="{'contractNo': contract.contractNo}"
                                        :limit="1"
                                        name="file"
                                        accept=".pdf"
                                        :headers="tokenHeaders"
                                        :before-upload="handleBeforeUpload"
                                        :on-success="handleSuccess"
                                        :on-error="handleError"
                                        :file-list="fileList">
                                        <el-button size="small" plain>选择文件</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过10M</div>
                                </el-upload>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="addContractDialog = false">取消</v-btn>
                    <v-btn color="info" @click="addContractToApi">添加</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog max-width="500px" v-model="addProjectDialog" persistent>
            <v-card>
                <v-card-title><span class="title">添加项目</span>
                    <v-layout justify-end>
                        <v-flex xs4 >
                            <v-select label="生产负责人" v-model="project.project_produce" :items="projectCharges" item-text="userName" item-value="userName"></v-select>
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="project.project_no" label="项目编号" prepend-icon="list_alt" disabled></v-text-field>
                                <v-text-field v-model="project.contractName" label="选择合同:" item-text="contractName" item-value="contractNo" prepend-icon="list_alt" disabled></v-text-field>
                                <v-text-field v-model="project.project_name" label="项目名称:" prepend-icon="calendar_today" ></v-text-field>
                                <v-text-field v-model="project.project_type" label="项目类型:" prepend-icon="book" disabled></v-text-field>
                                <v-text-field v-model="project.project_authorize" label="委托单位:" prepend-icon="nature" disabled></v-text-field>
                                <v-text-field v-model="project.user_name" label="联系人姓名:" prepend-icon="how_to_reg" disabled></v-text-field>
                                <v-text-field v-model="project.user_phone" label="联系电话:" prepend-icon="phone" type="number" disabled></v-text-field>
                                <v-text-field v-model="project.project_note" label="委托要求:" prepend-icon="live_help" disabled></v-text-field>
                                <v-text-field v-model="project.project_charge" label="业务负责人:"  prepend-icon="account_box" disabled></v-text-field>
                                <v-menu v-model="addProjectDateMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="project_start_date" label="项目启动时间:" prepend-icon="event" readonly  v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="project_start_date" @input="addProjectDateMenu = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="colseaddProjectDialog">取消</v-btn>
                    <!--<v-btn color="success" @click="putStage">提交至项目安排</v-btn>-->
                    <v-btn color="info" @click="addProjectToApi">新增</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog max-width="500px" v-model="editDialog" persistent>
            <v-card>
                <v-card-title><span class="title">修改合同数据</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex md12>
                                <v-text-field v-model="contract.contractName" label="合同名称:" :rules="noteRules" prepend-icon="calendar_today">
                                </v-text-field>
                                <v-text-field v-model="contract.contractNo" label="合同编号:" :rules="noteRules" prepend-icon="book" disabled></v-text-field>
                                <v-select v-model="contract.projectType" label="项目类型:" :rules="noteRules" :items="types" item-text="name" item-value="name" prepend-icon="storage" multiple></v-select>
                                <v-text-field v-model="contract.contractMoney" label="合同金额:" :rules="noteRules" prepend-icon="monetization_on" type="number"></v-text-field>
                                <v-radio-group v-model="contract.typeId" row >
                                    <v-radio label="合同委托" value="0"></v-radio>
                                    <v-radio label="一般委托" value="1"></v-radio>
                                </v-radio-group>
                                <v-text-field v-model="contract.contractAuthorize" label="委托单位:" :rules="noteRules" prepend-icon="event_note" ></v-text-field>
                                <v-text-field v-model="contract.contractNote" label="委托要求:" :rules="noteRules" prepend-icon="description" ></v-text-field>
                                <v-text-field v-model="contract.contractUserName" label="联系人:" prepend-icon="how_to_reg"></v-text-field>
                                <v-text-field v-model="contract.contractUserPhone" label="联系电话:" @focus="getPhone()" prepend-icon="call"></v-text-field>
                                <v-select label="业务负责人:" v-model="contract.contractBusiness" :rules="noteRules" :items="projectCharges" item-text="userName" item-value="userName" prepend-icon="work"></v-select>
                                <v-menu v-model="dateEditMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="contract.contractAddTime" label="签订时间:" :rules="noteRules" prepend-icon="event" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="contract.contractAddTime" @input="dateEditMenu = false"></v-date-picker>
                                </v-menu>
                                 <el-upload
                                        :action="upContractUrl"
                                        :data="{'contractNo': contract.contractNo}"
                                        :limit="1"
                                        name="file"
                                        accept=".pdf"
                                        :headers="tokenHeaders"
                                        :before-upload="handleBeforeUpload"
                                        :on-success="handleSuccess"
                                        :on-error="handleError"
                                        :file-list="fileList">
                                        <el-button size="small" plain>选择文件</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过10M</div>
                                    </el-upload>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="editDialog = false">取消</v-btn>
                    <v-btn color="info" @click="editContractToApi">修改</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout" top>
            {{snackbarText}}
        </v-snackbar>
    </v-container>
</template>

<script>
    import store from '@/store.js'
    import BaseConfig from '../plugins/BaseConfig'

    export default {
        data: ()=>({
            types:[],
            projectCharges:[],
            fileList:[],
            type:'',
            contracts:[],
            loading: false,
            dateEditMenu:false,
            totalContracts : 0,
            addDateMenu: false,
            addProjectDateMenu:false,
            startDate:'',
            chooseDate:false,
            pagination:{},
            dateMenu:false,
            endDate:'',
            search:'',
            clearable:false,
            addContractDialog:false,
            editDialog:false,
            snackbar:false,
            snackbarColor:'',
            snackbarText:'',
            snackbarTimeout:2000,
            permissions:JSON.parse(localStorage.getItem('permissions')),
            headers:[
                {text:'合同编号',value:'contractNo'},
                {text:'合同名称',value:'contractName',sortable:false},
                {text:'委托单位',value:'contractAuthorize',sortable:false},
                {text:'合同类型',value:'typeId',sortable:false},
                {text:'签订时间',value:'contractAddTime'}
            ],
            contract:{
                contractNo:'',
                contractName:'',
                contractAuthorize:'',
                projectType:'',
                contractMoney:'',
                typeId:'',
                // contractAddTime:new Date().toISOString().substr(0, 10),
                contractAddTime:'',
                contractNote:'',
                contractBusiness:'',
                contractUserName:'',
                contractUserPhone:''
            },
            noteRules:[
                v => !!v || "内容不能为空"
            ],
            tokenHeaders:{
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            upContractUrl: BaseConfig.upContractUrl,  //合同上传路径
            downContractUrl: BaseConfig.downContractUrl,  //合同下载路径接口,
            pageIndex: 1,
            pageSize: 25,
            totalPage: 0,

            addProjectDialog:false,
            project:{
                contractNo:'',
                project_no:'',
                project_name:'',
                project_num:'',
                project_type:'',
                project_money:'',
                project_authorize:'',
                user_name:'',
                user_phone:'',
                project_note:'',
                project_charge:'',
                project_produce:''
            },
            project_start_date:''
        }),
        methods:{
            colseaddProjectDialog(){
                this.stageId = 1
                this.project.project_no = ''
                this.project.project_name = ''
                this.project.project_num = ''
                this.project.project_type = ''
                this.project.project_money = ''
                this.project.project_authorize = ''
                this.project.user_name = ''
                this.project.user_phone = ''
                this.project.project_note = ''
                this.project.project_charge = ''
                this.project_start_date = ''
                this.addProjectDialog = false
            },
            coloseeditProjectDialog(){
                this.stageId = 1
                this.project.project_no = ''
                this.project.project_name = ''
                this.project.project_num = ''
                this.project.project_type = ''
                this.project.project_money = ''
                this.project.project_authorize = ''
                this.project.user_name = ''
                this.project.user_phone = ''
                this.project.project_note = ''
                this.project.project_charge = ''
                this.project_start_date = ''
                this.editProjectDialog = false
            },
            addProject(item){
                // this.getContractName().then(response=>{
                //
                // }).catch(error=>{})
                this.project.project_no = item.contractNo
                this.project.contractName = item.contractName
                this.project.project_name = item.contractName
                this.project.project_type = item.projectType
                this.project.project_money = item.contractMoney
                this.project.project_authorize = item.contractAuthorize
                this.project.user_name = item.contractUserName
                this.project.user_phone = item.contractUserPhone
                this.project.project_note = item.contractNote
                this.project.project_charge = item.contractBusiness
                this.project_start_date = ''

                this.addProjectDialog = true
            },
            getPhone(){
                if(this.contract.contractUserPhone != ''){
                    if (!(/^1[34578]\d{9}$/.test(this.contract.contractUserPhone))) {
                        alert("码格式错误,请输入正确格式的号码");
                        this.contract.contractUserPhone = "";
                    }
                }

            },
            getContractFromApi(){
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
                        method:'GET',
                        url:'contract/',
                        params:{
                            page: this.pagination.page,
                            rowsPerPage: this.pagination.rowsPerPage,
                            sortBy: this.pagination.sortBy,
                            descending: this.pagination.descending,
                            search: this.search,
                            startDate: this.startDate,
                            endDate: this.endDate
                        },
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        this.contracts = response.data.data
                        this.totalContracts =  response.data.total
                        this.loading = false
                        resoleve(response.data)
                    }).catch(error=>{
                        this.loading = false
                        reject(error.response)
                    })
                })
            },
            // 上传文件之前的钩子
            handleBeforeUpload(file){
                let size = file.size / 1024 / 1024 / 10
                if(size > 10) {
                    this.$notify.warning({
                    title: '警告',
                    message: '图片大小必须小于10M'
                    })
                }
            },
            // 文件上传成功时的钩子
            handleSuccess(res, file, fileList) {
            this.$notify.success({
                title: '成功',
                message: '文件上传成功'
            });
            },
            // 文件上传失败时的钩子
            handleError(err, file, fileList) {
            this.$notify.error({
                title: '错误',
                message: '文件上传失败'
            });
            },

            addContractToApi(){
                return new Promise((resolve,reject) =>{
                    if(this.contract.contractName == "" || this.contract.projectType == "" ||
                        this.contract.contractMoney == "" || this.contract.contractNote == "" ||
                        this.contract.contractAuthorize == ""|| this.contract.contractBusiness == ""){
                        this.snackbar = true
                        this.snackbarColor = 'error'
                        this.snackbarText = '有必填项为空，请重新检查'
                        return false
                    }
                    let projectType = '';
                    for(let type of this.contract.projectType){
                        projectType += type + ','
                    }
                    projectType=projectType.substring(0,projectType.length-1);
                    axios({
                        method:'POST',
                        url:'contract/',
                        data:{
                            contractNo: this.contract.contractNo,
                            contractAddTime: this.contract.contractAddTime,
                            typeId: this.contract.typeId,
                            contractAuthorize: this.contract.contractAuthorize,
                            projectType:projectType,
                            contractName: this.contract.contractName,
                            contractMoney: this.contract.contractMoney,
                            contractNote:this.contract.contractNote,
                            contractBusiness:this.contract.contractBusiness,
                            contractUserName:this.contract.contractUserName,
                            contractUserPhone:this.contract.contractUserPhone
                        },
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        this.contract.contractNo = ''
                        this.contract.contractAddTime = ''
                        this.contract.typeId = ''
                        this.contract.contractAuthorize = ''
                        this.contract.contractName = ''
                        this.contract.contractMoney =''
                        this.contract.projectType= ''
                        this.contract.contractNote = ''
                        this.contract.contractBusiness=''
                        this.contract.contractUserName=''
                        this.contract.contractUserPhone=''
                        this.getContractFromApi().then(success=>{}).catch(error=>{})
                        this.addContractDialog = false,
                            this.snackbar = true,
                            this.snackbarColor = 'success',
                            this.snackbarText = '添加成功'
                    }).catch(error=>{
                        this.snackbar = false,
                            this.snackbarColor = 'error',
                            this.snackbarText = error.response.data.message
                    })
                })
            },
            deleteItem(item){
                if(!this.permissions.includes('all_permission')){
                    this.snackbarColor = 'error'
                    this.snackbarText = '无操作权限'
                    this.snackbar = true
                    return false
                }
                if(confirm("确认将合同编号为\""+item.contractNo+"\"的合同删除?\n删除后将无法复原!")){
                    axios({
                        url: 'contract/',
                        method: 'DELETE',
                        headers: {
                            Authorization: 'Bearer ' +sessionStorage.getItem('token')
                        },
                        params:{
                            contractNo:item.contractNo
                        }
                    }).then(response => {
                        this.snackbarText = '成功删除'
                        this.snackbarColor = 'success'
                        this.snackbar = true
                        this.getContractFromApi()
                            .then(success =>{
                            }).catch(error =>{
                        })
                    }).catch(error=>{})
                }
            },
            downloadFile(item){
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = this.downContractUrl  + item.contractNo
                link.setAttribute('download', item.fileName)
                document.body.appendChild(link)
                link.click()
            },
            editContractToApi(){
                let ptype = '';
                for(let type of this.contract.projectType){
                     ptype += type + ','
                }
                ptype = ptype.substring(0,ptype.length-1);
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'contract/update/',
                        data:{
                            contractNo: this.contract.contractNo,
                            contractAddTime: this.contract.contractAddTime,
                            typeId: this.contract.typeId,
                            contractAuthorize: this.contract.contractAuthorize,
                            contractName: this.contract.contractName,
                            contractMoney: this.contract.contractMoney,
                            contractNote:this.contract.contractNote,
                            contractBusiness:this.contract.contractBusiness,
                            projectType:ptype,
                            contractUserName:this.contract.contractUserName,
                            contractUserPhone:this.contract.contractUserPhone
                        },
                        headers:{
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response=>{
                        this.contract.contractNo = ''
                        this.contract.contractAddTime = ''
                        this.contract.typeId = ''
                        this.contract.contractAuthorize = ''
                        this.contract.contractName = ''
                        this.contract.contractNote = ''
                        this.contract.contractMoney =''
                        this.contract.contractBusiness=''
                        this.contract.contractUserName=''
                        this.contract.contractUserPhone=''
                        this.getContractFromApi().then(success=>{}).catch(error=>{})
                        this.editDialog = false,
                            this.snackbar = true,
                            this.snackbarColor = 'success',
                            this.snackbarText = '更新成功'
                    }).catch(error=>{
                        this.snackbar = false,
                            this.snackbarColor = 'error',
                            this.snackbarText = error.response.data.message
                    })
                })
            },
            editContractDialogData(item){
                this.contract.projectType = [];
                let typeNameList = [];
                for(let typeobj of this.types){
                    typeNameList.push(typeobj.name);
                }
                let typelist = item.projectType.split(',');
                for(let type of typelist){
                    if(type != '' && type != null && typeNameList.indexOf(type) != -1)this.contract.projectType.push(type);
                }

                this.contract.contractNo = item.contractNo
                this.contract.contractAddTime = item.contractAddTime
                this.contract.typeId = item.typeId + ''
                this.contract.contractAuthorize = item.contractAuthorize
                this.contract.contractName = item.contractName
                this.contract.contractNote = item.contractNote
                // this.contract.projectType = item.projectType
                this.contract.contractMoney =item.contractMoney
                this.contract.contractBusiness=item.contractBusiness
                this.contract.contractUserName=item.contractUserName
                this.contract.contractUserPhone=item.contractUserPhone
                this.editDialog = true
            },
            addContract(){
                this.addContractDialog = true
                this.contract.contractAddTime = ''
                this.contract.typeId = ''
                this.contract.contractAuthorize = ''
                this.contract.contractName = ''
                this.contract.contractNo = ''
                this.contract.contractName = ''
                this.contract.contractMoney =''
                this.contract.projectType = ''
                this.contract.contractNote = ''
                this.contract.contractBusiness=''
                this.contract.contractUserName=''
                this.contract.contractUserPhone=''
                //this.contract.contractNo = this.getNowFormatDate()
                var that = this
                this.getNowFormatDate().then(function (data) {
                    that.contract.contractNo = data;
                })
            },
            /**
             * 获取当前时间
             * 格式YYYY-MM-DD
             */
            getNowFormatDate : function() {
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'GET',
                        url: 'contract/getContractNumMax',
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(response => {
                        console.log(response.data)
                        resolve(response.data)
                    }).catch(error => {
                        reject(error.response.data)
                    })
                })

                // var date = new Date();
                // var year = date.getFullYear();
                // var month = date.getMonth() + 1;
                // var day = date.getDay();
                // var hour = date.getHours();
                // var min = date.getMinutes();
                // var second = date.getSeconds();
                //
                // var strDate = date.getDate();
                // if (month >= 1 && month <= 9) {
                //     month = "0" + month;
                // }
                // if (strDate >= 0 && strDate <= 9) {
                //     strDate = "0" + strDate;
                // }
                // if(day >1 && day <=9){
                //     day = '0' + day;
                // }
                // if(hour > 1 && hour <= 9){
                //     hour = "0" + hour;
                // }
                // if(min > 1 && min <= 9){
                //     min = "0" + min;
                // }
                // if(second > 1 && second <= 9){
                //     second = "0" + second;
                // }
                //
                // var currentdate = year + month + day + hour + min + second;
                // return currentdate;
            },
            getChargeFromApi() {
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'GET',
                        url: 'user/business/',
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        }
                    }).then(response => {
                        console.log(response.data)
                        resolve(response.data)
                    }).catch(error => {
                        reject(error.response.data)
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
            // 每页数
            sizeChangeHandle (val) {
                this.pagination.rowsPerPage = val
                this.pagination.page = 1
                this.getContractFromApi()
            },
            // 当前页
            currentChangeHandle (val) {
                this.pagination.page = val
                this.getContractFromApi()
            },
            // 排序字段改变
            changeSort (val) {
                console.log(val)
                switch (val.order) {
                    case 'ascending':
                        this.pagination.descending = false
                        break
                    case 'descending':
                        this.pagination.descending = true
                        break
                }
                this.pagination.sortBy = 'id'
                this.getContractFromApi()
            },
            putStage(){
                this.isPutToPlan = true,
                    this.stageId = 2,
                    this.addProjectToApi().then(success =>{}).catch(error =>{})
            },
            addProjectToApi(){
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'POST',
                        url:'project/' + this.userId + '/',
                        headers:{
                            Authorization: "Bearer " +sessionStorage.getItem('token')
                        },
                        data:{
                            contractNo:this.project.contractNo,
                            projectName: this.project.project_name,
                            projectNum: this.project.project_num,
                            projectMoney: this.project.project_money,
                            projectAuthorize: this.project.project_authorize,
                            userName: this.project.user_name,
                            userPhone: this.project.user_phone,
                            projectNote: this.project.project_note,
                            projectCharge: this.project.project_charge,
                            projectStartDateTime: this.project_start_date,
                            projectType: this.project.project_type,
                            projectStageId: this.stageId,
                            projectProduce:this.project.project_produce
                        }
                    }).then(response =>{
                        this.projectNo = response.data
                        this.getContract().then(success=>{
                            this.getProjectsFromApi().then(success =>{}).catch(error =>{})
                        }).catch()

                        if(this.isPutToPlan){
                            this.putToPlan().then(success=>{}).catch(error=>{})
                        }
                        this.stageId = 1
                        this.project.project_no = ''
                        this.project.project_name = ''
                        this.project.project_num = ''
                        this.project.project_type = ''
                        this.project.project_money = ''
                        this.project.project_authorize = ''
                        this.project.user_name = ''
                        this.project.user_phone = ''
                        this.project.project_note = ''
                        this.project.project_charge = ''
                        this.stageId = 1

                        this.addProjectDialog = false,
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
        },
        mounted(){
            this.pagination.descending = true
            this.pagination.sortBy = 'id'
            this.pagination.rowsPerPage = 25
            this.pagination.page = 1
            this.getContractFromApi()
                .then(success =>{

                }).catch(error=>{})
            this.getChargeFromApi().then(response=>{
                this.projectCharges = response
            }).catch(error=>{})
            this.getTypeFromApi()
                .then(response =>{
                    this.types = response
                }).catch(error =>{

            })

        },
        watch:{
            pagination:{
                handler(){
                    this.getContractFromApi()
                        .then(success =>{
                            this.contracts = success.data
                            this.total = success.data
                        }).catch(error=>{})
                }
            },
            search:{
                handler(){
                    this.getContractFromApi().then(data=>{}).catch(error=>{})
                }
            },
            chooseDate:{
                handler(){
                    this.getContractFromApi().then(data=>{}).catch(error=>{})
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
        margin-right: 5rem
    }

    .project_name_row{
        max-width:300px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }

    table.v-table tbody td{
        height: 32px;
    }

    .elTable th{
        padding: 5px 0!important;
    }

    .elTable td{
        padding: 3px 0!important;
    }
</style>

