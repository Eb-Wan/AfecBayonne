const AXIOS = require("axios");

AXIOS.get("https://jsonplaceholder.typicode.com/posts")
.then(Res => {
    console.log(Res.data);
}).catch(Err => console.error(Err));