const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;

const round = (value, countSymbols = 2) => Math.floor(value * 10 ** countSymbols) / 10 ** countSymbols;

module.exports = {
    validateToken: (req, res, next) => {
        const token = req.cookies['token'];
        let result;
        if (token) {
            const options = {
                issuer: 'pacmanpizza'
            };
            try {
                // verify makes sure that the token hasn't expired and has been issued by us
                result = jwt.verify(token, process.env.JWT_SECRET, options);

                // Let's pass back the decoded token to the request object
                req.decoded = result;
                // We call next to pass execution to the subsequent middleware
                next(result.email);
            } catch (err) {
                // Throw an error just in case anything goes wrong with verification
                throw new Error(err);
            }
        } else {
            result = {
                error: `Authentication error. Token required.`,
                status: 401
            };
            res.status(401).send(result);
        }
    },
    formatUser: ({_id: id, email}) => ({id, email}),
    sendEmail: (email, data) => {
        let transport = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            auth: {
                user: smtpUser,
                pass: smtpPassword
            }
        });
        const {cart, total, currency} = data;
        const text = `You have made an order.
        The order contains: ${cart.map(item => item.title).join(', ')}.
        Total cost: ${round(total)}${currency === 'usd' ? '$' : '€'}.
        Our manager will contact you soon.
        Thanks for your choice.`;

        const message = {
            from: 'pacman.pizza@yandex.ru',
            to: email,
            subject: 'Pacman Pizza order',
            text
        };
        transport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log(info);
            }
        });
    }
};
