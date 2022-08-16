const nodemailer = require('nodemailer');
import {config} from '../../../../config'

export interface IMessageService {
  sendMessage (user: any,subject:string, message: string):any
}

export class NodeMailerService implements IMessageService {

  constructor () {
  }
   sendMessage (user:any,subject:string,body:string){
    try{
        const smtpPassword = config.smtp.password;
        const smtpEmail = config.smtp.email

        let transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: 587,
        secureConnection: false,
        requiresAuth: true,
        auth: {
            user: smtpEmail,
            pass: smtpPassword
        },
      })
    const mailOptions = {
        from: smtpEmail,
        to: user.email.value,
        subject,
        // html: "<p>HeyGuess who just joined us</p>",
        html:body
        };

        transporter.sendMail(mailOptions, function(error:any, response:any) {
          if (error) {
            console.log(error,"error")
          } else {
            console.log("Successfully sent email.")
          }
        })
    }
    catch(notifyError:any){
      console.log(notifyError.message,"What error message");
    }
  }
}
