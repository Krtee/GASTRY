const Chat = require('../models/chat.model');

class ChatController {
    constructor(model) {
        this.model = model;

        //this.writeMessage = this.writeMessage.bind.this
        //this.fetchChat = this.fetchChat.bind.this
    }

    async writeMessage(req, res) {
        try {
            const userId = req.decoded.id;
            const message = req.body.message;
            const chatId = req.params._chatId;

            var date = new Date();
            console.log(date.toLocaleString())

            const newMessage = {
                message: message,
                user: userId,
                date: date
            }


            const resultChat = await Chat.findOne({
                _id: chatId
            }).select('messages')


            const updatedChat = [newMessage, ...resultChat.messages];

            resultChat.messages = updatedChat



            await resultChat.save();

            return res.status(200).send({
                message: "Successfully added message"
            })



        } catch (e) {
            return res.status(400).send({
                error: e
            })
        }
    }


    async fetchChat(req, res) {
        try {
            const chatId = req.params._chatId;
            //const io = req.io;
            const result = await Chat.findOne({
                _id: chatId
            }).select('messages')
            //console.log(result);
            /*io.sockets.emit("fetchChat", {
                chat: result
            });*/

            return res.status(200).send({
                message: "Fetch worked",
                data: result

            });
        } catch (e) {
            console.log("i am here")
            return res.status(400).send({message: e});
        }
    }

    /*async accessChat(req, res) {
        try {
            const io = req.io;
            let access = "access chat works!";
            io.sockets.emit("accessChat", access);
            return res.status(200).json({message: "Successfully accessed chat"})
        } catch (e) {
            return res.status(400).json({error: e})
        }
    } */

}

module.exports = new ChatController();
