const mongoose = require('mongoose');
const Order = require('../models/orders');
const {DATABASE_CONNECTION_OPTIONS} = require('../constants');
const {sendEmail} = require('../utils');

const connUri = process.env.MONGO_URL;

module.exports = {
    add: (req, res) => {
        mongoose.connect(connUri, DATABASE_CONNECTION_OPTIONS, (err) => {
            let result = {};
            let status = 201;
            if (!err) {
                const {userId, email, cart, total, date, currency} = req.body;
                const products = cart.map(item => item.title).join(', ');
                const order = new Order({user_id: userId, total, products, date, currency});
                order.save((err, order) => {
                    if (!err) {
                        result.status = status;
                        result.result = order;
                        sendEmail(email,{
                            cart,
                            total,
                            currency
                        });
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                    }
                    res.status(status).send(result);
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    },
    getAll: (req, res) => {
        mongoose.connect(connUri, {useNewUrlParser: true}, (err) => {
            let result = {};
            let status = 200;
            if (!err) {
                const id = req.params['userId'];

                Order.find({user_id: id}, (err, orders) => {
                    if (!err) {
                        result.status = status;
                        result.error = err;
                        result.result = orders;
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                    }
                    res.status(status).send(result);
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    }
};
