import classes from '../styles/pages-styles/dashboard.module.css'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/client'
import Add from '../components/ui/Add'
import GroupForm from '../components/input/GroupForm'
import useSWR from 'swr'
import GroupCard from '../components/ui/GroupCard'


export default function Dashboard(props) {
    const [groupFormDisplay, setGroupFormDisplay] = useState(false)


    function handleGroupForm() {
        setGroupFormDisplay(!groupFormDisplay)
    }


    const userId = props.session.user.uid
    const userEmail = props.session.user.email

    //getting groups that user is the owner
    const { data: groupData, error: groupError } = useSWR('/api/group/user/' + userId)
    const [groups, setGroupsData] = useState([])

    useEffect(() => {
        if (groupData) {
            setGroupsData(groupData.data)
        }
    }, [groupData])

    //getting groups that user is the member
    const { data: groupMemberData, error: memberGroupError } = useSWR('/api/group/' + userId)
    const [memberGroups, setMemberGroups] = useState([])

    useEffect(() => {
        if (groupMemberData) {
            setMemberGroups(groupMemberData.data)
        }
    }, [groupMemberData])


    return (
        <div className={classes.Dashboard}>
            <Add content={'GROUP'} formHandle={handleGroupForm} />
            {groupFormDisplay && <GroupForm userId={userId} handleForm={handleGroupForm} />}
            <div className={classes.cardContainer}>
                {groups.map(group => {
                    return <GroupCard
                        key={group._id}
                        user={userId}
                        email={userEmail}
                        owner={group.owner}
                        members={group.members}
                        id={group._id}
                        name={group.name}
                    />
                })}
                {memberGroups.map(group => {
                    return <GroupCard
                        key={group._id}
                        user={userId}
                        email={userEmail}
                        owner={group.owner}
                        members={group.members}
                        id={group._id}
                        name={group.name}
                    />
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