import { Fragment, useState } from 'react'
import classes from './GroupCard.module.css'
import Link from 'next/link'

export default function GroupCard(props) {
    return (
        <Fragment>
            <div className={classes.card}>
                <h3>{props.name}</h3>
                <button>Add Member</button>
                <Link href={"/group/" + props.id}><a>Hello</a></Link>
            </div>
        </Fragment>

    )
}