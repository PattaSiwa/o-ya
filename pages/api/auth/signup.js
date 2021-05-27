import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/user'
import { hashPassword } from '../../../utils/hashPassword';

dbConnect()

export default async (req, res) => {
    const { method } = req;

    const { email, password } = req.body


    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
        res.status(422).json({ message: "Invalid input - email must include @ or password must be at least 7 characters long" })
        return
    }

    const hashedPassword = await hashPassword(password)

    if (method === 'POST') {
        try {
            const user = await User.create({
                email: email,
                password: hashedPassword,
            })

            res.status(201).json({ message: 'Created user', data: user })
        }
        catch (error) {
            res.status(400).json({ success: false, message: error })
        }
    }


}