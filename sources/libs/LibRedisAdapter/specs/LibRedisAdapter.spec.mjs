import util from 'util';
import dotenv from 'dotenv';
import mocha from 'mocha';
import chai from 'chai';
import {
  nanoid,
} from 'nanoid';
import {
  LibRedisAdapter,
} from '../LibRedisAdapter.mjs';

dotenv.config({
  path: './specs/.env',
});

const debuglog = util.debuglog('LibRedisAdapter:specs');
const {
  describe,
  before,
  after,
  it,
} = mocha;
const {
  expect,
} = chai;

describe('LibRedisAdapter', () => {
  let libRedisAdapter = null;
  let specRedisInstance = null;
  const SpecRedisInstanceName = 'SpecRedisInstance';
  const keysToCleanUp = [];

  const LibRedisAdapterConfig = Object.freeze({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
  });

  debuglog({
    LibRedisAdapterConfig,
  });

  const cleanUpData = async () => {
    if (keysToCleanUp.length > 0) {
      await specRedisInstance.rawCallAsync(['UNLINK', ...keysToCleanUp]);
    }
  };

  before(async () => {
    try {
      libRedisAdapter = new LibRedisAdapter();

      specRedisInstance = await libRedisAdapter.newInstance(LibRedisAdapterConfig, SpecRedisInstanceName);
    } catch (redisError) {
      debuglog(redisError.message);

      throw redisError;
    }

    return Promise.resolve();
  });

  after(async () => {
    try {
      await cleanUpData();

      libRedisAdapter.shutDownInstance(specRedisInstance);

      await libRedisAdapter.destroy();
      specRedisInstance = null;
      libRedisAdapter = null;
    } catch (redisError) {
      debuglog(redisError.message);
    }

    return Promise.resolve();
  });

  it('should newInstance and shutDownInstance', async () => {
    const redisInstance = await libRedisAdapter.newInstance(LibRedisAdapterConfig, nanoid(5));

    expect(redisInstance).to.exist;
    expect(redisInstance.ready).to.be.true;

    await libRedisAdapter.shutDownInstance(redisInstance);

    expect(redisInstance.destroyed).to.be.true;
  });

  // it('should store an Account Token data to Redis', async () => {
  //   const redisInstance = await libRedisAdapter.newInstance(LibRedisAdapterConfig, nanoid(5));

  //   const identifier = `AT:${nanoid(64)}`;
  //   const uid = nanoid(32);
  //   const secretKey = nanoid(256);

  //   const FLAG_0 = 0x1;
  //   // eslint-disable-next-line no-unused-vars
  //   const FLAG_1 = 0x2;
  //   const FLAG_2 = 0x4;
  //   const FLAGS = FLAG_0 | FLAG_2;

  //   const parameters = Object.freeze(['UID', uid, 'SK', secretKey, 'FLAGS', FLAGS]);

  //   keysToCleanUp.push(identifier);

  //   const result = await redisInstance.rawCallAsync(['HSET', identifier, ...parameters]);

  //   expect(result).to.equal((parameters.length / 2));

  //   const [retrievedSecretKey, retrievedFlags] = await redisInstance.rawCallAsync(['HMGET', identifier, 'SK', 'FLAGS']);

  //   expect(retrievedSecretKey).to.equal(secretKey);
  //   expect(retrievedFlags).to.equal(FLAGS.toString());

  //   const retrievedFlagsAsInt = parseInt(retrievedFlags, 16);

  //   expect(Boolean(retrievedFlagsAsInt & FLAG_0)).to.be.true; // FLAG_0 is set
  //   expect(Boolean(retrievedFlagsAsInt & FLAG_2)).to.be.true; // FLAG_2 is set

  //   libRedisAdapter.shutDownInstance(redisInstance);
  // });
});
