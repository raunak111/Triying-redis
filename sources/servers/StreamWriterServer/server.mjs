// import { LibRedisAdapter, } from '@coinhaven/LibRedisAdapter/LibRedisAdapter.mjs';

import {
  LibRedisAdapter,
} from '@coinhaven/libredisadapter/LibRedisAdapter.mjs';

const ada = new LibRedisAdapter();
const inst = adapter.newInstance(6379, whale);

const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('<center><h1>Welcome to my redis server</h1></center>');
  // console.log(request);
});

app.listen(6379, () => {
  console.log('server started at port 6379');
});
