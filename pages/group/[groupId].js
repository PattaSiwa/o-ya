import useSWR from 'swr'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import classes from '../../styles/pages-styles/groupPage.module.css'
import Add from '../../components/ui/Add'
import { useState, useEffect } from 'react'
import ExpenseForm from '../../components/input/ExpenseForm'
import ExpenseCard from '../../components/ui/ExpenseCard'
import { motion } from 'framer-motion'

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

    async function deleteExpense(expenseId) {

        const response = await fetch('/api/expense/' + expenseId, { method: 'DELETE' })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
        const copyExpenses = [...expenses]
        const index = copyExpenses.findIndex((expense) => expense._id === expenseId)
        copyExpenses.splice(index, 1)

        setExpenses(copyExpenses)

        return data;
    }



    return (
        <div className={classes.GroupPage}>
            <motion.div className={classes.header} initial="hidden" animate="visible"
                variants={{
                    hidden: {
                        opacity: 0,
                    },
                    visible: {
                        opacity: 1,
                        transition: {
                            delay: 1,
                            duration: 1
                        }
                    }
                }}>
                <h3>{group.name}</h3>
                <Add content={'EXPENSE'} formHandle={handleExpenseForm} />
            </motion.div>

            {expenseFormState && <ExpenseForm
                groupId={groupId}
                userId={userId}
                userEmail={userEmail}
                handleForm={setExpenseFormState}
                setExpenses={setExpenses}
                expenses={expenses}
            />}
            <motion.div className={classes.expenseContainer} initial="hidden" animate="visible"
                variants={{
                    hidden: {
                        translateY: -200,
                        opacity: 0
                    },
                    visible: {
                        translateY: 0,
                        opacity: 1,
                        transition: {
                            delay: .3,
                            duration: 1
                        }
                    }
                }}>
                {expenses.map(expense => {
                    return <ExpenseCard
                        key={expense._id}
                        expense={expense}
                        userId={userId}
                        groupOwner={group.owner}
                        deleteExpense={deleteExpense}
                    />
                })}
            </motion.div>

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