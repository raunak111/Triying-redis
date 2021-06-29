//import { LibRedisAdapter, } from '@coinhaven/LibRedisAdapter/LibRedisAdapter.mjs';
const adapter = require ("@coinhaven/libredisadapter");

//const ada = new LibRedisAdapter();
//const inst = adapter.newInstance(6379, whale);

var myAdapter = ada.newInstance();

const express = require("express");

const app = express();

app.get("/", function(request, response){
    response.send("<center><h1>Welcome to my redis server</h1></center>");
    //console.log(request);
});

app.listen(6379, function(){
    console.log("server started at port 6379");
});
