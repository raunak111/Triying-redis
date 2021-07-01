import {
    LibRedisAdapter,
  } from '@coinhaven/libredisadapter/LibRedisAdapter.mjs';
  
let adapter = null;

const ServerConfig = {
    host: 'localhost',
    port: 6380
};

adapter = new LibRedisAdapter();

const inst = await adapter.newInstance(ServerConfig);

console.log('client online and connected\n');

inst.rawCall(['XREAD','STREAMS', 'mystream','0'], function(e, resp){
    console.log('first stream read: ', e, resp[0][0,1], '\n');
});

// import {
//     LibStreamWriter,
// } from '@coinhaven/libstreamwriter/LibStreamWriter.mjs';

// const Config = {
//         host: 'localhost',
//         port: 6380
// };

// let writer = null;

// writer = new LibStreamWriter();

// const inst = await writer.connectToPort(Config);

// inst.rawCall(['XREAD','STREAMS', 'mystream','0'], function(e, resp){
//         console.log('first stream read: ', e, resp[0][0,1], '\n');
// });