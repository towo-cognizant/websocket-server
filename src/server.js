const { WebSocketServer } = require('ws');

const parse = require('./parse');

function Server(host, port) {
    const server = new WebSocketServer({ host, port });

    server.on('listening', () => {
        console.debug('listening...');
    });

    server.on('error', (error) => {
        console.error('server.error', error);
    });

    server.on('connection', (socket) => {
        console.debug('new connection...');

        socket.on('message', (message) => {
            console.debug('new message...');

            parse(message, socket);
        });

        socket.on('error', (error) => {
            console.error('socket.error', error);
        });

        socket.on('close', (code) => {
            console.debug('connection closed', code);
        });
    });
}

module.exports = Server;
