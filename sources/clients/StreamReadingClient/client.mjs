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

console.log('adapter online and connected\n');

inst.rawCall(['XREAD','STREAMS', 'mystream','0'], function(e, resp){
    console.log('first stream read: ', e, resp[0][0,1], '\n');
});

//   inst.rawCall(['XADD','mystream','*','message2','My second message in the stream'], function(e, resp){
//       console.log('second stream id: ', e, resp, '\n');
//   });
  
//   inst.rawCall(['XADD','mystream','*','message3','My third message in the stream'], function(e, resp){
//       console.log('third stream id: ', e, resp, '\n');
//   });