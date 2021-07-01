import EventEmitter from 'events';
import {
    LibRedisAdapter,
  } from '@coinhaven/libredisadapter/LibRedisAdapter.mjs';

export class LibStreamWriter extends EventEmitter {

    #libRedisAdapter = null;
    #adapter = null;

    constructor() {
        super();
        this.#libRedisAdapter = new LibRedisAdapter();
    }

    // constructor(config = null) {

    //     if (config === null) {
    //         throw new ReferenceError('config is undefined');
    //     }

    //     super();
    //     this.#adapter = new LibRedisAdapter();
    //     this.#libRedisAdapter = this.#adapter.newInstance(config);
    // }

    async destroy() {
        this.destroy();
        this.#libRedisAdapter = null;
    }

    async connectToPort(config = null) {
        
        if (config === null) {
          throw new ReferenceError('config is not given properly');
        }

        return this.#libRedisAdapter.newInstance(config); 
    }

    // async write(streamname = null, mID = null, message = null){

    //     if (streamname === null) {
    //         throw new ReferenceError('streamname is not given');
    //     }

    //     if (mID === null) {
    //         throw new ReferenceError('mID is not given');
    //     }

    //     if (message === null) {
    //         throw new ReferenceError('message cannot be blank');
    //     }

    //     this.rawCall(['XADD',streamname,'*',mID,message], function(e, resp){
    //         	console.log('first stream id: ', e, resp, '\n');
    //     });

    // }

}