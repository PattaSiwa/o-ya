import dbConnect from '../../../utils/dbConnect'
import Expense from '../../../models/expense'
import { getSession } from 'next-auth/client'

dbConnect()


export default async (req, res) => {
    const {
        query: { expenseId },
        method
    } = req;

    const session = await getSession({ req: req })

    if (!session) {
        res.status(401).json({ message: "Not Authenticated" })
        return;
    }

    switch (method) {
        case 'GET':
            try {
                const expense = await Expense.findById(expenseId)

                if (!expense) {
                    return res.status(400).json({ sucess: false })
                }

                res.status(200).json({ sucess: true, data: expense })
            }
            catch (error) {
                res.status(400).json({ sucess: false })
            }
            break

        case 'PUT':

            try {
                const expense = await Expense.findByIdAndUpdate(expenseId, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!expense) {
                    return res.status(400).json({ sucess: false })
                }

                res.status(200).json({ sucess: true, data: expense })

            }
            catch (error) {
                res.status(400).json({ sucess: false })
            }
            break

        case 'DELETE':
            try {
                const deletedExpense = await Expense.deleteOne({ _id: expenseId })

                if (!deletedExpense) {
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