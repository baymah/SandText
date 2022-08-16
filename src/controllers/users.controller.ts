import { Router } from 'express'
import { UserService } from '../services/users.service'

const authRouter = Router()

/**
 * Register User
 *
 * @Method POST
 * @URL /api/auth/register
 *
 */
authRouter
      .route('/register')

      .post(async (req: any, res: any) => {
            const userService = new UserService()
            const { password, email } = req.body
            try {
                  const user = await userService.insertUserData({
                        uuid: 'someuuid',
                        email: email,
                        password: password,
                  })

                  return res.status(200).json({
                        success: true,
                        data: user,
                  })
            } catch (error: any) {
                  console.log(error.message)
            }
      })

export default authRouter
