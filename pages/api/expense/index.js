import dbConnect from '../../../utils/dbConnect'
import Expense from '../../../models/expense'

dbConnect()

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const expenses = await Expense.find({});
                res.status(200).json({ sucess: true, data: expenses })
            }
            catch (error) {
                res.status(400).json({ success: false, message: error })
            }
            break;

        case 'POST':
            try {
                const expense = await Expense.create(req.body)

                res.status(201).json({ success: true, data: expense })
            }
            catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false, message: error })
            break;
    }
}