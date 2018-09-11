const config = require('./config'),
  bzmq = require('bzmq'),
  IPC = require('./plugins/IPC');

const blockchain = {
  litecoin: {
    networks: require('lcoin/lib/protocol/networks'),
    node: require('lcoin').fullnode
  },
  bitcoin: {
    networks: require('bcoin/lib/protocol/networks'),
    node: require('bcoin').fullnode
  },
  bcc: {
    networks: require('@bcash-org/bcash/lib/protocol/networks'),
    node: require('@bcash-org/bcash').FullNode
  }
};

const node = new blockchain[config.blockchain].node(config.node);
const ipc = new IPC(config.ipc);

node.use(ipc);
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