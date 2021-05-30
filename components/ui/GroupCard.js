import { Fragment, useState } from 'react'
import classes from './GroupCard.module.css'
import Link from 'next/link'
import EditGroupForm from '../input/EditGroupForm';

export default function GroupCard(props) {
    const [editFormState, setEditFormState] = useState(false);

    function handleEditForm() {
        setEditFormState(!editFormState)
    }

    return (
        <Fragment>
            <div className={classes.card}>
                <h3>{props.name}</h3>
                <button>Add Member</button>
                <Link href={"/group/" + props.id}><button>View Group</button></Link>
                <button>Delete Group</button>
                <button onClick={handleEditForm}>Edit Name</button>
                {editFormState && <EditGroupForm handleForm={handleEditForm} name={props.name} id={props.id} />}
            </div>
        </Fragment>

    )
}