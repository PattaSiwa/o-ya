import classes from './EditGroupForm.module.css'
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'



async function editGroup(newName, id) {

    console.log(newName)
    const response = await fetch('/api/group/' + id, {
        method: 'PUT',
        body: JSON.stringify({ name: newName }),
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

export default function EditGroupForm(props) {

    const nameInputRef = useRef()
    const router = useRouter()


    const [enteredName, setEnteredName] = useState(props.name);
    const groupId = props.id
    console.log(groupId)

    async function submitHandler(event) {
        event.preventDefault();


        try {

            const result = await editGroup(enteredName, groupId);
            props.handleForm()
            router.reload()

        } catch (error) {

            console.log(error);
        }


    }

    function handleChangeName(event) {
        setEnteredName(event.target.value)
    }

    return (
        <div className={classes.formContainer}>
            <div className={classes.formCenter} onClick={() => props.handleForm()}>
                <form className={classes.form} onSubmit={submitHandler}>
                    <span onClick={() => props.handleForm()}>&times;</span>
                    <h2 className={classes.title}>Edit Group Name</h2>
                    <div className={classes.input}>
                        <label htmlFor='name'>Group Name</label>
                        <input
                            type='text'
                            id='name'
                            required ref={nameInputRef}
                            placeholder="group name"
                            value={enteredName}
                            onChange={(evt) => handleChangeName(evt)}
                        />
                    </div>

                    <div className={classes.actions}>
                        <button>Edit</button>
                    </div>

                </form>
            </div>
        </div>

    )



}