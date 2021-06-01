import classes from './Member.module.css'
import ConfirmDelete from '../input/ConfirmDelete'
import { useState } from 'react'

export default function Member(props) {

    const [deleteStatus, setDeleteStatus] = useState(false);

    function handleDelete() {
        setDeleteStatus(!deleteStatus)
    }

    return (
        <div className={classes.Member}>
            <p className={classes.email}>{props.email}</p>
            {props.user === props.owner && <p className={classes.close} onClick={handleDelete}>&times;</p>}
            {deleteStatus && <ConfirmDelete close={handleDelete} memberEmail={props.email} delete={props.deleteMember} message={'Are you sure you want to DELETE this member from the group? All expenses by this member will also be deleted'} />}
        </div>
    )
}