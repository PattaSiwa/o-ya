import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/user'



dbConnect()

export default async (req, res) => {
    const {
        query: { userId },
        method
    } = req;

    if (userId.includes('@')) {

        // can also search user by email with this if check

        try {

            const user = await User.findOne({ email: userId })

            if (!user) {
                return res.status(400).json({ success: false, message: "User not found" })
            }

            const foundUser = {
                id: user._id,
                email: user.email
            }

            res.status(200).json({ success: true, data: foundUser })
        }
        catch (error) {
            res.status(400).json({ success: false })
        }
    } else {

        try {
            const user = await User.findById(userId)
            if (!user) {
                return res.status(400).json({ sucess: false, message: "User not found" })
            }
            res.status(200).json({ success: true, data: user })
        }
        catch (error) {
            res.status(400).json({ success: false })
        }

    }


}