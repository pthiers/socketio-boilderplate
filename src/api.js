let express = require('express');
let router = express.Router();
let debug = require('debug')(`websocket:${__filename}`);
let helpers  = require('./helpers');


router.post('/',(req, res) => {
    let { channel, payload, users } = req.body;
    const io = req.app.get("io");
    debug(req.body);
    if(Array.isArray(users)){
        users.forEach(user => {
           io.in(user).emit(channel, payload);
        });
        res.json({
            response: 'ok',
            message: `Total message sended ${users.length}`
        })
    } else {
        res.json({
            response: 'ok',
            message: 'No users sended'
        })
    }
});

router.post('/group', (req, res) => {
    let { channel, payload, group } = req.body;
    const io = req.app.get("io");
    io.in(group).emit(channel, payload);
    res.json({
        response: 'ok',
        message: `Message sended`
    })
});

module.exports = router;
