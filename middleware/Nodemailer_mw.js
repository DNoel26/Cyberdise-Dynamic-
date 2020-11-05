const nodemailer = require("nodemailer");

exports.send_nodemail_on_login = (req,res,next)=>{

    console.log("ABOUT TO SEND EMAIL");

    return new Promise((resolve,reject)=>{

        let transporter = nodemailer.createTransport({

            /*host: "smtp-mail.outlook.com", //"smtp.ethereal.email",
            secureConnection: false,
            port: 587,
            tls: {ciphers: "SSLv3"},
            //secure: false,
            auth: {

                user: //'kiera.roberts45@ethereal.email',
                pass: //'3d5UM8VgE2mE5R8fch', 
            },
            debug: true,
            logger: true,*/

            host: "smtp.mailtrap.io",
            port: 2525,
            secure: false,
            auth: {

                user: 'f2f8f4259fa351', //test_acc.user,
                pass: '0486006aeafb3f', //test_acc.pass, 
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