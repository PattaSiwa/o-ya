import classes from './EditGroupForm.module.css'
import { useRef } from 'react'
import { motion } from 'framer-motion'



async function createExpense(date, amount, description, group, owner, email) {
    const response = await fetch('/api/expense', {
        method: 'POST',
        body: JSON.stringify({ date, amount, description, group, owner, email }),
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

    const dateInputRef = useRef()
    const amountInputRef = useRef()
    const descriptionInputRef = useRef()
    const groupId = props.groupId
    const ownerId = props.userId
    const userEmail = props.userEmail


    async function submitHandler(event) {
        event.preventDefault();

        const enteredDate = dateInputRef.current.value;
        const enteredAmount = amountInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        try {

            const result = await createExpense(
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

                <motion.form className={classes.form} onSubmit={submitHandler} onClick={(e) => e.stopPropagation()} initial="hidden" animate="visible"
                    variants={{
                        hidden: {
                            scale: 0,
                            opacity: 0,
                        },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            transition: {
                                duration: .8
                            }
                        }
                    }}>
                    <span onClick={() => props.handleForm()}>&times;</span>
                    <h2 className={classes.title}>Create Expense</h2>
                    <div className={classes.input}>
                        <label htmlFor='amount'>Amount $</label>
                        <input
                            type='number'
                            id='amount'
                            required
                            ref={amountInputRef}
                            min='0.00'
                            max='100000'
                            step='0.01'
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

                </motion.form>


            </div>

        </div>

    )


}