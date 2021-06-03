import { Fragment, useState, useEffect } from 'react'
import classes from './GroupCard.module.css'
import Link from 'next/link'
import { motion } from 'framer-motion'
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

    // get members
    const [members, setMembers] = useState([])
    const updatedMembers = props.members

    useEffect(() => {
        if (updatedMembers) {
            setMembers(updatedMembers)
        }
    }, [updatedMembers])


    // const { data: ownerData, error } = useSWR('/api/user/' + props.owner)
    // const [owner, setOwner] = useState([])

    // useEffect(() => {
    //     if (ownerData) {
    //         setOwner(ownerData.data)
    //     }
    // }, [ownerData])

    //get group data
    const [group, setGroup] = useState({})
    const groupDataProps = props.group
    useEffect(() => {
        if (groupDataProps) {
            setGroup(groupDataProps)
        }
    }, [groupDataProps])


    async function deleteGroup() {

        const responseGroupDelete = await fetch('/api/group/' + groupId, { method: 'DELETE' })
        const data = await responseGroupDelete.json();
        if (!responseGroupDelete.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        //also remove all expenses in that group

        const responseExpensesRemove = await fetch('/api/expense/groupall/' + groupId, { method: 'DELETE' })
        const deletedExpenses = await responseExpensesRemove.json

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

            const copyMemberEmail = memberEmail

            console.log(copyMemberEmail)

            const url = 'api/expense/membergroupall/' + copyMemberEmail + '&' + groupId

            console.log(url)

            const deleteMemberExpenses = await fetch(url, { method: 'DELETE' })

            const data = await response.json()
            const updatedGroup = data.data

            const copyGroupList = [...props.groupsList]
            const index = copyGroupList.findIndex(group => group._id === groupId)
            copyGroupList.splice(index, 1, updatedGroup)
            props.setGroups(copyGroupList)


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <motion.div className={classes.card} initial="hidden" animate="visible"
                variants={{
                    hidden: {
                        transition: {
                            duration: 1
                        },
                        opacity: 0,
                        scale: 0
                    },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            delay: 1,
                            duration: 1.5
                        }
                    }
                }}>
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
                    groupsList={props.groupsList}
                    setGroups={props.setGroups}
                />}
                <div className={classes.memberContainer}>
                    <p className={classes.owner}>{group.email}</p>
                    {members.map(member => <Member
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

                {editFormState && <EditGroupForm handleForm={handleEditForm} name={props.name} id={props.id} groupsList={props.groupsList} setGroups={props.setGroups} />}
            </motion.div>
        </Fragment>

    )
}