const nodemailer = require("nodemailer");

exports.send_nodemail_on_login = (req,res,next)=>{

    console.log("ABOUT TO SEND EMAIL");

    return new Promise((resolve,reject)=>{

        let transporter = nodemailer.createTransport({

            /*host: "",
            secureConnection: false,
            port: 587,
            tls: {ciphers: "SSLv3"},
            //secure: false,
            auth: {

                user: ,
                pass: , 
            },
            debug: true,
            logger: true,*/

            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT,
            secure: false,
            auth: {

                user: process.env.NODEMAILER_USERNAME,
                pass: process.env.NODEMAILER_PASSWORD 
            },
        });

        return transporter.sendMail({

            from: '"Darnell Noel" <dnoel_26@hotmail.com>',
            to: "dnoel_26@hotmail.com, darnellnoel.webdev@gmail.com",
            subject: "Hello There From Cyberdise",
            text: "Hello from Cyberdise - Sent using Nodemailer",
            html: "<b>Hello from Cyberdise - Sent using Nodemailer</b>",
        })
        .then((info)=>{

            console.log("EMAIL SENT",info);
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); 
            resolve(info);

            next();
        })
        .catch(err=>{

            reject(`Error in Nodemailer_mw.js: send_nodemail_on_login: ${err}`);

            next();
        });
    })
};