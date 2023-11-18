import { useEffect, useRef, useState } from 'react'
import './Statistic.css'
import Button from '../Button/Button.jsx'
import { Link } from 'react-router-dom'
import { getALlTasks, getAllUsers } from '../../../actions.js'
import Chart from '../Chart/Chart.jsx'
import Diagram from '../Diagram/Diagram.jsx'

function Statistic() {

    const [tasks, setTasks] = useState([])
    const [users, setUsers] = useState([])
    const [mostPopularCategory, setMostPopularCategory] = useState('')
    const [categoryTop, setCategoryTop] = useState({})
    const [importanceTop, setImportanceTop] = useState([])

    const userLinkRef = useRef(null)
    const adminLinkRef = useRef(null)

    const refreshTasks = async () => {
        const response = await getALlTasks()
        setTasks(response.data)
    }

    const getUsers = async () => {
        const response = await getAllUsers();
        if (response.status === 200) {
            setUsers(response.data)
        }
    }

    const foundCategoryTop = () => {
        let list = {
            "payment_issue": 0,
            "create_account": 0,
            "contact_customer_service": 0,
            "get_invoice": 0,
            "track_order": 0,
            "get_refund": 0,
            "contact_human_agent": 0,
            "recover_password": 0,
            "change_order": 0,
            "delete_account": 0,
            "complaint": 0,
            "check_invoices": 0,
            "review": 0,
            "check_refund_policy": 0,
            "delivery_options": 0,
            "check_cancellation_fee": 0,
            "track_refund": 0,
            "check_payment_methods": 0,
            "switch_account": 0,
            "newsletter_subscription": 0,
            "delivery_period": 0,
            "edit_account": 0,
            "registration_problems": 0,
            "change_shipping_address": 0,
            "set_up_shipping_address": 0,
            "place_order": 0,
            "cancel_order": 0,
            "check_invoice": 0
        }
        tasks.map((t) => list[t.category] += 1)
        let newList = []
        Object.keys(list).forEach((name) => {
            newList.push({name: name, value: list[name]})
        })
        setCategoryTop(newList)
        return list
    }

    const foundImportanceTop = () => {
        let list = {
            'high_priority': 0,
            'medium_priority': 0,
            'standard_priority': 0
        }
        tasks.map((t) => list[t.importance] += 1)
        let newList = []
        Object.keys(list).forEach((name) => {
            newList.push({name: name.replace('_priority', ''), value: list[name]})
        })
        setImportanceTop(newList)
        return list
    }

    const foundMostPopularCategory = () => {
        const top = foundCategoryTop()
        let maxValue = 'payment_issue'
        Object.keys(top).forEach((key) => {
            if (top[maxValue] < top[key]) {
                maxValue = key
            }
        })
        setMostPopularCategory(maxValue)
    }

    useEffect(() => {
        refreshTasks()
        getUsers();
    }, [])

    useEffect(() => {
        foundImportanceTop()
        foundMostPopularCategory()
        foundCategoryTop()
    }, [tasks])

    return (
        <div className='admin-page'>
            <div className="ctn">
                <div className="user-buttons">
                    <Button handleClick={() => userLinkRef.current.click()} className='cabinet-btn'>Личный кабинет</Button>
                    <Button handleClick={() => adminLinkRef.current.click()} className='cabinet-btn'>Данные поддержки</Button>
                    <Link ref={userLinkRef} to='/' hidden></Link>
                    <Link ref={adminLinkRef} to='/admin' hidden></Link>
                </div>
                <div className="stats-block">
                    <h2 className="stats-title">Общие данные</h2>
                    <div className="main-stats-wrapper">
                        <div className="main-stats-feild">
                            <h3 className="main-stats-feild-title">Всего вопросов:</h3>
                            <p className="main-stats-feild-info">{tasks.length}</p>
                        </div>
                        <div className="main-stats-feild">
                            <h3 className="main-stats-feild-title">Всего специалистов:</h3>
                            <p className="main-stats-feild-info">{users.length}</p>
                        </div>
                        <div className="main-stats-feild">
                            <h3 className="main-stats-feild-title">Самая частая категория:</h3>
                            <p className="main-stats-feild-info">{mostPopularCategory}</p>
                        </div>
                    </div>
                </div>
                <div className="stats-block">
                <h3 className="main-stats-feild-title">Статистика категорий:</h3>
                    <Chart data={categoryTop}/>
                </div>
                <div className="stats-block">
                <h3 className="main-stats-feild-title">Статистика важности вопросов:</h3>
                    <Diagram data={importanceTop}/>
                </div>
            </div>
        </div>
    )
}

export default Statistic