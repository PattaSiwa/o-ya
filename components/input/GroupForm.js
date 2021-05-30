import classes from './GroupForm.module.css'
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'


async function createGroup(name, owner) {
    const response = await fetch('/api/group', {
        method: 'POST',
        body: JSON.stringify({ name, owner }),
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

        console.log(enteredName, owner)
        try {

            const result = await createGroup(enteredName, owner);
            props.handleForm()
            router.reload()
        } catch (error) {

            console.log(error);
        }


    }

    return (
        <div className={classes.formContainer}>
            <div className={classes.formBackDrop}>
                <form className={classes.form} onSubmit={submitHandler}>
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