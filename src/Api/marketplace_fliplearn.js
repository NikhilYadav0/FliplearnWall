const axios = require('axios');

const inst=axios.create({
        baseURL:'https://marketplace.fliplearn.com/rest/api/v1',
        headers:{
            loginId:'vinay2.admin',
            profileCode:'8914881053',
            sessionToken:'VkscWwRksf6EdkLJX08TeQcCi',
            SupportedApiVersion:1,
            requestCode:"vmc"
        }
    }
)
export default inst;