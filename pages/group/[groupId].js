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

    console.log(groupId, userId)

    const [expenseFormState, setExpenseFormState] = useState(false)

    function handleExpenseForm() {
        setExpenseFormState(!expenseFormState)
        console.log(expenseFormState)
    }


    return (
        <main className={classes.GroupPage}>
            <Add content={'EXPENSE'} formHandle={handleExpenseForm} />
            {expenseFormState && <ExpenseForm
                groupId={groupId}
                userId={userId}
                handleForm={setExpenseFormState}
            />}
        </main>
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