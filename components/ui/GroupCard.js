import { Fragment, useState, useEffect } from 'react'
import classes from './GroupCard.module.css'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import EditGroupForm from '../input/EditGroupForm';
import UserSearch from '../input/UserSearch'
import Member from '../ui/Member'
import ConfirmDelete from '../input/ConfirmDelete'


export default function GroupCard(props) {
    const [editFormState, setEditFormState] = useState(false);
    const [searchFormDisplay, setSearchFormDisplay] = useState(false)
    const [deleteGroupDisplay, setDeleteGroupDisplay] = useState(false)

    const router = useRouter()

    function handleEditForm() {
        setEditFormState(!editFormState)

    }

    function handleSearchForm() {
        setSearchFormDisplay(!searchFormDisplay)
    }

    function handleDeleteModal() {
        setDeleteGroupDisplay(!deleteGroupDisplay)
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

        const copyGroupList = [...props.groupsList]
        const index = copyGroupList.findIndex(group => group._id === groupId)

        copyGroupList.splice(index, 1)

        props.setGroups(copyGroupList)


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
                {props.owner === props.user && <button
                    className={classes.addMember}
                    onClick={handleSearchForm}
                >Add Member</button>}
                {searchFormDisplay && <UserSearch
                    handleForm={setSearchFormDisplay}
                    ownerEmail={props.email}
                    groupId={props.id}
                    members={props.members}
                />}
                <div className={classes.memberContainer}>
                    <p className={classes.owner}>{owner.email}</p>
                    {props.members.map(member => <Member
                        email={member.email}
                        id={member.id}
                        key={member.id}
                        owner={props.owner}
                        user={props.user}
                        deleteMember={deleteMember} />)}
                </div>
                <div className={classes.btnContainer}>
                    <Link href={"/group/" + props.id}><button className={classes.viewBtn}>View Group</button></Link>
                    {props.owner === props.user && <button className={classes.deleteBtn} onClick={handleDeleteModal}>Delete Group</button>}
                    {props.owner === props.user && <button className={classes.editBtn} onClick={handleEditForm}>Edit Name</button>}
                </div>
                {deleteGroupDisplay &&
                    <ConfirmDelete
                        message={"Are you sure you would like to DELETE this group?, All expenses related to this group will also be deleted"}
                        close={handleDeleteModal}
                        delete={deleteGroup}
                    />}

                {editFormState && <EditGroupForm handleForm={handleEditForm} name={props.name} id={props.id} />}
            </div>
        </Fragment>

    )
}