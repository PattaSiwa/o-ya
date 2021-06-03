## O-Ya


    Dealing with money is never a fun thing especially with the people you live with. O-Ya is a budgeting application that helps people track their shared expenses. It allows each user log their expenses. Who paid for the electric? Who paid for internet? Who bought the White Claws? Then calculate everyone’s total and payouts to keep things fair and simple. 


### User Story

    • User can create an account 
    • User can create a group
    • User can edit name/delete group that they created
    • User can add/remove other users(member) to the group they created 
    • User can add expense in group they are a member of
    • User can edit/delete expense they created
    • User can view total expense of everyone in their group
    • User can view total payout of everyone in their group
    

## DATA MODEL

### GROUP – Owner one(user) to many (group) , Members Many(groups) to Many(Users) // Expense One(Group) to many(expenses) 
        ◦ Name - String
        ◦ Owner – User ID
        ◦ Members – Array [User IDs] Owner User ID will be first member
        ◦ Expenses – Arrays [Expense IDs]
        ◦ Group ID - Auto generated

### USER – Owner to Group/Expense One to many. Member to Group is many to many 
        ◦ Username – String
        ◦ Email – String 
        ◦ Password - String
        ◦ User ID - Auto generated

### EXPENSE – Owner One(user) to many(expenses)
        ◦ Amount – Number with 2 decimal points 99.99 
        ◦ Date – Date String
        ◦ Description - String
        ◦ Owner – User ID
        ◦ Group – Group ID
        ◦ Expense ID - Auto generated
