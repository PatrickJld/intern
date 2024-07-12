const { createMailer } = require("../setup/mailer");

async function sendEmail({ recepients, subject, text= "", html=""} = {}){
    console.log(recepients);
    let config = {
        from: process.env.MAILER_SENDER,
        subject: subject,
    };

    let r = "";
    if(recepients.length == 1){
        r = recepients[0];
        config.to=r;
    }else if (!Array.isArray(recepients)){
        r = recepients;
        config.to=r
    }else{
        for(let i = 0; i < recepients.length; i++){
            r += recepients[i] + ",";
        }
        r = r.substring(0, r.length - 1);
        config.bcc = r;
    }

    if(text != "")config.text = text;
    if(html != "")config.html = html;

    console.log("Message sent: %s", info.messageId);
}

module.exports = {sendEmail};