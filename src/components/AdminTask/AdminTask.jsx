import { useState } from 'react'
import './AdminTask.css'
import Button from '../Button/Button'
import { deleteUsersTasks } from '../../../actions.js'

function AdminTask({ text, contact, category, importance, id, getMyTasks, ...props }) {

    const deleteFun = async () => {
        const response = await deleteUsersTasks(id)
        getMyTasks();
    }

    return (
        <div className='admin-task'>
            <div className="admin-task-feild">
                <p className="admin-task-desc">Описание проблемы</p>
                <p className="admin-task-text">
                    {text}
                </p>
            </div>
            <div className="admin-task-feild">
                <p className="admin-task-desc">Контакты</p>
                <p className="admin-task-text">
                    {contact}
                </p>
            </div>
            <div className="admin-task-feild">
                <p className="admin-task-desc">Категория</p>
                <p className="admin-task-text">
                    {category}
                </p>
            </div>
            <div className="admin-task-feild">
                <p className="admin-task-desc">Важность</p>
                <p className="admin-task-text">
                    {importance.replace('_', ' ')}
                </p>
            </div>
            <div className='delete-button-wrapper'>
                <Button handleClick={deleteFun} className='delete-button'>Удалить</Button>
            </div>
        </div>
    )
}

export default AdminTask