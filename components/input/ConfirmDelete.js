import classes from './ConfirmDelete.module.css'
import { motion } from 'framer-motion'


//take text as prop for different deletions
export default function ConfirmDelete(props) {

    function handleDelete() {
        if (props.memberEmail) {
            props.delete(props.memberEmail)
            props.close()
            return
        }

        if (props.expenseId) {
            props.delete(props.expenseId)
            props.close()
            return
        }

        props.delete()
        props.close()
    }

    return (
        <div className={classes.container} >
            <div className={classes.backdrop} onClick={() => props.close()}>
                <motion.div className={classes.content} onClick={(e) => e.stopPropagation()} initial="hidden" animate="visible"
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
                    <p>{props.message}</p>
                    <div className={classes.buttons}>
                        <button className={classes.deleteBtn} onClick={handleDelete}>DELETE</button>
                        <button className={classes.cancelBtn} onClick={() => props.close()}> Cancel</button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}