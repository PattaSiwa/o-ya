import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/user'

dbConnect()

//querry all users 

export default async (req, res) => {
    const { method } = req;

    if (method === 'GET') {
        try {
            const users = await User.find({});
            res.status(200).json({ sucess: true, data: users })
        }
        catch (error) {
            res.status(400).json({ success: false, message: error })
        }
    }
}