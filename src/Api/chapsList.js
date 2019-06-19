const axios = require('axios');

const inst=axios.create({
        baseURL:'https://ptoc.fliplearn.com/v1/',
        headers:{
            loginId:'vinay2.admin',
            profileCode:'8914881053',
            sessionToken:'VkscWwRksf6EdkLJX08TeQcCi',
            SupportedApiVersion:1,
            platform:"web"
        }
    }
)
export default inst;
