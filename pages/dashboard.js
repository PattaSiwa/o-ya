import classes from './dashboard.module.css'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/client'
export default function Dashboard() {

    return (
        <div className={classes.Dashboard}>
            <h1 >This is the Dashboard</h1>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req })
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: { session },
    }
}