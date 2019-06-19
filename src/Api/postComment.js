const axios=require('axios');

export default axios.create({
    baseURL:"https://bl.fliplearn.com/message/createComment",
    headers:{
        loginId:'vinay2.admin',
        profileCode:'8914881053',
        sessionToken:'VkscWwRksf6EdkLJX08TeQcCi',
        SupportedApiVersion:1
    }
})


// comment: {comment: "hello", uuid: "101004608030", messageCode: "20865421"}