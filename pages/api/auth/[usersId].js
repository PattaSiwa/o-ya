import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/user'

dbConnect()


export default async (req, res) => {
    const {
        query: { userId },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const user = await User.findById(userId)

                if (!user) {
                    return res.status(400).json({ sucess: false })
                }

                res.status(200).json({ sucess: true, data: user })
            }
            catch (error) {
                res.status(400).json({ sucess: false })
            }
            break

        case 'PUT':

            try {
                const user = await User.findByIdAndUpdate(userId, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!user) {
                    return res.status(400).json({ sucess: false })
                }

                res.status(200).json({ sucess: true, data: user })

            }
            catch (error) {
                res.status(400).json({ sucess: false })
            }
            break

        case 'DELETE':
            try {
                const deletedUser = await User.deleteOne({ _id: userId })

                if (!deletedUser) {
                    return res.status(400).json({ sucess: false })
                }

                res.status(200).json({ sucess: true, data: {} })

            }
            catch (error) {
                res.status(400).json({ sucess: false })
            }
            break
        default:
            res.status(400).json({ sucess: false })
            break
    }
}