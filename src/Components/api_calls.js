import reqFormat from '../Api/reqFormat' 
import marketPlaceApiFormat from '../Api/marketplace_fliplearn'
import postComment from '../Api/postComment'
import postLike from '../Api/postLike'
import classList from '../Api/classList'
import chapsList from '../Api/chapsList'

var loadSubjects=()=>{
    return classList.get("/class",{
        params:{
            boardCode:"CBSE"
        }
    })
}
var loadChapTopics=(chapterId,ncertEbookEnable)=>{
    return chapsList.get("/chapterTopics",{
        params:{
            chapterId,
            ncertEbookEnable
        }
    })
}

var loadSubChaps=(subjectId)=>{
    return chapsList.get("/booksChapters",{
        params:{
            subjectId,
            ncertEbookEnable:1,
            topicList:false
        }
    })
}

var postComments=(comment,messageCode,uuid)=>{
    var data = {comment:{
        comment,
        uuid, 
        messageCode
    }}
    return postComment.post("",data)
}

var likeMessage=(likedUuid,messageCode)=>{
    var data={
        messageCode, likedUuid
    }
    return postLike.post("/likeMessage",data)
}
var unlikeMessage=(likedUuid,messageCode)=>{
    var data={
        unlikeMessage:{messageCode, likedUuid}
    }
    return postLike.put("/unlikeMessage",data)
}
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

var loadCommentsonWall=(count,pageSize,messageCode)=>{
    return reqFormat.get('/message/getCommentsByMessageCode',{
        params:{
            messageCode:messageCode,
            pageNum:count,
            pageSize
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
    loadSchoolSpecific,getCategoryList,postComments,likeMessage,unlikeMessage
    ,loadSubjects,loadSubChaps,loadChapTopics}



export default ApiCall