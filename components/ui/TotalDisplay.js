import classes from './TotalDisplay.module.css'
import { motion } from 'framer-motion'

export default function TotalDisplay(props) {

    const expenses = props.expenses

    //took from stackoverflow -- some crazy regex
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //Parse all the nums into int
    const expenseParsed = expenses.map(expense => {
        const amountInt = parseFloat(expense.amount)
        return {
            amount: amountInt,
            email: expense.email
        }
    })


    //GROUP TOTAL
    let groupTotal = 0
    for (const expense of expenseParsed) {
        groupTotal += expense.amount
    }
    const groupTotalComma = numberWithCommas(groupTotal)


    //get individuals
    const individuals = []

    for (let expense of expenseParsed) {
        if (!individuals.includes(expense.email)) {
            individuals.push(expense.email)
        }
    }
    const numOfMember = individuals.length

    //Averge per person
    const avgPerPerson = (groupTotal / numOfMember).toFixed(2)
    const avgComma = numberWithCommas(avgPerPerson)

    //Separate expenses by email into their own arrays
    const individualExpenses = []

    for (let email of individuals) {
        const filtered = expenseParsed.filter(expense => expense.email === email)
        individualExpenses.push(filtered)
    }


    // Add total of each separated arrays
    const totalIndividual = []

    for (let expenses of individualExpenses) {
        let total = 0
        for (let expense of expenses) {
            total += expense.amount
        }

        totalIndividual.push(total)
    }

    //create array of object that has email and total for display

    const totalIndividualWithEmail = []

    for (let i = 0; i < individuals.length; i++) {
        const personObject = {
            email: individuals[i],
            total: numberWithCommas(totalIndividual[i])
        }
        totalIndividualWithEmail.push(personObject)
    }

    console.log(totalIndividualWithEmail)





    return (
        <motion.div className={classes.totalDisplay} initial="hidden" animate="visible"
            variants={{
                hidden: {
                    translateY: -300,
                    opacity: 0,
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
            <h3>TOTAL</h3>
            <div className={classes.groupTotal}>
                <p><strong>Group</strong><span>$ {groupTotalComma}</span></p>
                <p><strong>Avg Per Person</strong><span>$ {avgComma}</span></p>
            </div>

            <div className={classes.individualTotal}>
                {totalIndividualWithEmail.map(person => {
                    return <p><strong>{person.email}</strong><span>$ {person.total}</span></p>
                })}
            </div>
        </motion.div>
    )
}