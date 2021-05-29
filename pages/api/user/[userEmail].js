import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/expense'



dbConnect()

export default async (req, res) => {
    const {
        query: { userEmail },
        method
    } = req;


    try {
        const user = await User.findOne({ email: userEmail })

        if (!user) {
            return res.status(400).json({ sucess: false, message: "User not found" })
        }

        res.status(200).json({ sucess: true, data: user })
    }
    catch (error) {
        res.status(400).json({ sucess: false })
    }

}