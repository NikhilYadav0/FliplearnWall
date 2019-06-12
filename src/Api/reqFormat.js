const axios = require('axios');

const inst=axios.create({
        baseURL:'https://bl.fliplearn.com',
        headers:{
            loginId:'vinay2.admin',
            profileCode:'8914881053',
            sessionToken:'VkscWwRksf6EdkLJX08TeQcCi',
            SupportedApiVersion:1
        }
    }
)
export default inst;

// params:{
//     type:'%23fliplearn',
//     blocked:0,
//     startDate:null,
//     endDate:null,
//     pageNum:2,
//     pageSize:10
// }