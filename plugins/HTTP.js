'use strict';

const server = require('http').createServer(), 
    path = require('path'),
    fs = require('fs'),
    websocket = require('ws'),
    RPCBase = require('bcoin/lib/http/rpcbase');

class HTTP {
    constructor (node, config) {
        this.node = node;
        this.config = config;
        this.init();
    }

    init() {

        const ws = new websocket.Server({server});

        this.node.rpc.add('getcoinsbyaddress', async (...args) => {
            let coins = await this.node.getCoinsByAddress(...args);
            return coins.map(coin =>
             coin.getJSON(this.node.network.type)
            );
        });
  
        this.node.rpc.add('getmetabyaddress', this.node.getMetaByAddress.bind(this.node));

        ws.on('connection', (socket) => {
            console.log('New Connection');
            socket.on('message', async (data) => {
                try {
                    data = JSON.parse(data);
                    const json = await this.node.rpc.execute(data);
                    socket.send(JSON.stringify({result: json, id: data.id}));
                } catch (e) {
                    socket.send(JSON.stringify({
                        result: null,
                        error: {
                            message: 'Invalid request.',
                            code: RPCBase.errors.INVALID_REQUEST
                        }
                    }));
                }
            });
        });
    }

    open() {
                
        server.listen(this.config.port, () => {
            console.log('Server started on port: ', this.config.port);
        });
    }

    clode() {
        server.close();
    }
}

module.exports = class HTTPInter {
    constructor (config) {
        return {
            id: 'httpInterface',
            init: node => new HTTP(node, config)
        }
    }
};