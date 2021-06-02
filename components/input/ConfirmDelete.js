import classes from './ConfirmDelete.module.css'


//take text as prop for different deletions
export default function ConfirmDelete(props) {

    function handleDelete() {
        if (props.memberEmail) {
            props.delete(props.memberEmail)
        }

        if (props.expenseId) {
            props.delete(props.expenseId)
        }
        props.close()
    }

    return (
        <div className={classes.container}>
            <div className={classes.backdrop} onClick={() => props.close()}>
                <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                    <p>{props.message}</p>
                    <div className={classes.buttons}>
                        <button className={classes.deleteBtn} onClick={handleDelete}>DELETE</button>
                        <button className={classes.cancelBtn} onClick={() => props.close()}> Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}