import classes from './EditGroupForm.module.css'
import { useRef } from 'react'
import { useRouter } from 'next/router'


async function createExpense(name, group, owner, description, date, amount) {
    const response = await fetch('/api/group', {
        method: 'POST',
        body: JSON.stringify({ name, group, owner, description, date, amount }),
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


export default function ExpenseForm(props) {

    const nameInputRef = useRef()
    const descriptionInputRef = useRef()
    const amountInputRef = useRef()
    const dateInputRef = useRef()
    const groupId = props.groupId
    const ownerId = props.userId


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
            <div className={classes.formCenter} onClick={() => props.handleForm()}>

                <form className={classes.form} onSubmit={submitHandler} onClick={(e) => e.stopPropagation()}>
                    <span onClick={() => props.handleForm()}>&times;</span>
                    <h2 className={classes.title}>Create Expense</h2>
                    <div className={classes.input}>
                        <label htmlFor='name'>Expense Name</label>
                        <input
                            type='text'
                            id='name'
                            required ref={nameInputRef}
                            placeholder="name"
                        />
                        <label for="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"

                            min="2020-01-01"
                            max="2050-12-31"
                            required ref={dateInputRef}
                        />

                        <label htmlFor='amount'>Amount $</label>
                        <input
                            type='number'
                            id='amount'
                            required ref={amountInputRef}
                            min='0.00'
                            max='10000'
                            step='0.01'
                        />
                        <label htmlFor='description'>Description</label>
                        <input
                            type='text'
                            id='description'
                            required ref={descriptionInputRef}
                            placeholder="description"
                        />
                    </div>

                    <div className={classes.actions}>
                        <button>Add Expense</button>
                    </div>

                </form>


            </div>

        </div>

    )


}