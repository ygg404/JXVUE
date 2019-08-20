<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
                <v-card-text class="subheading">项目名称:{{output.projectName}}</v-card-text>
                <v-card-text class="subheading">
                  <blockquote>作业内容:{{output.projectWorkNote}}</blockquote>
                </v-card-text>
                <v-card-text class="subheading">项目负责人:{{output.projectCharge}}</v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>

    <v-layout align-start justify-end fill-height class="btnInfo">
      <v-btn @click="all">展开</v-btn>
      <v-btn @click="none">收起</v-btn>
    </v-layout>

    <!-- <v-layout > -->
        <v-card>
            <div class="workload_tip">预计工作量:     {{output.projectLoad}}</div>
            <div class="workload_bottom">作业工作量:     {{output.workLoad}}</div>
            <div class="workload_c">项目产值:     {{allOutput()}}</div>
        </v-card>
    <!-- </v-layout> -->

    <div class="content-container">
      <div class="left-data">
        <v-checkbox
          v-for="(types, index) in leftData"
          :key="index"
          :label="types.typeName"
          v-show="types.listIndex === lefeIndex"
          class="shrink mr-2"
          v-model="types.check"
        ></v-checkbox>
      </div>
      <!-- <div> -->
      <v-radio-group v-model="lefeIndex">
        <div v-for="(list, listIndex) in outputList" :key="listIndex">
          <v-card class="chooseCard" :class="{'not-margin-top': listIndex === 0}">
            <!-- <div>
            <h3>{{list.gName}}</h3>-->
            <v-radio :label="list.gName" :value="listIndex" />
            <!-- </div> -->
            <v-card-text>
              <v-data-table :headers="headers" hide-actions :items="chooseRatio(list.outPutWraps)">
                <template slot="items" slot-scope="props">
                  <td>{{props.item.typeName}}</td>
                  <td>{{props.item.typeUnit}}</td>
                  <td>{{props.item.typeOutput}}</td>
                  <td>
                    <v-flex xs10>
                      <v-text-field
                        v-model="props.item.projectRatio"
                        @change="addRatio(props.item)"
                        type="number"
                      ></v-text-field>
                    </v-flex>
                  </td>
                  <td>
                    <v-flex xs10>
                      <v-text-field
                        v-model="props.item.workLoad"
                        @change="addRatio(props.item)"
                        type="number"
                      ></v-text-field>
                    </v-flex>
                  </td>
                  <td>{{props.item.typeOut}}</td>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-text>
              <strong>预算产值:{{list.outPutNum}}</strong> &nbsp;&nbsp;&nbsp;&nbsp;
              <strong>总计产值:{{groupOutput(list.outPutWraps)}}</strong>
            </v-card-text>
          </v-card>
        </div>
        <!-- </div>     -->
      </v-radio-group>

    </div>
    <v-layout align-center justify-center fill-height class="bottomBtn">
      <v-btn color="orange" class="white--text" @click="$router.go(-1)">返回</v-btn>
      <v-btn color="info" @click="addOutPut">保存</v-btn>
      <v-btn color="success" @click="ToAuthorize">提交到审定</v-btn>
    </v-layout>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="snackbarTimeout"
      top
    >{{snackbarText}}</v-snackbar>
  </v-container>
