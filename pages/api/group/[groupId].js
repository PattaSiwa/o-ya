import dbConnect from '../../../utils/dbConnect'
import Group from '../../../models/group'
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

    switch (method) {
        case 'GET':

            try {
                const group = await Group.findById(groupId)

                if (!group) {
                    return res.status(400).json({ sucess: false })
                }

                res.status(200).json({ sucess: true, data: group })
            }
            catch (error) {
                res.status(400).json({ sucess: false })
            }
            break

        case 'PUT':

            try {
                const group = await Group.findByIdAndUpdate(groupId, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!group) {
                    return res.status(400).json({ sucess: false })
                }

                res.status(200).json({ sucess: true, data: group })

            }
            catch (error) {
                res.status(400).json({ sucess: false })
            }
            break

        case 'DELETE':
            try {
                const deletedGroup = await Group.deleteOne({ _id: groupId })

                if (!deletedGroup) {
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