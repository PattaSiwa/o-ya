// sharing CSS with editgroupform
import classes from './EditGroupForm.module.css'
import { useRef } from 'react'
import { useRouter } from 'next/router'


async function createGroup(name, owner, email) {
    const response = await fetch('/api/group', {
        method: 'POST',
        body: JSON.stringify({ name, owner, email }),
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

    const nameInputRef = useRef()
    const router = useRouter()
    async function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const owner = props.userId
        const email = props.email

        console.log(enteredName, owner)
        try {

            const result = await createGroup(enteredName, owner, email);
            const newGroup = result.data
            const copyGroups = [...props.groupsList]
            copyGroups.push(newGroup)
            console.log(copyGroups)
            props.setGroups(copyGroups)
            props.handleForm()
            // router.reload()
        } catch (error) {

            console.log(error);
        }


    }

    return (
        <div className={classes.formContainer}>
            <div className={classes.formCenter} onClick={() => props.handleForm()}>

                <form className={classes.form} onSubmit={submitHandler} onClick={(e) => e.stopPropagation()}>
                    <span onClick={() => props.handleForm()}>&times;</span>
                    <h2 className={classes.title}>Create Group</h2>
                    <div className={classes.input}>
                        <label htmlFor='name'>Group Name</label>
                        <input
                            type='text'
                            id='name'
                            required ref={nameInputRef}
                            placeholder="group name"
                        />
                    </div>

                    <div className={classes.actions}>
                        <button>Create</button>
                    </div>

                </form>


            </div>

        </div>

    )


}