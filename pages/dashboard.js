import classes from '../styles/pages-styles/dashboard.module.css'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/client'
import AddGroup from '../components/ui/AddGroup'
import GroupForm from '../components/input/GroupForm'
import useSWR from 'swr'
import GroupCard from '../components/ui/GroupCard'


export default function Dashboard(props) {
    const [groupFormDisplay, setGroupFormDisplay] = useState(false)

    function handleGroupForm() {
        setGroupFormDisplay(!groupFormDisplay)
    }
    const userId = props.session.user.uid
    const { data: groupData, error } = useSWR('/api/group/user/' + userId)
    const [groups, setGroupsData] = useState([])

    useEffect(() => {
        if (groupData) {
            setGroupsData(groupData.data)
        }
    }, [groupData])

    console.log(groups)


    return (
        <div className={classes.Dashboard}>
            <AddGroup groupFormHandle={handleGroupForm} />
            {groupFormDisplay && <GroupForm userId={userId} handleForm={handleGroupForm} />}
            <div className={classes.cardContainer}>
                {groups.map(group => {
                    return <GroupCard key={group._id} owner={group.owner} members={group.members} id={group._id} name={group.name} />
                })}
            </div>

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