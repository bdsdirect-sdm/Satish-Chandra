"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailer = void 0;
const nodemailer = require('nodemailer');
exports.mailer = {
    transporter: nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'sc1163873@gmail.com', // Your email address
            pass: 'nzdtexywiesvidad', // Your email password or app-specific password
        }
    }),
    from: `sc1163873@gmail.com`
};
module.exports = exports.mailer;
