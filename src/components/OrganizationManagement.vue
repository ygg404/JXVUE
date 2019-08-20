<template>
    <el-card style="margin: 20px;">
        <el-button style="margin: 20px;" type="primary" icon="el-icon-plus">
            新增部门
        </el-button>
        <el-table
                :data="tableData"
                row-key="id"
                border
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
                    prop="fullName"
                    label="部门"
                    width="290">
            </el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
    export default {
        name: "OrganizationManagement",
        data() {
            return {
                tableData: [{
                    id: 1,
                    fullName: '服务中心',
                    children: [{
                        id :22,
                        fullName: '测绘一',
                        children:[{
                            id : 33,
                            fullName:'作业组一',
                        },{
                            id : 34,
                            fullName:'作业组二',
                        }]
                    }]
                }]
            }
        },
        methods:{
            handleEdit(){

            },
            handleDelete(){

            },
            //获取部门列表API
            getOrganiztionApi(){

            }
        },
        mounted:{

        }
    }
</script>

<style scoped>

</style>
