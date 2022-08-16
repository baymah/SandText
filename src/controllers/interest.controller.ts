import { Router } from 'express'
import { InterestService } from '../services/interest.service'
import { AuthMiddleware } from '../middlewares/authMiddleware'
import { authService } from '../services/auth'
import { userRepo } from '../repository'
const authMiddleware = new AuthMiddleware(authService)

const Interest = Router()

/**
 * Create Interest
 *
 * @Method POST
 * @URL /api/interests
 *
 */
Interest.route('/').post(async (req: any, res: any) => {
      const interestService = new InterestService()
      const { name, video, picture } = req.body
      try {
            const interest = await interestService.insertInterestData({
                  name,
                  video,
                  picture,
            })
            return res.status(200).json({
                  success: true,
                  message: 'Interest successfully created',
                  data: interest,
            })
      } catch (error: any) {
            return res.status(500).json({
                  success: false,
                  message: 'Error creating interest',
                  error: error.message,
            })
      }
})
/**
 * Register User
 *
 * @Method POST
 * @URL /api/auth/register
 *
 */
Interest.route('/:id').get(async (req: any, res: any) => {
      const userService = new InterestService()
      const { id } = req.params
      try {
            const interest = await userService.getById(id) ///some data to save here
            if (!interest)
                  return res.status(200).send({
                        success: false,
                        message: 'Error fetching interest',
                  })
            return res.status(200).json({
                  success: true,
                  data: interest,
            })
      } catch (error: any) {
            console.log(error.message)
      }
})

Interest.route('/addInterestToUser').post(
      authMiddleware.authenticate(),
      async (req: any, res: any) => {
            const interestService = new InterestService()
            try {
                  const interest = await interestService.getAll() ///some data to save here
                  const user = await userRepo.getUserByEmail(
                        req.requestUser.email
                  )
                  const addingInterestToUser = interest.map(
                        async (interest) => {
                              user.interestId = interest
                              return await user.save()
                        }
                  )
                  console.log(addingInterestToUser, 'Interest...')
                  console.log(interest, 'Interest...')
                  // if (!interest)
                  //       return res
                  //             .status(400)
                  //             .send({
                  //                   success: false,
                  //                   message: "Error fetching interest",
                  //             });
                  return res.status(200).json({
                        success: true,
                        data: interest,
                  })
            } catch (error: any) {
                  console.log(error.message)
            }
      }
)
const create = async (req: any, res: any) => {
      const interestService = new InterestService()
      const { name, video, picture } = req.body
      try {
            const interest = await interestService.insertInterestData({
                  name,
                  video,
                  picture,
            })
            return res.status(200).json({
                  success: true,
                  message: 'Interest successfully created',
                  data: interest,
            })
      } catch (error: any) {
            return res.status(500).json({
                  success: false,
                  message: 'Error creating interest',
                  error: error.message,
            })
      }
}

const list = async (_req: any, res: any) => {
      const interestService = new InterestService()
      try {
            const interest = await interestService.getAll() ///get all  data to save here
            if (!interest)
                  return res.status(200).send({
                        success: false,
                        message: 'Error fetching interest',
                  })
            return res.status(200).json({
                  success: true,
                  data: interest,
            })
      } catch (error: any) {
            console.log(error.message)
            return res.status(500).json({ error: error.message })
      }
}

const userInterest = async (_req: any, _res: any) => {
      console.log('load the interest of a user')
}
// export default Interest;
export { create, list, userInterest }
