import RedisServer from 'redis-server';
 
import {
  LibRedisAdapter,
} from '@coinhaven/libredisadapter/LibRedisAdapter.mjs';

const server = new RedisServer(6380);

server.open().then(() => {
  console.log("server started");
});

let adapter = null;

const ServerConfig = {
    host: 'localhost',
    port: 6380
};

adapter = new LibRedisAdapter();

const inst = await adapter.newInstance(ServerConfig);

console.log('adapter online and connected\n');

// console.log('\nchecking connection');
// inst.rawCall(['ping'], function(e, resp){
// 	console.log('ping', e, resp);
// });


inst.rawCall(['XADD','mystream','*','message1','My first message in the stream'], function(e, resp){
	console.log('first stream id: ', e, resp, '\n');
});

inst.rawCall(['XADD','mystream','*','message2','My second message in the stream'], function(e, resp){
	console.log('second stream id: ', e, resp, '\n');
});

inst.rawCall(['XADD','mystream','*','message3','My third message in the stream'], function(e, resp){
	console.log('third stream id: ', e, resp, '\n');
});

// adapter.shutDownInstance(inst);

// console.log('instance was shut down');

// adapter.destroy();

// console.log('adapter was destroyed');

// server.close();