import { useEffect, useRef, useState } from 'react'
import './AllTasks.css'
import { getALlTasks } from '../../../actions.js'
import config from '../../../config.js'
import Input from '../Input/Input.jsx'
import Button from '../Button/Button.jsx'
import { Link } from 'react-router-dom'

function AllTasks() {

    const [tasks, setTasks] = useState([])
    const [searchQuerry, setSearchQuerry] = useState('')

    const adminLinkRef = useRef(null)
    const userLinkRef = useRef(null)

    const refreshTasks = async () => {
        const response = await getALlTasks()
        console.log(response);
        setTasks(response.data)
    }

    useEffect(() => {
        refreshTasks()
    }, [])

    const filtredTasks = tasks.filter(t => {
        return t.full_name.toLowerCase().includes(searchQuerry.toLowerCase()) ||
            t.email.toLowerCase().includes(searchQuerry.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuerry.toLowerCase()) ||
            t.category.toLowerCase().includes(searchQuerry.toLowerCase()) ||
            t.importance.toLowerCase().includes(searchQuerry.toLowerCase()) ||
            t.contact.toLowerCase().includes(searchQuerry.toLowerCase())
    })

    return (
        <div className='admin-page'>
            <div className="ctn">
                <div className="user-buttons">
                    <Button handleClick={() => userLinkRef.current.click()} className='cabinet-btn'>Личный кабинет</Button>
                    <Button handleClick={() => adminLinkRef.current.click()} className='cabinet-btn'>Данные поддержки</Button>
                    <Link ref={userLinkRef} to='/' hidden></Link>
                    <Link ref={adminLinkRef} to='/admin' hidden></Link>
                </div>
                <div className="search all-tasks-search">
                    <Input inputValue={searchQuerry} changeValueFun={(e) => setSearchQuerry(e.target.value)} placeholder='Поиск...' className='search-input' />
                </div>
                <div className="all-tasks">
                    {filtredTasks.map((t) => {
                        return <div key={t.id} className="alltasks-task">
                            <div className="alltasks-task-feild alltasks-task-feild-desc">
                                <h2 className="alltasks-task-title">Описание:</h2>
                                <p className="alltasks-task-info">
                                    {t.description}
                                </p>
                            </div>
                            <div className="alltask-task-body">
                                <div className="alltasks-task-feild">
                                    <h2 className="alltasks-task-title">Категория:</h2>
                                    <p className="alltasks-task-info">
                                        {t.category}
                                    </p>
                                </div>
                                <div className="alltasks-task-feild">
                                    <h2 className="alltasks-task-title">Важность:</h2>
                                    <p className="alltasks-task-info">
                                        {t.importance}
                                    </p>
                                </div>
                                <div className="alltasks-task-feild">
                                    <h2 className="alltasks-task-title">Контакты:</h2>
                                    <p className="alltasks-task-info">
                                        {t.contact}
                                    </p>
                                </div>
                            </div>
                            <div className="user-main all-tasks-user">
                                <img className='user-photo' src={config.url + '/' + t.photo} alt="" />
                                <div className="user-main-text">
                                    <p className="user-name">
                                        {t.full_name}
                                    </p>
                                    <p className="user-email">
                                        {t.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default AllTasks