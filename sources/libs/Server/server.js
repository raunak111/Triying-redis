//import { LibRedisAdapter } from './LibRedisAdapter/LibRedisAdapter.mjs';

//const Ada = require('./LibRedisAdapter/LibRedisAdapter.mjs').default;

//const ada = new LibRedisAdapter();

//const inst = adapter.newInstance(6379, whale);

const express = require("express");

const app = express();

app.get("/", function(request, response){
    response.send("<center><h1>Welcome to my redis server</h1></center>");
    //console.log(request);
});

app.listen(6379, function(){
    console.log("server started at port 6379");
});
