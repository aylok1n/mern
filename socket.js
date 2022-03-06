const User = require('./models/User')
const jwt = require('jsonwebtoken')
require('node-env-file')('.env')
const { JWT_SECRET } = process.env

const socketStart = (io) => {
    io.use(function (socket, next) {
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, JWT_SECRET, function (err, decoded) {
                if (err) return next(new Error('Authentication error'));
                socket.decoded = decoded;
                next();
            });
        }
        else next(new Error('Authentication error'));

    }).on('connection', async (socket) => {
        const { userId } = socket.decoded

        await User.findByIdAndUpdate(userId, {
            isOnline: true
        })

        socket.on('send', (msg) => {
            socket.emit('hi', '123');
            console.log('message: ' + msg);
        });


        socket.on('disconnect', async () => {
            await User.findByIdAndUpdate(userId, {
                isOnline: false,
                lastSeen: Date.now()
            })
        });
    });
}

module.exports = socketStart