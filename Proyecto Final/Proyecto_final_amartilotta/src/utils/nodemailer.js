import nodemailer from "nodemailer"
import config from "../config/config.js"


const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.gmailUser,
        pass: config.gmailPassword
    }
})

export async function sendMail(receivers, subject, content, options={}){

    const { html = true, attachments = [] } = options
    
    const transportOptions = {
        from: config.gmailUser,
        to: receivers,
        subject: subject,
    }
    
    if (html){
        transportOptions.html = content
    }
    else{
        transportOptions.text = content
    }
    
    if (attachments){
        transportOptions.attachments = attachments
    }

    await transport.sendMail(transportOptions)
}