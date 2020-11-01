const nodemailer = require("nodemailer");

async function test_email()
{
    try 
    {
        //let test_acc = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({

            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {

                user: 'kiera.roberts45@ethereal.email', //test_acc.user,
                pass: '3d5UM8VgE2mE5R8fch', //test_acc.pass, 
            },
        });

        let info = await transporter.sendMail({

            from: '"Kiera Roberts" <kiera.roberts45@ethereal.email>',
            to: "kiera.roberts45@ethereal.email, dnoel_26@hotmail.com",
            subject: "Hello",
            text: "Hello from Cyberdise",
            html: "<b>Hello from Cyberdise</b>",
        })
        
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
        })
        
        console.log("EMAIL SENT",info);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));    
    } 
    catch(err) 
    {
        console.log(`Error in email: ${err}`);
    }
};

module.exports = signup_email();