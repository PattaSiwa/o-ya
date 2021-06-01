import dbConnect from '../../../../utils/dbConnect'
import Group from '../../../../models/group'
import { getSession } from 'next-auth/client'

dbConnect()


export default async (req, res) => {
    const {
        query: { membersId },
        method
    } = req;

    const session = await getSession({ req: req })

    if (!session) {
        res.status(401).json({ message: "Not Authenticated" })
        return;
    }

    try {
        const group = await Group.find({ "members.id": membersId })

        if (!group) {
            return res.status(400).json({ sucess: false })
        }

        res.status(200).json({ sucess: true, data: group })
    }
    catch (error) {
        res.status(400).json({ sucess: false })
    }

}