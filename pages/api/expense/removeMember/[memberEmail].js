import dbConnect from '../../../../utils/dbConnect'
import Expense from '../../../../models/expense'
import { getSession } from 'next-auth/client'

dbConnect()


export default async (req, res) => {
    const {
        query: { memberEmail },
        method
    } = req;

    const session = await getSession({ req: req })

    if (!session) {
        res.status(401).json({ message: "Not Authenticated" })
        return;
    }

    if (method === "DELETE") {
        //deleting all expenses asscoiate with user
        try {
            const deletedExpenses = await Expense.deleteOne({ _id: memberEmail })

            if (!deletedExpense) {
                return res.status(400).json({ sucess: false })
            }

            res.status(200).json({ sucess: true, data: {} })

        }
        catch (error) {
            res.status(400).json({ sucess: false })
        }


    }

}