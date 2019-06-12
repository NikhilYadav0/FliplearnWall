import reqFormat from '../Api/reqFormat' 
import marketPlaceApiFormat from '../Api/marketplace_fliplearn'
var loadDataOnWall=(pageNum, pageSize)=>{
    var reqPromise=reqFormat.get("/message/getUserMessage", {
        params: {
            type: "#fliplearn",
            blocked: 0,
            startDate: null,
            endDate: null,
            pageNum: pageNum,
            pageSize
        }
    })
    return reqPromise;
}
var loadNoticeBoardData=(pageNum,pageSize)=>{
    var reqPromise=reqFormat.get('message/getUserMessage', {
        params: {
            // #announcement|#homework|#album|#flipSchool
            type: "#announcement|#homework|#album|#flipSchool",
            blocked: 0,
            startDate: null,
            endDate: null,
            pageNum: pageNum,
            pageSize
        }
    })
    return reqPromise;
}

var loadCommentsonWall=(count,messageCode)=>{
    return reqFormat.get('/message/getCommentsByMessageCode',{
        params:{
            messageCode:messageCode,
            pageNum:count,
            pageSize:5
        }
    })
}

var loadSchoolSpecific=(code)=>{
    return reqFormat.get(`school/getSchoolDetailsBySchoolCode/${code}`, {
        params: {
            type: "service"
        }
    })
}


var getCategoryList=()=>{
    return marketPlaceApiFormat.get('getCategoryList/SAD',{
        params:{
            class_level_id:11,
            uuid:101004608030,
            profileCode:8914881053,
            schoolCode:21409234
        }
    })
}

var ApiCall={loadCommentsonWall,
    loadDataOnWall,loadNoticeBoardData,
    loadSchoolSpecific,getCategoryList}



export default ApiCall