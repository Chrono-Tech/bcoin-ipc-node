require('dotenv').config();

module.exports = {
  blockchain: process.env.BLOCKCHAIN || 'bitcoin',
  node: {
    prefix: process.env.DB_PATH || '',
    network: process.env.NETWORK || 'regtest',
    db: process.env.DB_DRIVER || 'memory',
    memory: process.env.DB_DRIVER === 'memory',
    indexTX: process.env.INDEX_TX ? parseInt(process.env.INDEX_TX) : true,
    indexAddress:  process.env.INDEX_ADDRESS ? !!parseInt(process.env.INDEX_ADDRESS) : true,
    logLevel: 'info',
    'http-port': parseInt(process.env.RPC_PORT) || 18332,
    'zmq-hashblock': process.env.ZMQ || 'tcp://127.0.0.1:43332',
    'zmq-rawblock': process.env.ZMQ || 'tcp://127.0.0.1:43332',
    'zmq-hashtx': process.env.ZMQ || 'tcp://127.0.0.1:43332',
    'zmq-rawtx': process.env.ZMQ || 'tcp://127.0.0.1:43332'
  },
  ipc: {
    ipcName: process.env.IPC_NAME || 'bitcoin',
    ipcPath: process.env.IPC_PATH || '/tmp/',
    appSpace: process.env.APP_SPACE || 'app.'
  }

};