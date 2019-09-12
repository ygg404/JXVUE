<template>
    <v-container fluid>
        <v-card>
            <v-card-title><span class="title" style="margin-right: 20px">空间基准质量(权:0.3)</span><v-text-field label="质量元素扣分:" v-model="KJ_ElementDeduction" disabled></v-text-field></v-card-title>
            <v-card-text>
                <v-container>
                    <v-layout>
                        <v-flex md12>
                            <v-flex md2><v-text-field label="检查项（内容）:" value="坐标系统、高程系统的正确性" disabled></v-text-field></v-flex>
                            <v-flex md1><v-text-field label="检查类型:" v-model="qualityType1.check_type"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="检查结果:" v-model="qualityType1.check_result"></v-text-field></v-flex>
                            <v-flex md3>
                                <v-flex md4><span>错漏数量</span></v-flex>
                                <v-flex md4><v-text-field label="A类:" v-model="qualityType1.check_a" @change="add1()" type="number"></v-text-field></v-flex>
                                <v-flex md4><v-text-field label="B类:" v-model="qualityType1.check_b" @change="add1()" type="number"></v-text-field></v-flex>
                                <v-flex md4><v-text-field label="C类:" v-model="qualityType1.check_c" @change="add1()" type="number"></v-text-field></v-flex>
                                <v-flex md4><v-text-field label="D类:" v-model="qualityType1.check_d" @change="add1()" type="number"></v-text-field></v-flex>
                            </v-flex>
                            <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType1.checkPoints" disabled></v-text-field></v-flex>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex md12>
                            <v-flex md2><v-text-field label="检查项（内容）:" value="投影参数、转换参数的正确性" disabled></v-text-field></v-flex>
                            <v-flex md1><v-text-field label="检查类型:" v-model="qualityType2.check_type"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="检查结果:" v-model="qualityType2.check_result"></v-text-field></v-flex>
                            <v-flex md3>
                                <v-flex md2><span>错漏数量</span></v-flex>
                                <v-flex md2><v-text-field label="A类:" v-model="qualityType2.check_a" @change="add2()" type="number"></v-text-field></v-flex>
                                <v-flex md2><v-text-field label="B类:" v-model="qualityType2.check_b" @change="add2()" type="number"></v-text-field></v-flex>
                                <v-flex md2><v-text-field label="C类:" v-model="qualityType2.check_c" @change="add2()" type="number"></v-text-field></v-flex>
                                <v-flex md2><v-text-field label="D类:" v-model="qualityType2.check_d" @change="add2()" type="number"></v-text-field></v-flex>
                            </v-flex>
                            <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType2.checkPoints" disabled></v-text-field></v-flex>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex md12>
                            <v-flex md2><v-text-field label="检查项（内容）:" value="起算数据及选用的正确性、可靠性" disabled></v-text-field></v-flex>
                            <v-flex md1><v-text-field label="检查类型:" v-model="qualityType3.check_type"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="检查结果:" v-model="qualityType3.check_result"></v-text-field></v-flex>
                            <v-flex md3>
                                <v-flex md2><span>错漏数量</span></v-flex>
                                <v-flex md2><v-text-field label="A类:" @change="add3()" v-model="qualityType3.check_a" type="number"></v-text-field></v-flex>
                                <v-flex md2><v-text-field label="B类:" @change="add3()" v-model="qualityType3.check_b" type="number"></v-text-field></v-flex>
                                <v-flex md2><v-text-field label="C类:" @change="add3()" v-model="qualityType3.check_c" type="number"></v-text-field></v-flex>
                                <v-flex md2><v-text-field label="D类:" @change="add3()" v-model="qualityType3.check_d" type="number"></v-text-field></v-flex>
                            </v-flex>
                            <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType3.checkPoints" disabled></v-text-field></v-flex>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex md12>
                            <v-flex md2><v-text-field label="检查项（内容）:" value="控制测量成果" disabled></v-text-field></v-flex>
                            <v-flex md1><v-text-field label="检查类型:" v-model="qualityType4.check_type"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="检查结果:" v-model="qualityType4.check_result"></v-text-field></v-flex>
                            <v-flex md3>
                                <v-flex md2><span>错漏数量</span></v-flex>
                                <v-flex md2><v-text-field label="A类:" @change="add4()" v-model="qualityType4.check_a" type="number"></v-text-field></v-flex>
                                <v-flex md2><v-text-field label="B类:" @change="add4()" v-model="qualityType4.check_b" type="number"></v-text-field></v-flex>
                                <v-flex md2><v-text-field label="C类:" @change="add4()" v-model="qualityType4.check_c" type="number"></v-text-field></v-flex>
                                <v-flex md2><v-text-field label="D类:" @change="add4()" v-model="qualityType4.check_d" type="number"></v-text-field></v-flex>
                            </v-flex>
                            <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType4.checkPoints" disabled></v-text-field></v-flex>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-title><span class="title" style="margin-right: 20px">采集、定处理质量(权:0.4)</span><v-text-field label="质量元素扣分:" v-model="CJ_ElementDeduction" disabled></v-text-field></v-card-title><v-card-text>
            <v-container>
                <v-layout>
                    <v-flex md12>
                        <v-flex md2><v-text-field label="检查项（内容）:" value="平面坐标精度" disabled></v-text-field></v-flex>
                        <v-flex md1><v-text-field label="检查类型:" v-model="qualityType5.check_type"></v-text-field></v-flex>
                        <v-flex md2><v-text-field label="检查结果:" v-model="qualityType5.check_result"></v-text-field></v-flex>
                        <v-flex md3>
                            <v-flex md2><span>错漏数量</span></v-flex>
                            <v-flex md2><v-text-field label="A类:" @change="add5()" v-model="qualityType5.check_a" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="B类:" @change="add5()" v-model="qualityType5.check_b" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="C类:" @change="add5()" v-model="qualityType5.check_c" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="D类:" @change="add5()" v-model="qualityType5.check_d" type="number"></v-text-field></v-flex>
                        </v-flex>
                        <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType5.checkPoints" disabled></v-text-field></v-flex>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md12>
                        <v-flex md2><v-text-field label="检查项（内容）:" value="平面相对位置精度" disabled></v-text-field></v-flex>
                        <v-flex md1><v-text-field label="检查类型:" v-model="qualityType6.check_type"></v-text-field></v-flex>
                        <v-flex md2><v-text-field label="检查结果:" v-model="qualityType6.check_result"></v-text-field></v-flex>
                        <v-flex md3>
                            <v-flex md2><span>错漏数量</span></v-flex>
                            <v-flex md2><v-text-field label="A类:" @change="add6()" v-model="qualityType6.check_a" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="B类:" @change="add6()" v-model="qualityType6.check_b" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="C类:" @change="add6()" v-model="qualityType6.check_c" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="D类:" @change="add6()" v-model="qualityType6.check_d" type="number"></v-text-field></v-flex>
                        </v-flex>
                        <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType6.checkPoints" disabled></v-text-field></v-flex>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md12>
                        <v-flex md2><v-text-field label="检查项（内容）:" value="高程精度" disabled></v-text-field></v-flex>
                        <v-flex md1><v-text-field label="检查类型:" v-model="qualityType7.check_type"></v-text-field></v-flex>
                        <v-flex md2><v-text-field label="检查结果:" v-model="qualityType7.check_result"></v-text-field></v-flex>
                        <v-flex md3>
                            <v-flex md2><span>错漏数量</span></v-flex>
                            <v-flex md2><v-text-field label="A类:" @change="add7()" v-model="qualityType7.check_a" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="B类:" @change="add7()" v-model="qualityType7.check_b" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="C类:" @change="add7()" v-model="qualityType7.check_c" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="D类:" @change="add7()" v-model="qualityType7.check_d" type="number"></v-text-field></v-flex>
                        </v-flex>
                        <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType7.checkPoints" disabled></v-text-field></v-flex>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md12>
                        <v-flex md2><v-text-field label="检查项（内容）:" value="要素错误、缺漏情况" disabled></v-text-field></v-flex>
                        <v-flex md1><v-text-field label="检查类型:" v-model="qualityType8.check_type"></v-text-field></v-flex>
                        <v-flex md2><v-text-field label="检查结果:" v-model="qualityType8.check_result"></v-text-field></v-flex>
                        <v-flex md3>
                            <v-flex md2><span>错漏数量</span></v-flex>
                            <v-flex md2><v-text-field label="A类:" @change="add8()" v-model="qualityType8.check_a" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="B类:" @change="add8()" v-model="qualityType8.check_b" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="C类:" @change="add8()" v-model="qualityType8.check_c" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="D类:" @change="add8()" v-model="qualityType8.check_d" type="number"></v-text-field></v-flex>
                        </v-flex>
                        <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType8.checkPoints" disabled></v-text-field></v-flex>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md12>
                        <v-flex md2><v-text-field label="检查项（内容）:" value="属性错误、缺漏情况" disabled></v-text-field></v-flex>
                        <v-flex md1><v-text-field label="检查类型:" v-model="qualityType9.check_type"></v-text-field></v-flex>
                        <v-flex md2><v-text-field label="检查结果:" v-model="qualityType9.check_result"></v-text-field></v-flex>
                        <v-flex md3>
                            <v-flex md2><span>错漏数量</span></v-flex>
                            <v-flex md2><v-text-field label="A类:" @change="add9()" v-model="qualityType9.check_a" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="B类:" @change="add9()" v-model="qualityType9.check_b" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="C类:" @change="add9()" v-model="qualityType9.check_c" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="D类:" @change="add9()" v-model="qualityType9.check_d" type="number"></v-text-field></v-flex>
                        </v-flex>
                        <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType9.checkPoints" disabled></v-text-field></v-flex>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md12>
                        <v-flex md2><v-text-field label="检查项（内容）:" value="数据及结构的正确性" disabled></v-text-field></v-flex>
                        <v-flex md1><v-text-field label="检查类型:" v-model="qualityType10.check_type"></v-text-field></v-flex>
                        <v-flex md2><v-text-field label="检查结果:" v-model="qualityType10.check_result"></v-text-field></v-flex>
                        <v-flex md3>
                            <v-flex md2><span>错漏数量</span></v-flex>
                            <v-flex md2><v-text-field label="A类:" @change="add10()" v-model="qualityType10.check_a" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="B类:" @change="add10()" v-model="qualityType10.check_b" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="C类:" @change="add10()" v-model="qualityType10.check_c" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="D类:" @change="add10()" v-model="qualityType10.check_d" type="number"></v-text-field></v-flex>
                        </v-flex>
                        <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType10.checkPoints" disabled></v-text-field></v-flex>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        </v-card>
        <v-card>
            <v-card-title><span class="title" style="margin-right: 20px">成果质量(权:0.3)</span><v-text-field label="质量元素扣分:" v-model="CG_ElementDeduction" disabled></v-text-field></v-card-title><v-card-text>
            <v-container>
                <v-layout>
                    <v-flex md12>
                        <v-flex md2><v-text-field label="检查项（内容）:" value="图面表达质量" disabled></v-text-field></v-flex>
                        <v-flex md1><v-text-field label="检查类型:" v-model="qualityType11.check_type"></v-text-field></v-flex>
                        <v-flex md2><v-text-field label="检查结果:" v-model="qualityType11.check_result"></v-text-field></v-flex>
                        <v-flex md3>
                            <v-flex md2><span>错漏数量</span></v-flex>
                            <v-flex md2><v-text-field label="A类:" @change="add11()" v-model="qualityType11.check_a" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="B类:" @change="add11()" v-model="qualityType11.check_b" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="C类:" @change="add11()" v-model="qualityType11.check_c" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="D类:" @change="add11()" v-model="qualityType11.check_d" type="number"></v-text-field></v-flex>
                        </v-flex>
                        <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType11.checkPoints" disabled></v-text-field></v-flex>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md12>
                        <v-flex md2><v-text-field label="检查项（内容）:" value="表格表达质量" disabled></v-text-field></v-flex>
                        <v-flex md1><v-text-field label="检查类型:" v-model="qualityType12.check_type"></v-text-field></v-flex>
                        <v-flex md2><v-text-field label="检查结果:" v-model="qualityType12.check_result"></v-text-field></v-flex>
                        <v-flex md3>
                            <v-flex md2><span>错漏数量</span></v-flex>
                            <v-flex md2><v-text-field label="A类:" @change="add12()" v-model="qualityType12.check_a" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="B类:" @change="add12()" v-model="qualityType12.check_b" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="C类:" @change="add12()" v-model="qualityType12.check_c" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="D类:" @change="add12()" v-model="qualityType12.check_d" type="number"></v-text-field></v-flex>
                        </v-flex>
                        <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType12.checkPoints" disabled></v-text-field></v-flex>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md12>
                        <v-flex md2><v-text-field label="检查项（内容）:" value="计算质量" disabled></v-text-field></v-flex>
                        <v-flex md1><v-text-field label="检查类型:" v-model="qualityType13.check_type"></v-text-field></v-flex>
                        <v-flex md2><v-text-field label="检查结果:" v-model="qualityType13.check_result"></v-text-field></v-flex>
                        <v-flex md3>
                            <v-flex md2><span>错漏数量</span></v-flex>
                            <v-flex md2><v-text-field label="A类:" @change="add13()" v-model="qualityType13.check_a" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="B类:" @change="add13()" v-model="qualityType13.check_b" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="C类:" @change="add13()" v-model="qualityType13.check_c" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="D类:" @change="add13()" v-model="qualityType13.check_d" type="number"></v-text-field></v-flex>
                        </v-flex>
                        <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType13.checkPoints" disabled></v-text-field></v-flex>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md12>
                        <v-flex md2><v-text-field label="检查项（内容）:" value="技术文档表达质量" disabled></v-text-field></v-flex>
                        <v-flex md1><v-text-field label="检查类型:" v-model="qualityType14.check_type"></v-text-field></v-flex>
                        <v-flex md2><v-text-field label="检查结果:" v-model="qualityType14.check_result"></v-text-field></v-flex>
                        <v-flex md3>
                            <v-flex md2><span>错漏数量</span></v-flex>
                            <v-flex md2><v-text-field label="A类:" @change="add14()" v-model="qualityType14.check_a" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="B类:" @change="add14()" v-model="qualityType14.check_b" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="C类:" @change="add14()" v-model="qualityType14.check_c" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="D类:" @change="add14()" v-model="qualityType14.check_d" type="number"></v-text-field></v-flex>
                        </v-flex>
                        <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType14.checkPoints" disabled></v-text-field></v-flex>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md12>
                        <v-flex md2><v-text-field label="检查项（内容）:" value="资料完整性、规范性" disabled></v-text-field></v-flex>
                        <v-flex md1><v-text-field label="检查类型:" v-model="qualityType15.check_type"></v-text-field></v-flex>
                        <v-flex md2><v-text-field label="检查结果:" v-model="qualityType15.check_result"></v-text-field></v-flex>
                        <v-flex md3>
                            <v-flex md2><span>错漏数量</span></v-flex>
                            <v-flex md2><v-text-field label="A类:" @change="add15()" v-model="qualityType15.check_a" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="B类:" @change="add15()" v-model="qualityType15.check_b" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="C类:" @change="add15()" v-model="qualityType15.check_c" type="number"></v-text-field></v-flex>
                            <v-flex md2><v-text-field label="D类:" @change="add15()" v-model="qualityType15.check_d" type="number"></v-text-field></v-flex>
                        </v-flex>
                        <v-flex md1><v-text-field label="检查项扣分:" v-model="qualityType15.checkPoints" disabled></v-text-field></v-flex>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex md12>
                        <v-flex md2><v-text-field label="质量总分:" v-model="qualitySum" type="number" disabled></v-text-field></v-flex>
                        <v-flex md5></v-flex>
                        <v-flex md1><v-btn color="orange" class="white--text" @click="$router.go(-1)">返回</v-btn></v-flex>
                        <v-flex md1><v-btn color="info" @click="addQualityScore">提交</v-btn></v-flex>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data:()=>({
            items:[],
            projectNo:'',
            qualitySum:'',
            KJ_ElementDeduction:'',
            CJ_ElementDeduction:'',
            CG_ElementDeduction:'',
            qualityType1:{
                project_no:'',
                type_id:1,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:0
            },
            qualityType2:{
                project_no:'',
                type_id:2,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType3:{
                project_no:'',
                type_id:3,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType4:{
                project_no:'',
                type_id:4,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType5:{
                project_no:'',
                type_id:5,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType6:{
                project_no:'',
                type_id:6,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType7:{
                project_no:'',
                type_id:7,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType8:{
                project_no:'',
                type_id:8,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType9:{
                project_no:'',
                type_id:9,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType10:{
                project_no:'',
                type_id:10,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType11:{
                project_no:'',
                type_id:11,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType12:{
                project_no:'',
                type_id:12,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType13:{
                project_no:'',
                type_id:13,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType14:{
                project_no:'',
                type_id:14,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
            qualityType15:{
                project_no:'',
                type_id:15,
                check_type:'',
                check_result:'',
                check_a:'',
                check_b:'',
                check_c:'',
                check_d:'',
                checkPoints:''
            },
        }),
        methods:{
            add1(){
                this.qualityType1.checkPoints = 0
                if(this.qualityType1.check_a != null && this.qualityType1.check_a != ''){
                    this.qualityType1.checkPoints += parseInt(this.qualityType1.check_a) * 42
                }
                if(this.qualityType1.check_b != null && this.qualityType1.check_b != ''){
                    this.qualityType1.checkPoints += parseInt(this.qualityType1.check_b) * 12
                }
                if(this.qualityType1.check_c != null && this.qualityType1.check_c != ''){
                    this.qualityType1.checkPoints += parseInt(this.qualityType1.check_c) *4
                }
                if(this.qualityType1.check_d != null && this.qualityType1.check_d != ''){
                    this.qualityType1.checkPoints += parseInt(this.qualityType1.check_d) * 1
                }
                this.KJ_ElementDeduction = 0
                if(this.qualityType1.checkPoints != null && this.qualityType1.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType1.checkPoints
                }
                if(this.qualityType2.checkPoints != null && this.qualityType2.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType2.checkPoints
                }
                if(this.qualityType3.checkPoints != null && this.qualityType3.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType3.checkPoints
                }
                if(this.qualityType4.checkPoints != null && this.qualityType4.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType4.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add2(){
                this.qualityType2.checkPoints = 0
                if(this.qualityType2.check_a != null && this.qualityType2.check_a != ''){
                    this.qualityType2.checkPoints += parseInt(this.qualityType2.check_a) * 42
                }
                if(this.qualityType2.check_b != null && this.qualityType2.check_b != ''){
                    this.qualityType2.checkPoints += parseInt(this.qualityType2.check_b) * 12
                }
                if(this.qualityType2.check_c != null && this.qualityType2.check_c != ''){
                    this.qualityType2.checkPoints += parseInt(this.qualityType2.check_c) *4
                }
                if(this.qualityType2.check_d != null && this.qualityType2.check_d != ''){
                    this.qualityType2.checkPoints += parseInt(this.qualityType2.check_d) * 1
                }
                this.KJ_ElementDeduction = 0
                if(this.qualityType1.checkPoints != null && this.qualityType1.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType1.checkPoints
                }
                if(this.qualityType2.checkPoints != null && this.qualityType2.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType2.checkPoints
                }
                if(this.qualityType3.checkPoints != null && this.qualityType3.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType3.checkPoints
                }
                if(this.qualityType4.checkPoints != null && this.qualityType4.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType4.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add3(){
                this.qualityType3.checkPoints = 0
                if(this.qualityType3.check_a != null && this.qualityType3.check_a != ''){
                    this.qualityType3.checkPoints += parseInt(this.qualityType3.check_a) * 42
                }
                if(this.qualityType3.check_b != null && this.qualityType3.check_b != ''){
                    this.qualityType3.checkPoints += parseInt(this.qualityType3.check_b) * 12
                }
                if(this.qualityType3.check_c != null && this.qualityType3.check_c != ''){
                    this.qualityType3.checkPoints += parseInt(this.qualityType3.check_c) *4
                }
                if(this.qualityType3.check_d != null && this.qualityType3.check_d != ''){
                    this.qualityType3.checkPoints += parseInt(this.qualityType3.check_d) * 1
                }
                this.KJ_ElementDeduction = 0
                if(this.qualityType1.checkPoints != null && this.qualityType1.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType1.checkPoints
                }
                if(this.qualityType2.checkPoints != null && this.qualityType2.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType2.checkPoints
                }
                if(this.qualityType3.checkPoints != null && this.qualityType3.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType3.checkPoints
                }
                if(this.qualityType4.checkPoints != null && this.qualityType4.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType4.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add4(){
                this.qualityType4.checkPoints = 0
                if(this.qualityType4.check_a != null && this.qualityType4.check_a != ''){
                    this.qualityType4.checkPoints += parseInt(this.qualityType4.check_a) * 42
                }
                if(this.qualityType4.check_b != null && this.qualityType4.check_b != ''){
                    this.qualityType4.checkPoints += parseInt(this.qualityType4.check_b) * 12
                }
                if(this.qualityType4.check_c != null && this.qualityType4.check_c != ''){
                    this.qualityType4.checkPoints += parseInt(this.qualityType4.check_c) *4
                }
                if(this.qualityType4.check_d != null && this.qualityType4.check_d != ''){
                    this.qualityType4.checkPoints += parseInt(this.qualityType4.check_d) * 1
                }
                this.KJ_ElementDeduction = 0
                if(this.qualityType1.checkPoints != null && this.qualityType1.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType1.checkPoints
                }
                if(this.qualityType2.checkPoints != null && this.qualityType2.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType2.checkPoints
                }
                if(this.qualityType3.checkPoints != null && this.qualityType3.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType3.checkPoints
                }
                if(this.qualityType4.checkPoints != null && this.qualityType4.checkPoints != ''){
                    this.KJ_ElementDeduction += this.qualityType4.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add5(){
                this.qualityType5.checkPoints = 0
                if(this.qualityType5.check_a != null && this.qualityType5.check_a != ''){
                    this.qualityType5.checkPoints += parseInt(this.qualityType5.check_a) * 42
                }
                if(this.qualityType5.check_b != null && this.qualityType5.check_b != ''){
                    this.qualityType5.checkPoints += parseInt(this.qualityType5.check_b) * 12
                }
                if(this.qualityType5.check_c != null && this.qualityType5.check_c != ''){
                    this.qualityType5.checkPoints += parseInt(this.qualityType5.check_c) *4
                }
                if(this.qualityType5.check_d != null && this.qualityType5.check_d != ''){
                    this.qualityType5.checkPoints += parseInt(this.qualityType5.check_d) * 1
                }
                this.CJ_ElementDeduction = 0
                if(this.qualityType5.checkPoints != null && this.qualityType5.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType5.checkPoints
                }
                if(this.qualityType6.checkPoints != null && this.qualityType6.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType6.checkPoints
                }
                if(this.qualityType7.checkPoints != null && this.qualityType7.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType7.checkPoints
                }
                if(this.qualityType8.checkPoints != null && this.qualityType8.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType8.checkPoints
                }
                if(this.qualityType9.checkPoints != null && this.qualityType9.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType9.checkPoints
                }
                if(this.qualityType10.checkPoints != null && this.qualityType10.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType10.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add6(){
                this.qualityType6.checkPoints = 0
                if(this.qualityType6.check_a != null && this.qualityType6.check_a != ''){
                    this.qualityType6.checkPoints += parseInt(this.qualityType6.check_a) * 42
                }
                if(this.qualityType6.check_b != null && this.qualityType6.check_b != ''){
                    this.qualityType6.checkPoints += parseInt(this.qualityType6.check_b) * 12
                }
                if(this.qualityType6.check_c != null && this.qualityType6.check_c != ''){
                    this.qualityType6.checkPoints += parseInt(this.qualityType6.check_c) *4
                }
                if(this.qualityType6.check_d != null && this.qualityType6.check_d != ''){
                    this.qualityType6.checkPoints += parseInt(this.qualityType6.check_d) * 1
                }
                this.CJ_ElementDeduction = 0
                if(this.qualityType5.checkPoints != null && this.qualityType5.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType5.checkPoints
                }
                if(this.qualityType6.checkPoints != null && this.qualityType6.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType6.checkPoints
                }
                if(this.qualityType7.checkPoints != null && this.qualityType7.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType7.checkPoints
                }
                if(this.qualityType8.checkPoints != null && this.qualityType8.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType8.checkPoints
                }
                if(this.qualityType9.checkPoints != null && this.qualityType9.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType9.checkPoints
                }
                if(this.qualityType10.checkPoints != null && this.qualityType10.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType10.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add7(){
                this.qualityType7.checkPoints = 0
                if(this.qualityType7.check_a != null && this.qualityType7.check_a != ''){
                    this.qualityType7.checkPoints += parseInt(this.qualityType7.check_a) * 42
                }
                if(this.qualityType7.check_b != null && this.qualityType7.check_b != ''){
                    this.qualityType7.checkPoints += parseInt(this.qualityType7.check_b) * 12
                }
                if(this.qualityType7.check_c != null && this.qualityType7.check_c != ''){
                    this.qualityType7.checkPoints += parseInt(this.qualityType7.check_c) *4
                }
                if(this.qualityType7.check_d != null && this.qualityType7.check_d != ''){
                    this.qualityType7.checkPoints += parseInt(this.qualityType7.check_d) * 1
                }
                this.CJ_ElementDeduction = 0
                if(this.qualityType5.checkPoints != null && this.qualityType5.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType5.checkPoints
                }
                if(this.qualityType6.checkPoints != null && this.qualityType6.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType6.checkPoints
                }
                if(this.qualityType7.checkPoints != null && this.qualityType7.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType7.checkPoints
                }
                if(this.qualityType8.checkPoints != null && this.qualityType8.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType8.checkPoints
                }
                if(this.qualityType9.checkPoints != null && this.qualityType9.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType9.checkPoints
                }
                if(this.qualityType10.checkPoints != null && this.qualityType10.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType10.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add8(){
                this.qualityType8.checkPoints = 0
                if(this.qualityType8.check_a != null && this.qualityType8.check_a != ''){
                    this.qualityType8.checkPoints += parseInt(this.qualityType8.check_a) * 42
                }
                if(this.qualityType8.check_b != null && this.qualityType8.check_b != ''){
                    this.qualityType8.checkPoints += parseInt(this.qualityType8.check_b) * 12
                }
                if(this.qualityType8.check_c != null && this.qualityType8.check_c != ''){
                    this.qualityType8.checkPoints += parseInt(this.qualityType8.check_c) *4
                }
                if(this.qualityType8.check_d != null && this.qualityType8.check_d != ''){
                    this.qualityType8.checkPoints += parseInt(this.qualityType8.check_d) * 1
                }
                this.CJ_ElementDeduction = 0
                if(this.qualityType5.checkPoints != null && this.qualityType5.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType5.checkPoints
                }
                if(this.qualityType6.checkPoints != null && this.qualityType6.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType6.checkPoints
                }
                if(this.qualityType7.checkPoints != null && this.qualityType7.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType7.checkPoints
                }
                if(this.qualityType8.checkPoints != null && this.qualityType8.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType8.checkPoints
                }
                if(this.qualityType9.checkPoints != null && this.qualityType9.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType9.checkPoints
                }
                if(this.qualityType10.checkPoints != null && this.qualityType10.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType10.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add9(){
                this.qualityType9.checkPoints = 0
                if(this.qualityType9.check_a != null && this.qualityType9.check_a != ''){
                    this.qualityType9.checkPoints += parseInt(this.qualityType9.check_a) * 42
                }
                if(this.qualityType9.check_b != null && this.qualityType9.check_b != ''){
                    this.qualityType9.checkPoints += parseInt(this.qualityType9.check_b) * 12
                }
                if(this.qualityType9.check_c != null && this.qualityType9.check_c != ''){
                    this.qualityType9.checkPoints += parseInt(this.qualityType9.check_c) *4
                }
                if(this.qualityType9.check_d != null && this.qualityType9.check_d != ''){
                    this.qualityType9.checkPoints += parseInt(this.qualityType9.check_d) * 1
                }
                this.CJ_ElementDeduction = 0
                if(this.qualityType5.checkPoints != null && this.qualityType5.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType5.checkPoints
                }
                if(this.qualityType6.checkPoints != null && this.qualityType6.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType6.checkPoints
                }
                if(this.qualityType7.checkPoints != null && this.qualityType7.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType7.checkPoints
                }
                if(this.qualityType8.checkPoints != null && this.qualityType8.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType8.checkPoints
                }
                if(this.qualityType9.checkPoints != null && this.qualityType9.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType9.checkPoints
                }
                if(this.qualityType10.checkPoints != null && this.qualityType10.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType10.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add10(){
                this.qualityType10.checkPoints = 0
                if(this.qualityType10.check_a != null && this.qualityType10.check_a != ''){
                    this.qualityType10.checkPoints += parseInt(this.qualityType10.check_a) * 42
                }
                if(this.qualityType10.check_b != null && this.qualityType10.check_b != ''){
                    this.qualityType10.checkPoints += parseInt(this.qualityType10.check_b) * 12
                }
                if(this.qualityType10.check_c != null && this.qualityType10.check_c != ''){
                    this.qualityType10.checkPoints += parseInt(this.qualityType10.check_c) *4
                }
                if(this.qualityType10.check_d != null && this.qualityType10.check_d != ''){
                    this.qualityType10.checkPoints += parseInt(this.qualityType10.check_d) * 1
                }
                this.CJ_ElementDeduction = 0
                if(this.qualityType5.checkPoints != null && this.qualityType5.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType5.checkPoints
                }
                if(this.qualityType6.checkPoints != null && this.qualityType6.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType6.checkPoints
                }
                if(this.qualityType7.checkPoints != null && this.qualityType7.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType7.checkPoints
                }
                if(this.qualityType8.checkPoints != null && this.qualityType8.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType8.checkPoints
                }
                if(this.qualityType9.checkPoints != null && this.qualityType9.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType9.checkPoints
                }
                if(this.qualityType10.checkPoints != null && this.qualityType10.checkPoints != ''){
                    this.CJ_ElementDeduction += this.qualityType10.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add11(){
                this.qualityType11.checkPoints = 0
                if(this.qualityType11.check_a != null && this.qualityType11.check_a != ''){
                    this.qualityType11.checkPoints += parseInt(this.qualityType11.check_a) * 42
                }
                if(this.qualityType11.check_b != null && this.qualityType11.check_b != ''){
                    this.qualityType11.checkPoints += parseInt(this.qualityType11.check_b) * 12
                }
                if(this.qualityType11.check_c != null && this.qualityType11.check_c != ''){
                    this.qualityType11.checkPoints += parseInt(this.qualityType11.check_c) *4
                }
                if(this.qualityType11.check_d != null && this.qualityType11.check_d != ''){
                    this.qualityType11.checkPoints += parseInt(this.qualityType11.check_d) * 1
                }
                this.CG_ElementDeduction = 0
                if(this.qualityType11.checkPoints != null && this.qualityType11.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType11.checkPoints
                }
                if(this.qualityType12.checkPoints != null && this.qualityType12.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType12.checkPoints
                }
                if(this.qualityType13.checkPoints != null && this.qualityType13.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType13.checkPoints
                }
                if(this.qualityType14.checkPoints != null && this.qualityType4.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType14.checkPoints
                }
                if(this.qualityType15.checkPoints != null && this.qualityType15.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType15.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add12(){
                this.qualityType12.checkPoints = 0
                if(this.qualityType12.check_a != null && this.qualityType12.check_a != ''){
                    this.qualityType12.checkPoints += parseInt(this.qualityType12.check_a) * 42
                }
                if(this.qualityType12.check_b != null && this.qualityType12.check_b != ''){
                    this.qualityType12.checkPoints += parseInt(this.qualityType12.check_b) * 12
                }
                if(this.qualityType12.check_c != null && this.qualityType12.check_c != ''){
                    this.qualityType12.checkPoints += parseInt(this.qualityType12.check_c) *4
                }
                if(this.qualityType12.check_d != null && this.qualityType12.check_d != ''){
                    this.qualityType12.checkPoints += parseInt(this.qualityType12.check_d) * 1
                }
                this.CG_ElementDeduction = 0
                if(this.qualityType11.checkPoints != null && this.qualityType11.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType11.checkPoints
                }
                if(this.qualityType12.checkPoints != null && this.qualityType12.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType12.checkPoints
                }
                if(this.qualityType13.checkPoints != null && this.qualityType13.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType13.checkPoints
                }
                if(this.qualityType14.checkPoints != null && this.qualityType4.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType14.checkPoints
                }
                if(this.qualityType15.checkPoints != null && this.qualityType15.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType15.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add13(){
                this.qualityType13.checkPoints = 0
                if(this.qualityType13.check_a != null && this.qualityType13.check_a != ''){
                    this.qualityType13.checkPoints += parseInt(this.qualityType13.check_a) * 42
                }
                if(this.qualityType13.check_b != null && this.qualityType13.check_b != ''){
                    this.qualityType13.checkPoints += parseInt(this.qualityType13.check_b) * 12
                }
                if(this.qualityType13.check_c != null && this.qualityType13.check_c != ''){
                    this.qualityType13.checkPoints += parseInt(this.qualityType13.check_c) *4
                }
                if(this.qualityType13.check_d != null && this.qualityType13.check_d != ''){
                    this.qualityType13.checkPoints += parseInt(this.qualityType13.check_d) * 1
                }
                this.CG_ElementDeduction = 0
                if(this.qualityType11.checkPoints != null && this.qualityType11.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType11.checkPoints
                }
                if(this.qualityType12.checkPoints != null && this.qualityType12.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType12.checkPoints
                }
                if(this.qualityType13.checkPoints != null && this.qualityType13.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType13.checkPoints
                }
                if(this.qualityType14.checkPoints != null && this.qualityType4.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType14.checkPoints
                }
                if(this.qualityType15.checkPoints != null && this.qualityType15.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType15.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add14(){
                this.qualityType14.checkPoints = 0
                if(this.qualityType14.check_a != null && this.qualityType14.check_a != ''){
                    this.qualityType14.checkPoints += parseInt(this.qualityType14.check_a) * 42
                }
                if(this.qualityType14.check_b != null && this.qualityType14.check_b != ''){
                    this.qualityType14.checkPoints += parseInt(this.qualityType14.check_b) * 12
                }
                if(this.qualityType14.check_c != null && this.qualityType14.check_c != ''){
                    this.qualityType14.checkPoints += parseInt(this.qualityType14.check_c) *4
                }
                if(this.qualityType14.check_d != null && this.qualityType14.check_d != ''){
                    this.qualityType14.checkPoints += parseInt(this.qualityType14.check_d) * 1
                }
                this.CG_ElementDeduction = 0
                if(this.qualityType11.checkPoints != null && this.qualityType11.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType11.checkPoints
                }
                if(this.qualityType12.checkPoints != null && this.qualityType12.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType12.checkPoints
                }
                if(this.qualityType13.checkPoints != null && this.qualityType13.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType13.checkPoints
                }
                if(this.qualityType14.checkPoints != null && this.qualityType4.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType14.checkPoints
                }
                if(this.qualityType15.checkPoints != null && this.qualityType15.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType15.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            add15(){
                this.qualityType15.checkPoints = 0
                if(this.qualityType15.check_a != null && this.qualityType15.check_a != ''){
                    this.qualityType15.checkPoints += parseInt(this.qualityType15.check_a) * 42
                }
                if(this.qualityType15.check_b != null && this.qualityType15.check_b != ''){
                    this.qualityType15.checkPoints += parseInt(this.qualityType15.check_b) * 12
                }
                if(this.qualityType15.check_c != null && this.qualityType15.check_c != ''){
                    this.qualityType15.checkPoints += parseInt(this.qualityType15.check_c) *4
                }
                if(this.qualityType15.check_d != null && this.qualityType15.check_d != ''){
                    this.qualityType15.checkPoints += parseInt(this.qualityType15.check_d) * 1
                }
                this.CG_ElementDeduction = 0
                if(this.qualityType11.checkPoints != null && this.qualityType11.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType11.checkPoints
                }
                if(this.qualityType12.checkPoints != null && this.qualityType12.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType12.checkPoints
                }
                if(this.qualityType13.checkPoints != null && this.qualityType13.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType13.checkPoints
                }
                if(this.qualityType14.checkPoints != null && this.qualityType14.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType14.checkPoints
                }
                if(this.qualityType15.checkPoints != null && this.qualityType15.checkPoints != ''){
                    this.CG_ElementDeduction += this.qualityType15.checkPoints
                }
                this.qualitySum = 0
                if(this.KJ_ElementDeduction != null && this.KJ_ElementDeduction != ''){
                    this.qualitySum += this.KJ_ElementDeduction
                }
                if(this.CJ_ElementDeduction != null && this.CJ_ElementDeduction != ''){
                    this.qualitySum += this.CJ_ElementDeduction
                }
                if(this.CG_ElementDeduction != null && this.CG_ElementDeduction != ''){
                    this.qualitySum += this.CG_ElementDeduction
                }
                this.qualitySum = 100 - this.qualitySum
            },
            addQualityScore(){
                this.projectNo = this.$route.query.p_no
                if(this.qualityType1.check_type != '' || this.qualityType1.check_result != '' || this.qualityType1.check_a != '' ||
                    this.qualityType1.check_b != ''|| this.qualityType1.check_c != '' || this.qualityType1.check_d != ''){
                    this.addApi(this.qualityType1)
                }
                if(this.qualityType2.check_type != '' || this.qualityType2.check_result != '' || this.qualityType2.check_a != '' ||
                    this.qualityType2.check_b != ''|| this.qualityType2.check_c != '' || this.qualityType2.check_d != ''){
                    this.addApi(this.qualityType2)
                }
                if(this.qualityType3.check_type != '' || this.qualityType3.check_result != '' || this.qualityType3.check_a != '' ||
                    this.qualityType3.check_b != ''|| this.qualityType3.check_c != '' || this.qualityType3.check_d != ''){
                    this.addApi(this.qualityType3)
                }
                if(this.qualityType4.check_type != '' || this.qualityType4.check_result != '' || this.qualityType4.check_a != '' ||
                    this.qualityType4.check_b != ''|| this.qualityType4.check_c != '' || this.qualityType4.check_d != ''){
                    this.addApi(this.qualityType4)
                }
                if(this.qualityType5.check_type != '' || this.qualityType5.check_result != '' || this.qualityType5.check_a != '' ||
                    this.qualityType5.check_b != ''|| this.qualityType5.check_c != '' || this.qualityType5.check_d != ''){
                    this.addApi(this.qualityType5)
                }
                if(this.qualityType6.check_type != '' || this.qualityType6.check_result != '' || this.qualityType6.check_a != '' ||
                    this.qualityType6.check_b != ''|| this.qualityType6.check_c != '' || this.qualityType6.check_d != ''){
                    this.addApi(this.qualityType6)
                }
                if(this.qualityType7.check_type != '' || this.qualityType7.check_result != '' || this.qualityType7.check_a != '' ||
                    this.qualityType7.check_b != ''|| this.qualityType7.check_c != '' || this.qualityType7.check_d != ''){
                    this.qualityType7.project_no = this.projectNo
                    this.addApi(this.qualityType7)
                }
                if(this.qualityType8.check_type != '' || this.qualityType8.check_result != '' || this.qualityType8.check_a != '' ||
                    this.qualityType8.check_b != ''|| this.qualityType8.check_c != '' || this.qualityType8.check_d != ''){
                    this.addApi(this.qualityType8)
                }
                if(this.qualityType9.check_type != '' || this.qualityType9.check_result != '' || this.qualityType9.check_a != '' ||
                    this.qualityType9.check_b != ''|| this.qualityType9.check_c != '' || this.qualityType9.check_d != ''){
                    this.addApi(this.qualityType9)
                }
                if(this.qualityType10.check_type != '' || this.qualityType10.check_result != '' || this.qualityType10.check_a != '' ||
                    this.qualityType10.check_b != ''|| this.qualityType10.check_c != '' || this.qualityType10.check_d != ''){
                    this.addApi(this.qualityType10)
                }
                if(this.qualityType11.check_type != '' || this.qualityType11.check_result != '' || this.qualityType11.check_a != '' ||
                    this.qualityType11.check_b != ''|| this.qualityType11.check_c != '' || this.qualityType11.check_d != ''){
                    this.addApi(this.qualityType11)
                }
                if(this.qualityType12.check_type != '' || this.qualityType12.check_result != '' || this.qualityType12.check_a != '' ||
                    this.qualityType12.check_b != ''|| this.qualityType12.check_c != '' || this.qualityType12.check_d != ''){
                    this.addApi(this.qualityType12)
                }
                if(this.qualityType13.check_type != '' || this.qualityType13.check_result != '' || this.qualityType13.check_a != '' ||
                    this.qualityType13.check_b != ''|| this.qualityType13.check_c != '' || this.qualityType13.check_d != ''){
                    this.addApi(this.qualityType13)
                }
                if(this.qualityType14.check_type != '' || this.qualityType14.check_result != '' || this.qualityType14.check_a != '' ||
                    this.qualityType14.check_b != ''|| this.qualityType14.check_c != '' || this.qualityType14.check_d != ''){
                    this.addApi(this.qualityType14)
                }
                if(this.qualityType15.check_type != '' || this.qualityType15.check_result != '' || this.qualityType15.check_a != '' ||
                    this.qualityType15.check_b != ''|| this.qualityType15.check_c != '' || this.qualityType15.check_d != ''){
                    this.addApi(this.qualityType15)
                }

            },
            getFromApi(){
                this.projectNo = this.$route.query.p_no
                return new Promise((resolve,reject) =>{
                    axios({
                        method:'GET',
                        url:'project/quality/',
                        params:{
                            projectNo:this.projectNo
                        },
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                    }).then(response => {
                        resolve(response.data)
                        this.items = response.data
                        this.items.forEach((item) => {
                            if (item.type_id == 1) {
                                this.qualityType1.check_type = item.check_type
                                this.qualityType1.check_result = item.check_result
                                this.qualityType1.check_a = item.check_a
                                this.qualityType1.check_b = item.check_b
                                this.qualityType1.check_c = item.check_c
                                this.qualityType1.check_d = item.check_d
                            }
                            if (item.type_id == 2) {
                                this.qualityType2.check_type = item.check_type
                                this.qualityType2.check_result = item.check_result
                                this.qualityType2.check_a = item.check_a
                                this.qualityType2.check_b = item.check_b
                                this.qualityType2.check_c = item.check_c
                                this.qualityType2.check_d = item.check_d
                            }
                            if (item.type_id == 3) {
                                this.qualityType3.check_type = item.check_type
                                this.qualityType3.check_result = item.check_result
                                this.qualityType3.check_a = item.check_a
                                this.qualityType3.check_b = item.check_b
                                this.qualityType3.check_c = item.check_c
                                this.qualityType3.check_d = item.check_d
                            }
                            if (item.type_id == 4) {
                                this.qualityType4.check_type = item.check_type
                                this.qualityType4.check_result = item.check_result
                                this.qualityType4.check_a = item.check_a
                                this.qualityType4.check_b = item.check_b
                                this.qualityType4.check_c = item.check_c
                                this.qualityType4.check_d = item.check_d
                            }
                            if (item.type_id == 5) {
                                this.qualityType5.check_type = item.check_type
                                this.qualityType5.check_result = item.check_result
                                this.qualityType5.check_a = item.check_a
                                this.qualityType5.check_b = item.check_b
                                this.qualityType5.check_c = item.check_c
                                this.qualityType5.check_d = item.check_d
                            }
                            if (item.type_id == 6) {
                                this.qualityType6.check_type = item.check_type
                                this.qualityType6.check_result = item.check_result
                                this.qualityType6.check_a = item.check_a
                                this.qualityType6.check_b = item.check_b
                                this.qualityType6.check_c = item.check_c
                                this.qualityType6.check_d = item.check_d
                            }
                            if (item.type_id == 7) {
                                this.qualityType7.check_type = item.check_type
                                this.qualityType7.check_result = item.check_result
                                this.qualityType7.check_a = item.check_a
                                this.qualityType7.check_b = item.check_b
                                this.qualityType7.check_c = item.check_c
                                this.qualityType7.check_d = item.check_d
                            }
                            if (item.type_id == 8) {
                                this.qualityType8.check_type = item.check_type
                                this.qualityType8.check_result = item.check_result
                                this.qualityType8.check_a = item.check_a
                                this.qualityType8.check_b = item.check_b
                                this.qualityType8.check_c = item.check_c
                                this.qualityType8.check_d = item.check_d
                            }
                            if (item.type_id == 9) {
                                this.qualityType9.check_type = item.check_type
                                this.qualityType9.check_result = item.check_result
                                this.qualityType9.check_a = item.check_a
                                this.qualityType9.check_b = item.check_b
                                this.qualityType9.check_c = item.check_c
                                this.qualityType9.check_d = item.check_d
                            }
                            if (item.type_id == 10) {
                                this.qualityType10.check_type = item.check_type
                                this.qualityType10.check_result = item.check_result
                                this.qualityType10.check_a = item.check_a
                                this.qualityType10.check_b = item.check_b
                                this.qualityType10.check_c = item.check_c
                                this.qualityType10.check_d = item.check_d
                            }
                            if (item.type_id == 11) {
                                this.qualityType11.check_type = item.check_type
                                this.qualityType11.check_result = item.check_result
                                this.qualityType11.check_a = item.check_a
                                this.qualityType11.check_b = item.check_b
                                this.qualityType11.check_c = item.check_c
                                this.qualityType11.check_d = item.check_d
                            }
                            if (item.type_id == 12) {
                                this.qualityType12.check_type = item.check_type
                                this.qualityType12.check_result = item.check_result
                                this.qualityType12.check_a = item.check_a
                                this.qualityType12.check_b = item.check_b
                                this.qualityType12.check_c = item.check_c
                                this.qualityType12.check_d = item.check_d
                            }
                            if (item.type_id == 13) {
                                this.qualityType13.check_type = item.check_type
                                this.qualityType13.check_result = item.check_result
                                this.qualityType13.check_a = item.check_a
                                this.qualityType13.check_b = item.check_b
                                this.qualityType13.check_c = item.check_c
                                this.qualityType13.check_d = item.check_d
                            }
                            if (item.type_id == 14) {
                                this.qualityType14.check_type = item.check_type
                                this.qualityType14.check_result = item.check_result
                                this.qualityType14.check_a = item.check_a
                                this.qualityType14.check_b = item.check_b
                                this.qualityType14.check_c = item.check_c
                                this.qualityType14.check_d = item.check_d
                            }
                            if (item.type_id == 15) {
                                this.qualityType15.check_type = item.check_type
                                this.qualityType15.check_result = item.check_result
                                this.qualityType15.check_a = item.check_a
                                this.qualityType15.check_b = item.check_b
                                this.qualityType15.check_c = item.check_c
                                this.qualityType15.check_d = item.check_d
                            }
                            this.add1()
                            this.add2()
                            this.add3()
                            this.add4()
                            this.add5()
                            this.add6()
                            this.add7()
                            this.add8()
                            this.add9()
                            this.add10()
                            this.add11()
                            this.add12()
                            this.add13()
                            this.add14()
                            this.add15()
                        })

                    }).catch(error =>{
                        reject(error.response.data)
                    })
                })
            },
            addApi(item){
                this.qualityType1.project_no = this.projectNo
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'POST',
                        url: 'project/quality/',
                        data: {
                            check_a:item.check_a,
                            check_b:item.check_b,
                            check_c:item.check_c,
                            check_d:item.check_d,
                            check_result:item.check_result,
                            check_type:item.check_type,
                            project_no:this.projectNo,
                            type_id:item.type_id
                        },
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem("token")
                        }
                    }).then(response => {
                        this.updateApi()
                    }).catch(error => {})
                })
            },
            updateApi(){
                this.projectNo = this.$route.query.p_no
                return new Promise((resolve,reject) => {
                    axios({
                        method: 'POST',
                        url: 'projectQuality/update/',
                        headers:{
                            Authorization: "Bearer " + sessionStorage.getItem('token')
                        },
                        data:{
                            projectNo:this.projectNo,
                            qualityScore:this.qualitySum
                        }
                    }).then(response =>{
                        this.$router.push({name:'editquality',query:{'p_no':this.projectNo}});
                    }).catch(error =>{})
                })
            }
        },
        mounted() {
            this.getFromApi()
        }
    }
</script>

<style scoped>
    .flex {
        display:inline-flex;
        margin-right: 15px;
    }
</style>