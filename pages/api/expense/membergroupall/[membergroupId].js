import dbConnect from '../../../../utils/dbConnect'
import Expense from '../../../../models/expense'
import { getSession } from 'next-auth/client'

dbConnect()


export default async (req, res) => {
    const {
        query: { membergroupId },
        method
    } = req;

    const querySplit = membergroupId.split('&')
    //extracting the groupId and ownerId from params
    const memberEmail = querySplit[0]
    const groupId = querySplit[1]

    console.log(memberEmail)
    console.log(groupId)

    // const session = await getSession({ req: req })

    // if (!session) {
    //     res.status(401).json({ message: "Not Authenticated" })
    //     return;
    // }

    if (method === "DELETE") {
        try {
            //find all the expeneses in the group
            const expenses = await Expense.remove({ group: groupId, email: memberEmail })

            if (!expenses) {
                return res.status(400).json({ sucess: false, message: 'data not found' })
            }



            res.status(200).json({ sucess: true, data: expenses })
        }
        catch (error) {
            res.status(400).json({ sucess: false, messsage: "something happened" })
        }
    }

}