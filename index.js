const config = require('./config'),
  bzmq = require('bzmq'),
  IPC = require('./plugins/IPC'),
  HTTP = require('./plugins/HTTP'),
  FullNode = config.blockchain === 'litecoin' ?
    require('lcoin').fullnode : require('bcoin').fullnode;

const node = new FullNode(config.node);

const ipc = new IPC(config.ipc);
const http = new HTTP(config.http);

node.use(ipc);
node.use(http);
node.use(bzmq);

(async () => {

  await node.open();

  await node.connect();

  node.on('connect', (entry) => {
    console.log('%s (%d) added to chain.', entry.rhash(), entry.height);
  });

  node.on('tx', (tx) => {
    console.log('%s added to mempool.', tx.txid());
  });

  node.startSync();
})().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});