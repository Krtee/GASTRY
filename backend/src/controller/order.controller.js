const OrderModel = require("../models/order.model");
var ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user.model');
const Chat = require('../models/chat.model');


class OrderController {
    constructor(model) {
        this.model = model;

        this.fetchOrders = this.fetchOrders.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.modifyOrder = this.modifyOrder.bind(this);
        this.getOrder = this.getOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);

    }

    async fetchOrders(req, res){
        try {
            const userId = req.decoded.id;

            const result = await User.findOne({
                _id: userId
            }, 'orders').populate('orders.supplier_id orders.customer_id', 'company').exec()
            res.status(200).send({
                message: "Fetch worked",
                data: result.orders
            });
        }
        catch (e) {
            res.status(400).json({message: e});
        }


    }

    async getOrder (req,res){

    }


    async addOrder (req,res ) {
        console.log("should go in here")
        try {


            const userId = req.decoded.id;
            const { supplierId, products, total} = req.body;
            let orderId = new ObjectId()
            console.log(orderId)

            /* create chat object and reference to it in the home item*/

            const chatItem = {
                _id: orderId
            }
            const chatlist = new Chat(chatItem)
            await chatlist.save()
            const newItem = {
                _id: orderId,
                chat_id: orderId,
                customer_id: userId,
                supplier_id: supplierId,
                products: products,
                total: total
            }
            //console.log(newItem);
            const resultSupplier = await User.findOne({
                _id: supplierId
            }).select('orders')
            const resultCustomer = await User.findOne({
                _id: userId
            }).select('orders')
            //console.log(resultSupplier+" "+ resultCustomer)

            const productsUpdatedCustomer = [newItem, ...resultCustomer.orders];
            const productsUpdatedSupplier = [newItem, ...resultSupplier.orders];

            //console.log(productsUpdatedCustomer)
            resultCustomer.orders = productsUpdatedCustomer;
            resultSupplier.orders = productsUpdatedSupplier;
            //console.log(resultCustomer.orders)
            await resultSupplier.save();
            await resultCustomer.save();
            res.status(200).json({
                message: "Successfully added item"
            })

        }
        catch (e) {
            console.log("yo didnt work")
            res.status(400).json({
                message: e
            })
        }



    }

    async deleteOrder (req, res ) {
        try {
            console.log(req.body.orderId)
            const orderId = new ObjectId(req.body.orderId);
            console.log(req.body.orderId)
            console.log(orderId);
            const result = await SupplierModel.findOneAndUpdate({
                'catalog._id': orderId
            }, {
                $pull: { orders: { _id: orderId}
                }
            })

            if (result === null) {
                res.status(404).json({
                    message: "Item doesn't exist"
                })
                return;
            }

            console.log(result);
            console.log("Hi")
            res.status(200).json({
                data: result,
                message: "Successfully deleted item"
            })
        }
        catch (e) {
            res.status(400).json({
                message: "Deleting item didnt work",
                error: e
            })
        }


    }
    async modifyOrder (req, res) {
        try {

            console.log(req.body.status)
            const itemId = req.params._id;
            console.log(itemId)
            //console.log(itemId)
            //console.log(updatedItem)
            //console.log(itemId)

            /*const doc = await  User.find({
                'orders._id': itemId
            })
            res.status(200).send({
                users: doc
            })*/
            const doc = await User.updateMany({
                'orders._id': itemId
            }, { $set: {"orders.$.status" : req.body.status}}, {
                new: true,
                runValidators: true
            })
            res.status(200).send({
                message: "Updated item successfully!",
                id: itemId,
                orders: doc.users
            })

        }
        catch (e) {
            res.status(400).json({
                message: 'Modifying item didnt work'
            })
        }
    }



}

module.exports = OrderController;
