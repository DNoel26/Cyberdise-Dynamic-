

async function test_email()
{
    try 
    {
        //let test_acc = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({

            host: "",
            secureConnection: false,
            port: '',
            tls: {ciphers: "SSLv3"},
            //secure: false,
            auth: {

                user: "",
                pass: ''
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

            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT,
            //secure: false,
            auth: {

                user: process.env.NODEMAILER_USERNAME,
                pass: process.env.NODEMAILER_PASSWORD 
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

                /*host: "",
                secureConnection: false,
                port: ,
                tls: {ciphers: "SSLv3"},
                //secure: false,
                auth: {

                    user: //'',
                    pass: //'', 
                },
                debug: true,
                logger: true,*/

                host: process.env.NODEMAILER_HOST,
                port: process.env.NODEMAILER_PORT,
                //secure: false,
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
            })
            .catch(err=>{

                reject(`Error in Nodemailer_mw.js: Nodemail_send: ${err}`);
            });
        });
    }
}

module.exports = Nodemail_send;