import './AdminTasks.css'
import AdminTask from '../AdminTask/AdminTask.jsx'
import { useState } from 'react'

function AdminTasks({ ...props }) {

    const [tasks, setTasks] = useState([{ text: 'Я пытался войти в мобильный банк, но при входе увидел, что моя карта не работает. Что мне делать, мне срочно нужно совершить по ней перевод!', contact: 'tg: kakaka', priority: 'Важна)', category: 'Попы' }])

    return (
        <div className='admin-tasks'>
            {tasks.map((t) =>
                <AdminTask key={t.text} text={t.text} contact={t.contact} category={t.category} priority={t.priority} />
            )}
        </div>
    )
}

export default AdminTasks