import './AdminTask.css'

function AdminTask({ text, contact, category, priority, ...props }) {

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
        </div>
    )
}

export default AdminTask