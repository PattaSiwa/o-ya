import useSWR from 'swr'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import classes from '../../styles/pages-styles/groupPage.module.css'
import Add from '../../components/ui/Add'
import { useState, useEffect } from 'react'
import ExpenseForm from '../../components/input/ExpenseForm'

export default function GroupPage(props) {
    const router = useRouter()
    const groupId = router.query.groupId
    const userId = props.session.user.uid
    console.log(groupId)

    //expense form
    const [expenseFormState, setExpenseFormState] = useState(false)
    function handleExpenseForm() {
        setExpenseFormState(!expenseFormState)
    }

    //fetching data for all expenses with groupId of this page's group

    const { data: expenseData, error } = useSWR('/api/expense/group/' + groupId)
    console.log(expenseData)
    useEffect(() => {
        if (expenseData) {
            console.log(expenseData.data)
        }
    }, [expenseData])

    //group data
    const { data: groupData, error: groupError } = useSWR('/api/group/' + groupId)
    const [group, setGroupData] = useState([])

    useEffect(() => {
        if (groupData) {
            setGroupData(groupData.data)
        }
    }, [groupData])

    console.log(group)

    return (
        <div className={classes.GroupPage}>
            <h3></h3>
            <Add content={'EXPENSE'} formHandle={handleExpenseForm} />
            {expenseFormState && <ExpenseForm
                groupId={groupId}
                userId={userId}
                handleForm={setExpenseFormState}
            />}
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req })
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }


    return {
        props: { session },
    }
}