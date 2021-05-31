import classes from './EditGroupForm.module.css'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'


async function addMember(members, groupId) {
    const response = await fetch('/api/group/' + groupId, {
        method: 'PUT',
        body: JSON.stringify({ members: members }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }

    return data;
}


export default function GroupForm(props) {

    const emailInputRef = useRef()
    const router = useRouter()

    const [searchState, setSearchState] = useState('Emails are NOT case sensitive')

    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const groupId = props.groupId
        const groupMembers = [...props.members]

        console.log(groupMembers)

        try {

            const response = await fetch('api/user/' + enteredEmail)
            const searchedUserData = await response.json()

            if (searchedUserData.success === false) {
                setSearchState(searchedUserData.message)
                return
            }

            const searchedUser = {
                email: searchedUserData.data.email,
                id: searchedUserData.data.id
            }
            //check if user already a member

            const checkedIfMember = groupMembers.findIndex(member => member.id === searchedUser.id)

            console.log(checkedIfMember)
            //if user exist then we let user know then get out

            if (checkedIfMember >= 0) {
                setSearchState('User already a member')
                return
            }

            groupMembers.push(searchedUser)
            addMember(groupMembers, groupId)

            // props.handleForm()
            // router.reload()

            return


        }
        catch (error) {
            console.log(error)
        }




    }

    return (
        <div className={classes.formContainer}>
            <div className={classes.formCenter} onClick={() => props.handleForm()}>

                <form className={classes.form} onSubmit={submitHandler} onClick={(e) => e.stopPropagation()}>
                    <span onClick={() => props.handleForm()}>&times;</span>
                    <h2 className={classes.title}>Add Member</h2>
                    <div className={classes.input}>
                        <label htmlFor='name'>Email</label>
                        <input
                            type='email'
                            id='email'
                            required ref={emailInputRef}
                            placeholder="enter user email"
                        />
                    </div>
                    <p className={classes.searchStatus}>{searchState}</p>

                    <div className={classes.actions}>
                        <button>Add to Group</button>
                    </div>

                </form>


            </div>

        </div>

    )


}