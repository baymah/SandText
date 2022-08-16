import { Router } from 'express';
import { VerifyOtpDTO, VerifyOtpDTOSchema } from '../Dtos/VerifyOtpDto';
import { userRepo, otpRepo, interestRepo } from '../repository';
import { hashPassword } from '../utils/auth';
import { joiValidate } from '../utils/validator';
import { config } from '../config';
const authConfig: any = config.auth;
import * as jwt from 'jsonwebtoken';
// import UserActivitiesServices from '../services/UserActivitiesService';

const Verification = Router();
/**
 * Verify Otp
 *
 * @Method POST
 * @URL /api/auth/verify/otp
 *
 */
Verification.route('/').post(async (req: any, res: any) => {
    const { error, value: vRequest } = joiValidate<VerifyOtpDTO>(VerifyOtpDTOSchema, req.body);

    if (error)
        return res.status(200).send({
            status: false,
            message: 'Validation error(s)',
            error: error.message,
        });
    const { code, email,password, interests} = vRequest;

    try {
        const userExist = await userRepo.getUserByEmail(email);
        if (userExist)
            return res.status(200).json({
                message: `User with email: ${email} already registered`,
                success: false,
            });
        const otp = await otpRepo.getOtpByEmailAndCode(email, code);
        if (!otp)
            return res.status(200).json({
                success: false,
                message: `Otp for user ${email} not found`,
            });
        //check if the otp is not expired
        if (Date.now() > otp.expires_at) return res.status(200).send({ success: false, message: 'Otp expires' });

        // hash password
        const hashedPassword = await hashPassword(password);

        // let user = await userRepo.save({
        //     uuid: otp.uuid,
        //     email: otp.email,
        //     // username: username,
        //     password: hashedPassword,
        // });
       const interestsObject = await Promise.all(
            interests.map(async (interestId: any, _index: any) => {
                return await interestRepo.getInterestById(interestId);
                // user.interests = [interest];
                // if()
                // await userRepo.save(user);
            }),
            //save the userActivities
        );
        if(interestsObject.includes(undefined)) return res.status(200).json({success:false,message:"Interest(s) not found"})
         let user = await userRepo.save({
            uuid: otp.uuid,
            email: otp.email,
            // username: username,
            password: hashedPassword,
         });
        
        user.interests = interestsObject
        await userRepo.save(user)
        // console.log(tigerNut,"tigerNut",found)
        // const userActivitiesService = new UserActivitiesServices();
        // const userActivities = await userActivitiesService.create({
        //     user_id: user.uuid,
        //     platform: req.headers.portal,
        //     activities: 'Signup',
        //     type: 'Signup',
        //     city: 'Lagos',
        //     region: 'Ikoyi',
        //     country: 'Nigeria',
        //     latitude: '6.45305560',
        //     longitude: '3.43555560',
        //     status: 1,
        // });

        // console.log('USERACTIVITIES', userActivities);
        // Sing JWT, valid for 2 min
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                // username: user.username,
            },
            authConfig.secret,
            // {
            //     expiresIn: authConfig.authExpiresIn,
            // },
        );
        //send token to cookie
        // res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({
            message: 'Otp verification Successful and user created successfully',
            success: true,
            token,
            user: {
                id: user.id,
                // username: user.username,
                email: user.email,
            },
        });
    } catch (err: any) {
        return res.status(400).json({ success: false, message: err.message });
    }
});

export default Verification;
