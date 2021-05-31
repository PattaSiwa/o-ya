import classes from './EditGroupForm.module.css'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'


// async function addMember(email, id) {
//     const response = await fetch('/api/group', {
//         method: 'PUT',
//         body: JSON.stringify({ email: email, id: id }),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         throw new Error(data.message || 'Something went wrong!');
//     }

//     return data;
// }


export default function GroupForm(props) {

    const emailInputRef = useRef()
    const router = useRouter()

    const [searchState, setSearchState] = useState('Emails are NOT case sensitive')

    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const groupId = props.groupId

        console.log(enteredEmail)

        try {

            const response = await fetch('api/user/' + enteredEmail)
            const searchedUser = await response.json()

            if (searchedUser.success === false) {
                setSearchState(searchedUser.message)
            }

        }
        catch (error) {
            console.log(error)
        }



        // try {
        //     const result = await createGroup(enteredName, owner);
        //     props.handleForm()
        //     router.reload()
        // } catch (error) {

        //     console.log(error);
        // }


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