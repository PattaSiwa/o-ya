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

                console.log(user)
                return { email: user.email, id: user._id }

            }

        })
    ],
    callbacks: {
        jwt: async (token, user, account, profile, isNewUser) => {
            if (user) {
                token.uid = user.id;
            }
            return Promise.resolve(token);
        },
        session: async (session, user) => {
            session.user.uid = user.uid;
            return Promise.resolve(session);
        }
    }
})