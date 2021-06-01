import classes from './EditGroupForm.module.css'
import { useRef } from 'react'



async function createExpense(name, date, amount, description, group, owner, email) {
    const response = await fetch('/api/expense', {
        method: 'POST',
        body: JSON.stringify({ name, date, amount, description, group, owner, email }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}


export default function ExpenseForm(props) {

    const nameInputRef = useRef()
    const dateInputRef = useRef()
    const amountInputRef = useRef()
    const descriptionInputRef = useRef()
    const groupId = props.groupId
    const ownerId = props.userId
    const userEmail = props.userEmail

    console.log(userEmail)




    async function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredDate = dateInputRef.current.value;
        const enteredAmount = amountInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        try {

            const result = await createExpense(
                enteredName,
                enteredDate,
                enteredAmount,
                enteredDescription,
                groupId,
                ownerId,
                userEmail,
            );

            const copyExpenses = [...props.expenses]
            const newExpense = result.data
            copyExpenses.push(newExpense)

            props.setExpenses(copyExpenses)
            props.handleForm()

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
                            required
                            ref={nameInputRef}
                            placeholder="name"
                        />
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            min="2020-01-01"
                            max="2050-12-31"
                            required
                            ref={dateInputRef}
                        />

                        <label htmlFor='amount'>Amount $</label>
                        <input
                            type='number'
                            id='amount'
                            required
                            ref={amountInputRef}
                            min='0.00'
                            max='10000'
                            step='0.01'
                        />
                        <label htmlFor='description'>Description</label>
                        <input
                            type='text'
                            id='description'
                            required
                            ref={descriptionInputRef}
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