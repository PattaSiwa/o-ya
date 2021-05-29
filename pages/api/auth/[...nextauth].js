import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/user'
import { verifyPassword } from '../../../utils/password'

dbConnect();

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {

                const user = await User.findOne({ email: credentials.email });

                if (!user) {

                    throw new Error('Email or Password incorrect')
                }

                const isValid = await verifyPassword(credentials.password, user.password)

                if (!isValid) {

                    throw new Error('Email or Password incorrect')
                }


                return { email: user.email, id: user._id }

            }

        })
    ]
})