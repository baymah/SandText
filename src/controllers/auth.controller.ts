import { loggerUtil } from '../utils';
import { Request, Response } from 'express';
import { PasswordResetDTO, PasswordResetDTOSchema } from '../Dtos/PasswordResetDto';
import { tokenRepo, userRepo } from '../repository';
import { hashPassword } from '../utils/auth';
import { joiValidate } from '../utils/validator';
// import { MailService } from '../services/mail.Service';
import { ForgotPasswordDTO, ForgotPasswordDTOSchema } from '../Dtos/ForgotPasswordDto';
const crypto = require('crypto');
import { LoginDTOSchema, LoginDTO } from '../Dtos/LoginDto';
import { bcryptCompare } from '../utils/auth';
import { config } from '../config';
import * as jwt from 'jsonwebtoken';
import UserActivitiesServices from '../services/UserActivitiesService';
// import { sendEmail } from '../services/MailService/aws.mail.service';
import { ShopRepo } from '../shop/src/repository';
// import { MailGunService } from '../services/MailService/mailgun.service';
import { sendMail } from '../services/MailService/mailgun.service';
const authConfig: any = config.auth;

/**
 * Login User
 *
 * @Method POST
 * @URL /api/auth/login
 *
 */

function endRequest(res: any, message: string, success: boolean, statusCode: 401 | 400 | 500 | 403 | 200 | 201) {
    return res.status(statusCode).json({ success, message });
}
const login = async (req: Request, res: Response) => {
    const message = 'LOGGIN IN USER';
    loggerUtil.log(`${message}: ${JSON.stringify(req.body)}`, 'REQUEST LOG');
    try {
        const { error, value: vRequest } = joiValidate<LoginDTO>(LoginDTOSchema, req.body);
        if (error)
            return res.status(200).send({
                success: false,
                message: 'Validation(s) error',
                error: error.message,
            });
        const { email, password } = vRequest;
        const user: any = await userRepo.getUserByEmail(email);
        if (!user) return endRequest(res, 'Invalid email or password', false, 200);
        const match = await bcryptCompare(password, user.password);
        if (!match) return endRequest(res, 'Invalid email or password', false, 200);
        const token = jwt.sign(
            { id: user.id, email: user.email, phone: user.phone || null },
            authConfig.secret,
            //     {
            //     expiresIn: authConfig.authExpiresIn,
            // }
        );
        const userActivitiesService = new UserActivitiesServices();
        const userActivities = await userActivitiesService.create({
            user_id: user.id,
            platform: req.headers.portal,
            activity: 'Signup',
            type: 'Signup',
            city: 'Lagos',
            region: 'Ikoyi',
            country: 'Nigeria',
            latitude: '6.45305560',
            longitude: '3.43555560',
            status: 1,
        });
        console.log('USERACTIVITIES', userActivities);

        //check if user has shop created...
        let shop_meta;
        const shopResult = await new ShopRepo().checkUserShop(user.id);
        if (shopResult) {
            shop_meta = {
                ...shopResult,
            };
        } else {
            shop_meta = {
                id: '',
                shopName: '',
                categoryId: '',
            };
        }
        // res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({
            message: 'User logged in successful',
            success: true,
            token,
            shop_meta,
            user: {
                id: user.id,
                username: user.username ? user.username : '',
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (error: any) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

/**
 * Register Auth
 *
 * @Method POST
 * @URL /api/auth/reset_password
 *
 */
const passwordReset = async (req: Request, res: Response) => {
    try {
        const { error, value: vRequest } = joiValidate<PasswordResetDTO>(PasswordResetDTOSchema, req.body);
        const { password, confirm_password, token } = vRequest;
        if (error)
            return res.status(400).json({
                success: false,
                message: 'Validation(s) error',
                error: error.message,
            });
        if (password !== confirm_password)
            return res.status(201).json({ success: false, message: 'Password Not match' });
        // const { email } = req.requestUser
        // console.log(email, 'User...')
        // const user = await userRepo.getUserByEmail(email)
        // if (!user)
        //     return res.status(200).json({
        //         success: false,
        //         message: `User with email ${email} not in db`,
        //     })
        // const hashedPassword = await hashPassword(password)
        // const updateUserData = {
        //     password: hashedPassword,
        // }
        // await userRepo.updateUserById(user.uuid, updateUserData)
        // return res
        //     .status(200)
        //     .json({ success: true, message: 'Password updated' })
        const userToken = await tokenRepo.getTokenByName(token);

        if (!userToken) return res.status(400).json({ success: false, message: 'Token not found' });
        if (userToken.otp !== token || Date.now() > parseInt(userToken.expires_at))
            return res.status(403).json({
                success: false,
                message: 'Token not match or expires',
            });
        const hashedPassword = await hashPassword(password);
        const tokenObject = await tokenRepo.updateTokenById(userToken.id, {
            token: '',
            expires_at: 0,
        });
        const updateUserData = {
            password: hashedPassword,
            token: tokenObject,
        };
        await userRepo.updateUserById(userToken.user_id, updateUserData);
        return res.status(200).json({ success: true, message: 'password updated' });
    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const forgotPassword = async (req: Request, res: Response) => {
    // const mailGunMailerService = new MailGunService();
    const { error, value: vRequest } = joiValidate<ForgotPasswordDTO>(ForgotPasswordDTOSchema, req.body);
    if (error) return res.status(400).send({ error: error.message });
    try {
        const { email } = vRequest;
        const user = await userRepo.getUserByEmail(email);
        if (!user)
            return res.status(200).json({
                success: false,
                message: `Email ${email} does not exist `,
            });

        const token = crypto.randomBytes(20).toString('hex');
        const userToken = await tokenRepo.getTokenByUUID(user.id);
        if (!userToken) {
            const tokenObj = await tokenRepo.save({
                user_id: user.id,
                email: user.email,
                token,
                expires_at: Date.now() + 120000,
            });
            const updateUserData = { token: tokenObj };
            await userRepo.updateUserById(user.id, updateUserData);
        } //update it
        if (userToken) {
            await tokenRepo.updateTokenById(userToken.id, {
                user_id: user.id,
                token,
                expires_at: Date.now() + 120000,
            });
        }

        // const subject = 'Password Reset Link';
        // const content =
        //     'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        //     'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
        //     `https://edekee.com/reset?token=${token}\n\n` +
        //     'If you did not request this, please ignore this email and your password will remain unchanged.\n';
        // const mailService = new MailService();
        // await mailService.sendMail(email, subject, 'Reset Link', content);

        const content =
            `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account</p>
            <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
            <a href="https://edekee.com/reset?token=${token}">https://edekee.com/reset?token=${token}</a>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;
        // const resultFromSent = sendEmail(email, 'Password Reset Link', content, 'ikbenezer@gmail.com');
        // console.log(resultFromSent, 'RESULT AFTER SENZT:::');
        sendMail(email, 'Otp Code', content);

        return res.status(200).send({
            success: true,
            message: 'Password reset link sent to the user email',
        });
    } catch (err: any) {
        return res.status(400).json({ success: false, error: err.message });
    }
};

export { passwordReset, forgotPassword, login };
