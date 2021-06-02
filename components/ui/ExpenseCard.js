import classes from './ExpenseCard.module.css'
import ConfirmDelete from '../input/ConfirmDelete'
import { useState } from 'react'

export default function ExpenseCard(props) {
    const [confirmDeleteState, setConfirmDeleteState] = useState(false)
    const [expenseData, setExpenseData] = useState(props.expense)

    function handleConfirmDelete() {
        setConfirmDeleteState(!confirmDeleteState)
    }
    return (
        <div className={classes.expenseCard}>
            <div className={classes.info}>
                <div className={classes.amountSide}>
                    <p><strong>Amount:</strong> <span>${expenseData.amount}</span></p>
                </div>
                <div className={classes.datails}>
                    <p><strong>Date:</strong> <span>{expenseData.date}</span></p>
                    <p><strong>Description:</strong> {expenseData.description}</p>
                    <p className={classes.email}><strong>{expenseData.email}</strong></p>
                </div>

            </div>
            <button className={classes.deleteBtn} onClick={setConfirmDeleteState}>DELETE</button>

            {confirmDeleteState &&
                <ConfirmDelete
                    message={"Are you sure you want to delete this expense?"}
                    close={handleConfirmDelete}
                    delete={props.deleteExpense}
                    expenseId={expenseData._id}
                />}
        </div>
    )
}