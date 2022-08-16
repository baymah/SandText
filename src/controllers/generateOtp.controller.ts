import { Router } from 'express';
import { SendOtpDTO, SendOtpToMailDTOSchema } from '../Dtos/SendOtpToMailDto';
import { userRepo, otpRepo } from '../repository';
import { joiValidate } from '../utils/validator';
import { v4 as uuid } from 'uuid';
// import { MailService } from '../services/mail.Service';
// const nodemailer = require('nodemailer')
import { sendEmail } from '../services/MailService/aws.mail.service';
import * as dotenv from 'dotenv';
dotenv.config();

const Generate = Router();

/**
 * Generate Otp
 *
 * @Method POST
 * @URL /api/auth/generate/otp
 *
 */

function endRequest(res: any, message: string, success: boolean, statusCode: 401 | 400 | 500 | 403 | 200 | 201) {
  return res.status(statusCode).json({ success, message });
}
Generate.route('/').post(async (req: any, res: any) => {
  const { error, value: vRequest } = joiValidate<SendOtpDTO>(SendOtpToMailDTOSchema, req.body);
  if (error) return endRequest(res, 'Validation(s) error', false, 400);
  const { email } = vRequest;
  try {
    const userExist = await userRepo.getUserByEmail(email);
    if (userExist) return endRequest(res, 'User with email registered already', false, 200);
    //Generate Otp
    const otp = Math.floor(Math.random() * 1000000 + 1000000)
      .toString()
      .substring(1);
    // const now = new Date();
    // const expiration_time = AddMinutesToDate(now, 10);
    const expiration_time = Date.now() + 300000;
    // create OTP instance in DB

    const otpObj = {
      email: email,
      otp: otp,
      uuid: uuid(),
      expires_at: expiration_time,
    };

    const userOtp = await otpRepo.getOtpByEmail(email);
    if (!userOtp) {
      await otpRepo.save(otpObj);
      // const subject = 'Otp Code';
      // const content =
      //   'You are receiving this because you (or someone else) have requested the registration on edekee app.\n\n' +
      //   'Please use the token provided to complete the registration process within 5 minutes of receiving it:\n\n' +
      //   `OTP ${otp}\n\n` +
      //   'If you did not request this, please ignore this email.\n';
      // //send the user an email..."
      // const mailService = new MailService();
      //     await mailService.sendMail(email, subject, 'OTP Code', content);

      const content =
        'You are receiving this because you (or someone else) have requested the registration on edekee app.\n\n' +
        'Please use the token provided to complete the registration process within 5 minutes of receiving it:\n\n' +
        `OTP ${otp}\n\n` +
        'If you did not request this, please ignore this email.\n';
      const resultFromSent = sendEmail(email, 'Otp Code', content, 'ikbenezer@gmail.com');
      console.log(resultFromSent, 'RESULT AFTER SENZT:::');

      return res.status(200).send({
        success: true,
        message: 'Otp code generated and sent to the user email',
        data: otpObj,
      });
    } //update it
    const newUserOtp = {
      uuid: uuid(),
      otp,
      expires_at: Date.now() + 300000,
    };
    await otpRepo.updateOtpById(userOtp.id, newUserOtp);
    // const transporter = nodemailer.createTransport({
    //       service: 'gmail',
    //       auth: {
    //             user: `${process.env.ADMIN_EMAIL}`,
    //             pass: `${process.env.EMAIL_PASSWORD}`,
    //       },
    //       tls: {
    //             rejectUnauthorized: false,
    //       },
    // })

    // const mailOptions = {
    //       from: 'oladipuposegun007@gmail.com',
    //       to: `${email}`,
    //       subject: 'Link To Reset Password',
    //       text:
    //             'You are receiving this because you (or someone else) have requested the registration on edekee app.\n\n' +
    //             'Please use the token provided to complete the registration process within 5 minutes of receiving it:\n\n' +
    //             `OTP ${otp}\n\n` +
    //             'If you did not request this, please ignore this email.\n',
    // }
    // await transporter.sendMail(
    //       mailOptions,
    //       (err: any, response: any) => {
    //             if (err) {
    //                   console.error('There was an error: ', err)
    //             } else {
    //                   console.log('here is the res: ', response)
    //                   res.status(200).json({
    //                         success: true,
    //                         message: 'Recovery email sent.',
    //                   })
    //             }
    //       }
    // )
    const content =
      'You are receiving this because you (or someone else) have requested the registration on edekee app.\n\n' +
      'Please use the token provided to complete the registration process within 5 minutes of receiving it:\n\n' +
      `OTP ${otp}\n\n` +
      'If you did not request this, please ignore this email.\n';
    const resultFromSent = sendEmail(email, 'Otp Code', content, 'ikbenezer@gmail.com');
    console.log(resultFromSent, 'RESULT AFTER SENZT:::');
    return res.status(201).json({
      success: true,
      message: 'c',
      data: newUserOtp,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default Generate;