</template>
<script>
import store from "@/store.js";
import { types } from "util";
export default {
  data: () => ({
    projectGroup: [],
    puttoAuthorize: false,
    projectNo: "",
    infoPanel: [false],
    planPanel: [false],
    workPanel: [false],
    qualityPanel: [false],
    peoPanel: [false],
    chooseType: [],
    chooseOutPut: [],
    workList: [],
    groupOutPutList: [],
    info: 1,
    projectOutPut: 0,
    output: {
      projectName: "",
      projectType: "",
      projectAuthorize: "",
      projectNote: "",
      projectUserName: "",
      projectPhone: "",
      projectCharge: "",
      projectSetup: "",
      projectWriter: "",
      projectBusiness: "",
      projectProduce: "",
      projectStartTime: "",
      projectEndTime: "",
      projectStage: "",
      projectExe: "",
      projectWorkNote: "",
      projectWorkRequire: "",
      disclosureNote: "",
      checkSuggestion: "",
      dataName: "",
      briefSummary: "",
      workLoad: "",
      projectLoad:"",
      qualityNote: "",
      qualitySuggestion: "",
      qualityScore: "",
      qualityLevel: ""
    },
    outputList: [],
    types: [],
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    snackbarTimeout: 2000,
    headers: [
      { text: "作业类型", sortable: false },
      { text: "工作量单位", sortable: false },
      { text: "单位产值", sortable: false },
      { text: "难度系数", sortable: false },
      { text: "工作量", sortable: false },
      { text: "产值", sortable: false }
    ],
    // 左侧框数据
    leftData: [], // 数据
    lefeIndex: 0 // 显示索引
  }),
  methods: {
    getProjectGroup() {
      return new Promise((resolve, reject) => {
        this.projectNo = this.$route.query.p_no;
        axios({
          method: "GET",
          url: "project/group/",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token")
          },
          params: {
            projectNo: this.projectNo
          }
        })
          .then(success => {
            this.projectGroup = success.data;
          })
          .catch(error => {});
      });
    },
    getOutPutData() {
      return new Promise((resolve, reject) => {
        this.projectNo = this.$route.query.p_no;
        axios({
          method: "GET",
          url: "project/output/",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token")
          },
          params: {
            projectNo: this.projectNo
          }
        })
          .then(success => {
            (this.output.projectName = success.data.projectName),
              (this.output.projectType = success.data.projectType),
              (this.output.projectAuthorize = success.data.projectAuthorize),
              (this.output.projectNote = success.data.projectNote),
              (this.output.projectUserName = success.data.projectUserName),
              (this.output.projectPhone = success.data.projectPhone),
              (this.output.projectCharge = success.data.projectCharge),
              (this.output.projectSetup = success.data.projectSetup),
              (this.output.projectWriter = success.data.projectWriter),
              (this.output.projectBusiness = success.data.projectBusiness),
              (this.output.projectProduce = success.data.projectProduce),
              (this.output.projectStartTime = success.data.projectStartTime),
              (this.output.projectEndTime = success.data.projectEndTime),
              (this.output.projectStage = success.data.projectStage),
              (this.output.projectExe = success.data.projectExe),
              (this.output.projectWorkNote = success.data.projectWorkNote),
              (this.output.projectWorkRequire =
                success.data.projectWorkRequire),
              (this.output.disclosureNote = success.data.disclosureNote),
              (this.output.checkSuggestion = success.data.checkSuggestion),
              (this.output.dataName = success.data.dataName),
              (this.output.briefSummary = success.data.briefSummary),
              (this.output.workLoad = success.data.workLoad),
              (this.output.projectLoad = success.data.projectWorkLoad),
              (this.output.qualityNote = success.data.qualityNote),
              (this.output.qualitySuggestion = success.data.qualitySuggestion),
              (this.output.qualityScore = success.data.qualityScore),
              (this.output.qualityLevel = success.data.qualityLevel),
              success.data.groupList.forEach(element => {
                this.groupOutPutList.push({
                  groupId: element.id,
                  projectOutPut: 0
                });
                // element.typeList = []
              });
            this.leftData = [];
            success.data.groupList.forEach((e, index) => {
              e.outPutWraps.forEach(ele => {
                ele.listIndex = index;
              });
              this.leftData = this.leftData.concat(e.outPutWraps);
            });
            this.outputList = success.data.groupList;
            console.log(this.outputList)
          })
          .catch(error => {});
      });
    },
    addOutPut() {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "project/output/",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token")
          },
          data: {
            projectNo: this.projectNo,
            groupList: this.outputList,
            outPutWrap: this.groupOutPutList
          }
        })
          .then(success => {
            if (this.puttoAuthorize) {
              this.snackbarColor = "success";
              this.snackbarText = "提交成功";
              this.snackbar = true;
              this.putToAuthorize()
                .then(success => {})
                .catch(error => {});
            } else {
              this.snackbarColor = "success";
              this.snackbarText = "保存成功";
              this.snackbar = true;
            }
          })
          .catch(error => {
            this.snackbarColor = "error";
            this.snackbarText = error.response.data;
            this.snackbar = true;
          });
      });
    },
    getTypeData() {
      return new Promise((resolve, reject) => {
        axios({
          method: "GET",
          url: "workType/",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token")
          }
        })
          .then(success => {})
          .catch(error => {});
      });
    },
    chooseRatio(params) {
      //  console.log(params)
      let temp = [];
      params.forEach(e => {
        if (e.check) {
          e.typeOut = this.numFilter(
            e.workLoad * e.projectRatio * e.typeOutput
          );
          if (e.projectRatio == null || e.workLoad == null) {
            e.projectRatio = 1;
            e.workLoad = 0;
          }
          temp.push(e);
        }
      });
      // temp.forEach(t=>{
      //     this.chooseOutPut.push(t)
      // })
      return temp;
    },
    groupOutput(item) {
      let count = 0.0;
      item.forEach(e => {
        if (e.check) {
          count += parseFloat(e.typeOut);
        }
      });
      // this.projectOutPut = this.numFilter(count)
      this.groupOutPutList.forEach(e => {
        // console.log(item)
        // console.log(e.groupId)
        // console.log(item.groupId)
        if (e.groupId == item[0].groupId) {
          e.projectOutPut = this.numFilter(count);
        }
      });
      return this.numFilter(count);
    },
    // chooseTypes(item){
    //     console.log(item)
    //     this.departmentFn(item)
    // },
    all() {
      (this.infoPanel = [true]),
        (this.planPanel = [true]),
        (this.workPanel = [true]),
        (this.qualityPanel = [true]),
        (this.peoPanel = [true]);
    },
    none() {
        (this.infoPanel = [false]),
        (this.planPanel = [false]),
        (this.workPanel = [false]),
        (this.qualityPanel = [false]),
        (this.peoPanel = [false]);
    },
    allOutput(){
        let count = 0.0;
        let allCount = 0.0;
        this.outputList.forEach(element=>{
            element.outPutWraps.forEach(e => {
                if (e.check) {
                    let output = e.projectRatio * e.typeOutput * e.workLoad
                    count += output;
                }
            });
           
        })
        return allCount += count
    },
    addRatio(item) {
      item.typeOut = this.numFilter(
        item.workLoad * item.projectRatio * item.typeOutput
      );
    },
    //保留小数点后两位的过滤器，尾数不四舍五入
    numFilter(value) {
      // 截取当前数据到小数点后三位
      let tempVal = parseFloat(value).toFixed(3);
      let realVal = tempVal.substring(0, tempVal.length - 1);
      return realVal;
    },
    //修改项目阶段
    putToAuthorize() {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "project/stage/",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token")
          },
          data: {
            projectStage: 6,
            projectNo: this.projectNo
          }
        }).then(success => {
          resolve(success.data);
          setTimeout(_ => {
            this.$router.go(-1);
          }, 1000);
        });
      });
    },
    ToAuthorize() {
        console.log(this.output.projectStage);
        if(this.output.projectStage != '产值核算'){
            this.snackbarColor = "error";
            this.snackbarText = "当前项目不在产值核算阶段，请在项目处理修改项目阶段！";
            this.snackbar = true;
            return;
        }
      this.puttoAuthorize = true;
      this.addOutPut()
        .then(success => {})
        .catch(error => {});
    }
  },
  computed: {
    countOut() {
      let count = 0.0;
      this.types.forEach(e => {
        if (e.choosedItem) {
          count += parseFloat(e.typeOut);
        }
      });
      this.projectOutPut = this.numFilter(count);
      return this.numFilter(count);
    }
  },
  created() {},
  mounted() {
    this.getOutPutData()
      .then(success => {})
      .catch(error => {});
    this.getTypeData()
      .then(success => {})
      .catch(error => {});
    this.getProjectGroup()
      .then(success => {})
      .catch(error => {});
  }
};
</script>
<style>
.content-container {
  display: flex;
}
.left-data {
  width: 300px;
  margin-top: 24px;
  padding: 5px;
  margin-right: 20px;
  overflow: auto;
  height: 600px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  background: white;
}
.workload_tip{
    padding-top: 20px;
    padding-left: 20px;
    font-size:18px;
}
.workload_bottom{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    font-size:18px;
}
.workload_c{
    padding-bottom: 20px;
     padding-left: 20px;
    font-size:18px
}
.not-margin-top {
  margin-top: 0 !important;
}
.titleInfo {
  font-size: 24px;
  text-align: center;
}
.btnInfo {
  margin-top: 24px;
}
.chooseCard {
  padding: 24px;
  margin-top: 24px;
}
.bottomBtn {
  margin-top: 24px;
}
</style>

