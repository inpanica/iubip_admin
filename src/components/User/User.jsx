import './User.css'
import { useEffect, useRef, useState } from 'react'
import config from '../../../config.js'
import { getStatuses } from '../../../actionsAdvanced.js'
import { changeStatusTable, getUsersTasks } from '../../../actions.js'

function User({ user, setCurrentUsersTasks, setCurrentUser, ...props }) {

    const [status, setStatus] = useState({})

    useEffect(() => {
        let list = []
        for (let i in user.status) {
            if (user.status[i]) {
                list.push(Number(i))
            }
        }
        setStatus(getStatuses(list))
    }, [user])

    const changeStatus = async (event, s) => {
        event.stopPropagation()
        let newStatus = status
        newStatus = Object.keys(newStatus).map((key) => {
            if(key === s){
                return !newStatus[key]
            }
            else{
                return newStatus[key]
            }
        });
        let list = []
        for (let i in newStatus) {
            if (newStatus[i]) {
                list.push(Number(i))
            }
        }
        newStatus = getStatuses(list)
        const response = await changeStatusTable({...newStatus, email: user.email})
        if (response.status === 200)
        setStatus(newStatus)
    }

    const getMyTasks = async () => {
        const response = await getUsersTasks(user.email)
        if(response.status === 200){
            setCurrentUsersTasks(response.data)
            setCurrentUser(user)
        }
    }

    return (
        <div onClick={getMyTasks} className='superuser-page-user'>
            <div className="user-main">
                <img className='user-photo' src={config.url + '/' + user.photo} alt="" />
                <div className="user-main-text">
                    <p className="superuser-page-user-name">
                        {user.full_name}
                    </p>
                    <p className="superuser-page-user-email">
                        {user.email}
                    </p>
                </div>
            </div>
            <div className="superuser-page-user-statuses">
                {Object.keys(status).map((s) => {
                    return <div onClick={(event) => changeStatus(event, s)} className={['superuser-user-status', status[s] ? 'superuser-user-status-active' : ''].join(' ')} key={s}>{s.replace('is_competent_in_', '')}</div>
                })}
            </div>
        </div>
    )
}

export default User