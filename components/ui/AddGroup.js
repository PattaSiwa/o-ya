import classes from './AddGroup.module.css'
import { useState } from 'react'


export default function AddGroup(props) {
    function handleAddGroup() {
        props.groupFormHandle()
    }
    return (
        <button className={classes.addGroup} onClick={handleAddGroup}><span>+</span> ADD GROUP</button>
    )
}