import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/user'



dbConnect()

export default async (req, res) => {
    const {
        query: { userId },
        method
    } = req;



    try {
        console.log(userId)
        const user = await User.findById(userId)
        console.log(user)
        if (!user) {
            return res.status(400).json({ sucess: false, message: "User not found" })
        }

        res.status(200).json({ sucess: true, data: user })
    }
    catch (error) {
        res.status(400).json({ sucess: false })
    }

}