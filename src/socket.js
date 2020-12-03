const Socket = require('socket.io');
let debug = require('debug')(`websocket:${__filename}`);
//let helpers = require('./helpers');
let axios = require('axios');

axios.defaults.baseURL = process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:8000';
debug(axios.defaults.baseURL);

//<editor-fold desc="utils">
const getIdentifierRoomName = (identifier) => {
    return `user:${identifier}`;
}

const getRoomRoomName = room => {
    return `room:${room}`;
}
//</editor-fold>


/**
 *
 * @param {Socket} io
 */
module.exports = (io) => {

    io.on('connection', socket => {

        socket.on('join', message => {
            let channelUser = `user:${message.user_id}`;
            let status = socket.join(channelUser);
            socket.emit('join',{
                join: status
            })
        });


        socket.on('disconnecting', () => {
            debug('disconnecting', Object.keys(socket.rooms) );
        });
    });
}
