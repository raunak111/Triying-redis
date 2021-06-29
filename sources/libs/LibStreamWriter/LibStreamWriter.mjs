import Redis from 'redis-fast-driver';
import EventEmitter from 'events';
import { LibRedisAdapter, } from '@coinhaven/LibRedisAdapter/LibRedisAdapter.mjs';

export class LibStreaWriter extends EventEmitter {

    #libRedisAdapter = null;
    constructor() {
        super();
        this.#libRedisAdapter = new LibRedisAdapter(); 
    }

    async destroy() {
        this.destroy();
    }
}