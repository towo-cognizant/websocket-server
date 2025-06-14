const { TextDecoder } = require('util');

const modules = require('./modules');

function validate(message) {
    if (typeof message !== 'object') throw TypeError('Message is not an object');

    if (!message.action) throw new TypeError('Action missing in message');
    if (!message.module) throw new TypeError('Module missing in message');
    if (!message.type) throw new TypeError('Type missing in message');

    console.debug('parse.validate', message.action, message.module, message.type);

    return true;
}

function execute(message, socket) {
    const name = message.module;
    const instance = modules[name];

    if (!instance) throw Error(`Unknown module "${name}"`);

    instance(message, socket);
}

function parse(buffer, socket) {
    const decoder = new TextDecoder();
    const string = decoder.decode(buffer);

    console.debug('parse.string', string);

    try {
        const message = JSON.parse(string);

        validate(message);
        execute(message, socket);
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = parse;
