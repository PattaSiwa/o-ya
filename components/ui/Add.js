import classes from './Add.module.css'
import { useState } from 'react'


export default function AddGroup(props) {
    function handleAdd() {
        props.formHandle()
    }
    return (
        <button className={classes.addGroup} onClick={handleAdd}><span>+</span> ADD {props.content}</button>
    )
}