import dbConnect from '../../../utils/dbConnect'
import Group from '../../../models/group'

dbConnect()

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const groups = await Group.find({});
                res.status(200).json({ sucess: true, data: groups })
            }
            catch (error) {
                res.status(400).json({ success: false })
            }
            break;

        case 'POST':
            try {
                const group = await Group.create(req.body)

                res.status(201).json({ success: true, data: group })
            }
            catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}