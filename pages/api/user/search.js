import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/user'



dbConnect()


export default async (req, res) => {
    const { method } = req

    console.log(req.body)

    if (method === "POST") {
        try {

            const user = await User.findOne(req.body)
            console.log(user)

            if (!user) {
                return res.status(400).json({ sucess: false, message: "User not found" })
            }

            const foundUser = {
                id: user._id,
                email: user.email
            }

            console.log(foundUser)

            res.status(200).json({ sucess: true, data: foundUser })
        }
        catch (error) {
            res.status(400).json({ sucess: false, message: "Something went wrong" })
        }


    }

}