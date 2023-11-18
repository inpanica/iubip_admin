import './AdminTasks.css'
import AdminTask from '../AdminTask/AdminTask.jsx'
import { useEffect, useState } from 'react'
import { getUsersTasks } from '../../../actions.js'

function AdminTasks({ user, ...props }) {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getMyTasks()
    }, [])

    const getMyTasks = async () => {
        const response = await getUsersTasks(user.email)
        if(response.status === 200){
            setTasks(response.data)
        }
    }

    return (
        <div className='admin-tasks'>
            <h2 className="h1-title admin-h2-title">{tasks[0] ? 'Вопросы, адресованные вам' : 'Нет заданных вам вопросов'}</h2>
            {tasks.map((t) =>
                <AdminTask key={t.id} getMyTasks={getMyTasks} text={t.description} contact={t.contact} category={t.category} importance={t.importance} id={t.id}/>
            )}
        </div>
    )
}

export default AdminTasks