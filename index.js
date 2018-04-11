const config = require('./config'),
  bzmq = require('bzmq'),
  IPC = require('./plugins/IPC'),
  HTTP = require('./plugins/HTTP'),
  FullNode = config.blockchain === 'litecoin' ?
    require('lcoin').fullnode : require('bcoin').fullnode;

const node = new FullNode(config.node);
let net;

if(config.type) {
  net = new IPC(config.ipc);
} else {
  net = new HTTP(config.http)
}

node.use(net);
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