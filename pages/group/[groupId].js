import useSWR from 'swr'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import classes from '../../styles/pages-styles/groupPage.module.css'
import Add from '../../components/ui/Add'
import { useState, useEffect } from 'react'
import ExpenseForm from '../../components/input/ExpenseForm'
import ExpenseCard from '../../components/ui/ExpenseCard'

export default function GroupPage(props) {
    const router = useRouter()
    const groupId = router.query.groupId
    const userId = props.session.user.uid
    const userEmail = props.session.user.email



    //expense form
    const [expenseFormState, setExpenseFormState] = useState(false)
    function handleExpenseForm() {
        setExpenseFormState(!expenseFormState)
    }

    //fetching data for all expenses with groupId of this page's group

    const { data: expenseData, error } = useSWR('/api/expense/group/' + groupId)
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        if (expenseData) {
            setExpenses(expenseData.data)
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


    return (
        <div className={classes.GroupPage}>
            <h3>{group.name}</h3>
            <Add className={classes.addBtn} content={'EXPENSE'} formHandle={handleExpenseForm} />
            {expenseFormState && <ExpenseForm
                groupId={groupId}
                userId={userId}
                userEmail={userEmail}
                handleForm={setExpenseFormState}
                setExpenses={setExpenses}
                expenses={expenses}
            />}
            {expenses.map(expense => {
                return <ExpenseCard
                    key={expense._id}
                    expense={expense}
                />
            })}
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