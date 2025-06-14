const Server = require('./server');
const config = require('./config');

new Server(config.host, config.port);
