import './AdminTaskWindow.css'
import AdminTask from '../AdminTask/AdminTask.jsx'
import { useEffect, useState } from 'react'
import { getUsersTasks } from '../../../actions.js'

function AdminTasksWindow({setCurrentUser, setCurrentUsersTasks, user, ...props }) {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getMyTasks()
    }, [])

    const getMyTasks = async () => {
        const response = await getUsersTasks(user.email)
        if (response.status === 200) {
            setTasks(response.data)
        }
    }

    useEffect(() => console.log(tasks), [tasks])

    const refresh = () => {
        setCurrentUser({})
        setCurrentUsersTasks([])
    }

    return (
        <div className='is-changing admin-fullscreen' onClick={refresh}>
            <div className="ctn admin-window" onClick={(e) => e.stopPropagation()}>
                <h2 className="h1-title admin-h2-title no-margin">{tasks[0] ? `Вопросы для ${user.full_name}` : `Нет заданных вопросов для ${user.full_name}`}</h2>
                {tasks.map((t) =>
                    <div className='admin-task'>
                    <div className="admin-task-feild admin-window-feild">
                        <p className="admin-task-desc">Описание проблемы</p>
                        <p className="admin-task-text">
                            {t.description}
                        </p>
                    </div>
                    <div className="admin-task-feild admin-window-feild">
                        <p className="admin-task-desc">Контакты</p>
                        <p className="admin-task-text">
                            {t.contact}
                        </p>
                    </div>
                    <div className="admin-task-feild admin-window-feild">
                        <p className="admin-task-desc">Категория</p>
                        <p className="admin-task-text">
                            {t.category}
                        </p>
                    </div>
                    <div className="admin-task-feild admin-window-feild">
                        <p className="admin-task-desc">Важность</p>
                        <p className="admin-task-text">
                            {t.importance.replace('_', ' ')}
                        </p>
                    </div>
                    
                </div>
                )}
            </div>
        </div>
    )
}

export default AdminTasksWindow