import './AdminPage.css'
import Button from '../Button/Button.jsx'
import Input from '../Input/Input.jsx'
import { useEffect, useRef, useState } from 'react'
import ChangeForm from '../ChangeForm/ChangeForm.jsx'
import AdminTasks from '../AdminTasks/AdminTasks.jsx'
import { Link } from 'react-router-dom'
import config from '../../../config.js'
import { getStatuses } from '../../../actionsAdvanced.js'

function AdminPage({ user, setUser, ...props }) {

    const [isChanging, setIsChanging] = useState(false)

    const adminLinkRef = useRef(null)

    const logout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setUser({ name: '', email: '', admin: false, status: '', photo: '' })
    }

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <div className='admin-page'>
            <div className="ctn">
                {
                    isChanging ? <ChangeForm setUser={setUser} user={user} setIsChanging={setIsChanging} /> : ''
                }
                <div className="user-cabinet">
                    <div className="user-info">
                        <h1 className="h1-title">Личный кабинет</h1>
                        <div className="user-main">
                            <img className='user-photo' src={config.url + '/' + user.photo} alt="" />
                            <div className="user-main-text">
                                <p className="user-name">
                                    {user.name}
                                </p>
                                <p className="user-email">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                    {(!user.admin && user.status) &&
                        <div className="user-category">
                            {Object.keys(user.status).map((s) => {
                                if (user.status[s]) {
                                    return <div className='user-cat' key={s} >{s.replace('is_competent_in_', '')}</div>
                                }
                                else {
                                    return <div className='user-cat' key={s} >{s.replace('is_competent_in_', '')}</div>
                                }
                            })}
                        </div>
                    }
                </div>
                <div className="user-buttons">
                    <Button handleClick={logout} className='cabinet-btn'>Выйти</Button>
                    <Button handleClick={() => setIsChanging(true)} className='cabinet-btn'>Изменить данные</Button>
                    {user.admin &&
                        <Button handleClick={() => adminLinkRef.current.click()} className='cabinet-btn'>Данные поддержки</Button>
                    }
                    <Link ref={adminLinkRef} to='/admin' hidden></Link>
                </div>
                <h2 className="h1-title admin-h2-title">Вопросы, адресованные вам</h2>
                <AdminTasks />
            </div>
        </div>
    )
}

export default AdminPage