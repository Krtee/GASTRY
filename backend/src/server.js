const app = require('./app');
const PORT = process.env.SERVER_PORT;
let jwt = require('jsonwebtoken');
const chatRouter = require('./routers/api/chat.router');
const chatController = require('./controller/chat.controller')
const Chat = require('./models/chat.model')


const server = app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

const io = require("socket.io")(server);

io.use(async (socket,next)=> {
    try{
        console.log(io.path())
        let token = socket.handshake.query.token
        console.log(token);
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
        if (token) {
            await jwt.verify(token, process.env.SECRET_OR_KEY, (err, decoded) => {
                if (err) {
                    console.log("Not valid")
                    next(new Error('Token is not valid'))
                    /*res.status(400).json({
                        success: false,
                        message: 'Token is not valid'
                    });*/
                } else {
                    console.debug("Got token!")
                    socket.userId = decoded.id;
                    next();
                }
            });
        } else {
            console.log("not supp")
            next(new Error('Auth token is not supplied'))

            /*
            return res.json({
                success: false,
                message: 'Auth token is not supplied'
            }); */
        }
    }
    catch (e) {
        next(new Error('Sorry couldnt get token'))

        /*
        res.status(404).send({
            message: "Sorry couldn't get token",
            error: e
        })
         */
    }
})

io.on('connection', (socket) => {
    console.log("Connected " + socket.userId);
    socket.emit("test", "hi" );
    socket.join(socket.chatId);
    socket.on('disconnect', () => {
        console.log("Disconnected user: " + socket.userId);
    });



    socket.on('fetchChat',async (data) => {
        const chatId = data.chatId;
        console.log(chatId)
        console.log("on for fetch on backend works")
        const result = await Chat.findOne({
            _id: chatId
        }).select('messages')
        console.log("fetchFater?")
        socket.emit("fetchChat", {
            chat: result
        })

    });

    socket.on('newMessage', data => {

        const message = {
            message: data.message,
            date: new Date(Date.now()),
            user: data.userId
        };
        io.to(socket.chatId).emit("newMessage", {
            newMessage: message
        });

    })
});

io.on('writeMessage',(socket) =>{

})
app.use((req,res,next) => {
    req.io = io;
    next()
});
app.use('/chat', chatRouter);




