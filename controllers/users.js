const mongoose = require('mongoose');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {DATABASE_CONNECTION_OPTIONS} = require('../constants');
const connUri = process.env.MONGO_URL;
const {formatUser} = require('../utils');

module.exports = {
    createUser: (req, res) => {
        mongoose.connect(connUri, DATABASE_CONNECTION_OPTIONS, (err) => {
            let result = {};
            let status = 201;
            if (!err) {
                const {email, password} = req.body;
                const user = new User({email, password});
                user.save((err, user) => {
                    if (!err) {
                        result.status = status;
                        result.result = formatUser(user);
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
    get: (req, res) => {
        mongoose.connect(connUri, DATABASE_CONNECTION_OPTIONS, (err) => {
            let result = {};
            let status = 200;
            const id = req.params['id'];
            if (!err) {
                User.findOne({_id: id}, (err, user) => {
                    if (!err) {
                        result.status = status;
                        result.error = err;
                        const {phone, address, currency, _id, email} = user;
                        result.result = {
                            id: _id,
                            email,
                            phone,
                            address,
                            currency
                        };
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

    updateUser: (req, res) => {
        mongoose.connect(connUri, DATABASE_CONNECTION_OPTIONS, (err) => {
            let result = {};
            let status = 200;
            const data = req.body;
            const {currency, phone, address, id, } = data;

            if (!err) {
                User.findOneAndUpdate({_id: data.id}, {$set: {currency, phone, address}}, {new: true}, (err, user) => {
                    if (!err) {
                        result.status = status;
                        result.error = err;
                        result.result = {
                            id: user._id,
                            email: user.email,
                            phone: user.phone,
                            address: user.address,
                            currency: user.currency
                        };
                        res.status(status).send(result);
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                        res.status(status).send(result);
                    }
                })
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    },

    obtainToken: (req, res) => {
        const {email, password} = req.body;

        mongoose.connect(connUri, DATABASE_CONNECTION_OPTIONS, (err) => {
            let result = {};
            let status = 200;
            if (!err) {
                User.findOne({email}, (err, user) => {
                    if (!err && user) {
                        bcrypt.compare(password, user.password).then(match => {
                            if (match) {
                                result.status = status;

                                const payload = {user: user.email};
                                const options = {expiresIn: '2d', issuer: 'pacmanpizza'};
                                const secret = process.env.JWT_SECRET;
                                const token = jwt.sign(payload, secret, options);

                                res.cookie('token', token);
                                result.status = status;
                                result.result = {id: user._id, token};
                            } else {
                                status = 401;
                                result.status = status;
                                result.error = 'Authentication error';
                            }
                            res.status(status).send(result);
                        }).catch(err => {
                            status = 500;
                            result.status = status;
                            result.error = err;
                            res.status(status).send(result);
                        });
                    } else {
                        status = 404;
                        result.status = status;
                        const errmsg = 'Wrong credentials';
                        result.error = {errmsg};
                        res.status(status).send(result);
                    }
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    },
    verifyToken: (req, res) => {
        const token = req.cookies['token'];
        const result = {};
        let status = 200;
        if (token) {
            const options = {
                expiresIn: '2d',
                issuer: 'pacmanpizza'
            };
            const data = jwt.verify(token, process.env.JWT_SECRET, options);
            mongoose.connect(connUri, DATABASE_CONNECTION_OPTIONS, (err) => {
                if (data && !err) {
                    User.findOne({email: data.user}, (err, user) => {
                        if (!err) {
                            const {currency, _id, email, address, phone} = user;
                            result.status = status;
                            result.error = err;
                            result.result = {
                                id: _id,
                                email,
                                phone,
                                address,
                                currency
                            };
                        } else {
                            status = 500;
                            result.status = status;
                            result.error = err;
                        }
                        res.status(status).send(result);
                    })
                } else {
                    status = 401;
                    result.status = status;
                    const errmsg = 'Not authorized';
                    result.error = {errmsg};
                    res.status(status).send(result);
                }
            })
        }
    }
};
