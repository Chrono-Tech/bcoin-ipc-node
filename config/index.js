require('dotenv').config();

module.exports = {
  blockchain: process.env.BLOCKCHAIN || 'bitcoin',
  node: {
    prefix: process.env.DB_PATH || '',
    network: process.env.NETWORK || 'regtest',
    db: process.env.DB_DRIVER || 'memory',
    cacheSize: process.env.CACHE_SIZE ? parseInt(process.env.CACHE_SIZE) : 1024,
    coinCache: process.env.COIN_SIZE ? parseInt(process.env.COIN_SIZE) : 30000000,
    spv: false,
    indexTX: true,
    indexAddress: true,
    logLevel: 'info',
    'zmq-hashblock': process.env.ZMQ || 'tcp://127.0.0.1:43332',
    'zmq-rawblock': process.env.ZMQ || 'tcp://127.0.0.1:43332',
    'zmq-hashtx': process.env.ZMQ || 'tcp://127.0.0.1:43332',
    'zmq-rawtx': process.env.ZMQ || 'tcp://127.0.0.1:43332'
  },
  ipc: {
    ipcName: process.env.IPC_NAME || 'bitcoin',
    ipcPath: process.env.IPC_PATH || '/tmp/',
    appSpace: process.env.APP_SPACE || 'app.'
  },
  http: {
    port: process.env.HTTP_PORT || 3000
  },
  type: 0

};