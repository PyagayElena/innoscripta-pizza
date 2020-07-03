const controller = require('../controllers/orders');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
    router.route('/order')
        .post(validateToken, controller.add);

    router.route('/orders/:userId')
        .get(validateToken, controller.getAll);
};
