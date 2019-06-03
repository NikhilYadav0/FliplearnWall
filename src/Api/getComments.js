const axios = require('axios');

const inst=axios.create({
        baseURL:'https://bl.fliplearn.com/message',
        headers:{
            loginId:'vinay2.admin',
            profileCode:'8914881053',
            sessionToken:'VkscWwRksf6EdkLJX08TeQcCi',
            SupportedApiVersion:1
        }
    }
)
export default inst;