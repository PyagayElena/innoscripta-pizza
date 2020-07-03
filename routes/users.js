const controller = require('../controllers/users');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
    router.route('/user/registration')
        .post(controller.createUser);

    router.route('/user/update')
        .post(validateToken, controller.updateUser);

    router.route('/user/:id')
        .get(validateToken, controller.get);

    router.route('/token/obtaining')
        .post(controller.obtainToken);

    router.route('/token/verification')
        .get(controller.verifyToken)
};
