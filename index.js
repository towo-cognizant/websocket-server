const { WebSocketServer } = require('ws');

const config = require('./config.json');

// Global server instance
const server = new WebSocketServer({ host: config.host, port: config.port });

server.on('listening', () => {
    console.debug('server.listening');
});

server.on('error', (error) => {
    console.error('server.error', error);
});

server.on('connection', (socket) => {
    console.debug('server.connection');

    socket.on('message', (message) => {
        console.debug('socket.message');

        try {
            const data = JSON.parse(message);
            console.info('message.parse.data', data);
        } catch (error) {
            console.error('message.parse.error', error.message);
        }
    });

    socket.on('error', (error) => {
        console.error('socket.error', error);
    });

    socket.on('close', (code) => {
        console.debug('close', code);
    });
});
