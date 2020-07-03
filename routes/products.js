const controller = require('../controllers/products');

module.exports = (router) => {
    router.route('/products')
        .get(controller.getAll)
        .post(controller.add);

    router.route('/products/:id')
        .get(controller.getAll)
};
