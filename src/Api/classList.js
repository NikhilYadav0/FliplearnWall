const axios = require('axios');

const inst=axios.create({
        baseURL:'https://ptoc.fliplearn.com/v1/'
    }
)
export default inst;
