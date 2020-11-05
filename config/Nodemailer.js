

async function test_email()
{
    try 
    {
        //let test_acc = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({

            host: "smtp-mail.outlook.com", //"smtp.ethereal.email",
            secureConnection: false,
            port: 587,
            tls: {ciphers: "SSLv3"},
            //secure: false,
            auth: {

                user: 'kiera.roberts45@ethereal.email', //test_acc.user,
                pass: '3d5UM8VgE2mE5R8fch', //test_acc.pass, 
            },
            debug: true,
            logger: true,
        });

        let info = await transporter.sendMail({

            from: '"Kiera Roberts" <kiera.roberts45@ethereal.email>',
            to: "dnoel_26@hotmail.com",
            subject: "Hello",
            text: "Hello from Cyberdise",
            html: "<b>Hello from Cyberdise</b>",
        });
        
        console.log("EMAIL SENT",info);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));    
    } 
    catch(err) 
    {
        console.log(`Error in email: ${err}`);
    }
};


async function signup_email()
{
    try 
    {
        console.log("ABOUT TO SEND EMAIL");
        
        let transporter = nodemailer.createTransport({

            host: "smtp.mailtrap.io",
            port: 2525,
            //secure: false,
            auth: {

                user: 'f2f8f4259fa351', //test_acc.user,
                pass: '0486006aeafb3f', //test_acc.pass, 
            },
        });

        let info = await transporter.sendMail({

            from: '"Kiera Roberts" <kiera.roberts45@ethereal.email>',
            to: "kiera.roberts45@ethereal.email, dnoel_26@hotmail.com",
            subject: "Hello There From Cyberdise",
            text: "Hello from Cyberdise",
            html: "<b>Hello from Cyberdise</b>",
        });
        
        console.log("EMAIL SENT",info);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    } 
    catch(err) 
    {
        console.log(`Error in email: ${err}`);
    }
};

const Nodemail_send = 
{
    init()
    {
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
                //secure: false,
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
            })
            .catch(err=>{

                reject(`Error in Nodemailer_mw.js: Nodemail_send: ${err}`);
            });
        });
    }
}

module.exports = Nodemail_send;