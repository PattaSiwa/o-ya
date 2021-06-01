import classes from './ExpenseCard.module.css'
import ConfirmDelete from '../input/ConfirmDelete'
import { useState } from 'react'

export default function ExpenseCard(props) {
    const [confirmDeleteState, setConfirmDeleteState] = useState(false)
    const [expenseData, setExpenseData] = useState(props.expense)

    console.log(expenseData)

    function handleConfirmDelete() {
        setConfirmDeleteState(!confirmDeleteState)
    }
    return (
        <div className={classes.expenseCard}>
            <div className={classes.info}>
                <div className={classes.datails}>
                    <p>By {expenseData.email}</p>
                    <p>Description: {expenseData.description}</p>
                </div>
                <div className={classes.amountSide}>
                    <p>Amount: ${expenseData.amount}</p>
                </div>
            </div>
            <button onClick={setConfirmDeleteState}>DELETE</button>

            {confirmDeleteState &&
                <ConfirmDelete
                    message={"Are you sure you want to delete this expense?"}
                    close={handleConfirmDelete} />}
        </div>
    )
}