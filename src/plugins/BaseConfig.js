
//基本配置信息
let BaseConfig ={
    uploadUrl: 'http://localhost:8002/jx/api/uploadfile/', //上传接口
    uploadFileUrl : 'http://localhost:8002/jx/api/uploadFile/',  //文件上传路径
    webUrl : 'http://localhost:8002/jx/api/',//后台接口路径
    upContractUrl : 'http://localhost:8002/jx/api/file/',  //后台上传合同路径
    downContractUrl: 'http://localhost:8002/jx/api/download/?contractNo=', //合同下载接口

    // uploadUrl: 'https://web.gdjxch.cn/jx/api/uploadfile/', //上传接口
    // uploadFileUrl : 'https://web.gdjxch.cn/jx/api/uploadFile/',  //文件上传路径
    // webUrl : 'https://web.gdjxch.cn/jx/api/',//后台接口路径
    // upContractUrl : 'https://web.gdjxch.cn/jx/api/file/',  //后台上传合同路径
    // downContractUrl: 'https://web.gdjxch.cn/jx/api/download/?contractNo=', //合同下载接口
}

export default BaseConfig;