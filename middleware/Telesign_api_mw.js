const TeleSignSDK = require("telesignsdk");

exports.telesign_sms = (req,res,next)=>{

    const customer_id = process.env.TELESIGN_CUSTOMER_ID;
    const api_key = process.env.TELESIGN_API_KEY;
    const rest_endpoint = process.env.TELESIGN_REST_ENDPOINT;
    const timeout = 10*1000; // 10 secs

    const client = new TeleSignSDK( 
        
        customer_id,
        api_key,
        rest_endpoint,
        timeout // optional
        // userAgent
    );

    const phone_number = +18683336654//"**********";
    const message = "You're scheduled for a dentist appointment at 2:30PM.";
    const message_type = "ARN";

    console.log("## MessagingClient.message ##");

    function message_callback(error, responseBody) {
        if (error === null) {
            console.log(`Messaging response for messaging phone number: ${phone_number}` +
                ` => code: ${responseBody['status']['code']}` +
                `, description: ${responseBody['status']['description']}`);
        } else {
            console.error("Unable to send message. " + error);
        }
    }
    client.sms.message(message_callback, phone_number, message, message_type);

    next();
}

