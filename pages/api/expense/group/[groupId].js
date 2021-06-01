import dbConnect from '../../../../utils/dbConnect'
import Expense from '../../../../models/expense'
import { getSession } from 'next-auth/client'

dbConnect()


export default async (req, res) => {
    const {
        query: { groupId },
        method
    } = req;

    const session = await getSession({ req: req })

    if (!session) {
        res.status(401).json({ message: "Not Authenticated" })
        return;
    }

    if (method === "GET") {
        try {
            const expenses = await Expense.find({ group: groupId })

            if (!expenses) {
                return res.status(400).json({ sucess: false })
            }

            res.status(200).json({ sucess: true, data: expenses })
        }
        catch (error) {
            res.status(400).json({ sucess: false })
        }
    }

}