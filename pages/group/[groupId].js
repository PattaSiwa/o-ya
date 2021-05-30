import useSWR from 'swr'
import { useRouter } from 'next/router'
import classes from '../../styles/pages-styles/groupPage.module.css'

export default function GroupPage(props) {
    const router = useRouter()
    console.log(router.query.groupId)


    return (
        <div className={classes.GroupPage}>
            <h3>View Page for Group</h3>
        </div>
    )
}

