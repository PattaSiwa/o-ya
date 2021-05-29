import classes from './dashboard.module.css'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/client'
import AddGroup from '../components/ui/AddGroup'
import GroupForm from '../components/input/GroupForm'
// import dbConnect from '../utils/dbConnect'
// import Group from '../models/group'
import useSWR from 'swr'


export default function Dashboard(props) {
    const [groupFormDisplay, setGroupFormDisplay] = useState(false)

    function handleGroupForm() {
        setGroupFormDisplay(!groupFormDisplay)
    }
    const userId = props.session.user.uid

    const { data, error } = useSWR('/api/group/' + userId)

    const [groupsData, setGroupsData] = useState([])

    useEffect(() => {
        if (data) {
            setGroupsData(data.data)
        }
    }, [data])


    return (
        <div className={classes.Dashboard}>
            <AddGroup groupFormHandle={handleGroupForm} />
            {groupFormDisplay && <GroupForm userId={userId} handleForm={handleGroupForm} />}


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