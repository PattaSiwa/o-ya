import { Fragment, useState, useEffect } from 'react'
import classes from './GroupCard.module.css'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import EditGroupForm from '../input/EditGroupForm';
import UserSearch from '../input/UserSearch'
import Member from '../ui/Member'


export default function GroupCard(props) {
    const [editFormState, setEditFormState] = useState(false);
    const [searchFormDisplay, setSearchFormDisplay] = useState(false)

    const router = useRouter()

    function handleEditForm() {
        setEditFormState(!editFormState)

    }

    function handleSearchForm() {
        setSearchFormDisplay(!searchFormDisplay)
    }

    const groupId = props.id


    const { data: ownerData, error } = useSWR('/api/user/' + props.owner)
    const [owner, setOwner] = useState([])

    useEffect(() => {
        if (ownerData) {
            setOwner(ownerData.data)
        }
    }, [ownerData])


    async function deleteGroup() {

        const response = await fetch('/api/group/' + groupId, { method: 'DELETE' })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
        router.reload()

        return data;
    }

    async function deleteMember(memberEmail) {
        const copyMembers = [...props.members]
        const index = copyMembers.findIndex(member => member.email === memberEmail)
        copyMembers.splice(index, 1)
        try {
            const response = await fetch('/api/group/' + groupId, {
                method: "PUT",
                body: JSON.stringify({
                    members: copyMembers
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            router.reload()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <div className={classes.card}>
                <h3>{props.name}</h3>
                {props.owner === props.user && <button onClick={handleSearchForm}>Add Member</button>}
                {searchFormDisplay && <UserSearch handleForm={setSearchFormDisplay} groupId={props.id} members={props.members} />}
                <p>Members</p>
                <p>{owner.email}</p>
                {props.members.map(member => <Member email={member.email} id={member.id} key={member.id} deleteMember={deleteMember} />)}
                <Link href={"/group/" + props.id}><button>View Group</button></Link>
                {props.owner === props.user && <button onClick={deleteGroup}>Delete Group</button>}
                {props.owner === props.user && <button onClick={handleEditForm}>Edit Name</button>}
                {editFormState && <EditGroupForm handleForm={handleEditForm} name={props.name} id={props.id} />}
            </div>
        </Fragment>

    )
}