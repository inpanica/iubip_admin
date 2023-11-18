import './SuperUser.css'
import { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button.jsx'
import { Link } from 'react-router-dom'
import { getAllUsers, register, addStatusTable } from '../../../actions.js'
import User from '../User/User.jsx'
import { getStatuses } from '../../../actionsAdvanced.js'

function SuperUser({ user, setUser, ...props }) {

    const [users, setUsers] = useState([])
    const [uploaded, setUploaded] = useState(false)

    const userLinkRef = useRef(null)

    useEffect(() => {
        const onMountFun = async () => {
            getUsers()
        }
        onMountFun();
    }, [])

    const getUsers = async () => {
        const response = await getAllUsers();
        if (response.status === 200) {
            setUsers(response.data)
        }
    }

    useEffect(() => {
        if (uploaded === true){
            setUploaded(false)
            getUsers()
        }
    }, [uploaded])

    const addTestUsers = async () => {
        let testUsers = [
            { name: 'Joshua Mummert', statuses: getStatuses([], true) },
            { name: 'Allan Pearson', statuses: getStatuses([], true) },
            { name: 'Victoria Butler', statuses: getStatuses([], true) },
            { name: 'Charmaine Roach', statuses: getStatuses([22, 23, 24, 25, 26, 27], true) },
            { name: 'Harold Manalang', statuses: getStatuses([22, 23, 24, 25, 26, 27], true) },
            { name: 'Valeria Sanders', statuses: getStatuses([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], true) },
            { name: 'Lissa Johnson', statuses: getStatuses([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], true) },
            { name: 'Loretta Humphries', statuses: getStatuses([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], true) },
            { name: 'Leo Garrett', statuses: getStatuses([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], true) },
            { name: 'Geraldine Montoya', statuses: getStatuses([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], true) },
            { name: 'Noemi Dye', statuses: getStatuses([0, 1, 2, 3, 4]) },
            { name: 'Mary Parker', statuses: getStatuses([0, 1, 2, 3, 4]) },
            { name: 'James Kemp', statuses: getStatuses([0, 1, 2, 3, 4]) },
            { name: 'Gladys Sutton', statuses: getStatuses([0, 1, 2, 3, 4]) },
            { name: 'David Briggs', statuses: getStatuses([0, 1, 2, 3, 4]) },
            { name: 'Jessica Gajewski', statuses: getStatuses([0, 1, 2, 3, 4]) },
            { name: 'Charles Hulslander', statuses: getStatuses([0, 1, 2, 3, 4]) },
            { name: 'Amy Manning', statuses: getStatuses([0, 1, 2, 3, 4]) },
            { name: 'Pat Miles', statuses: getStatuses([0, 1, 2, 3, 4]) }
        ]
        testUsers = testUsers.map((u) => { return { ...u, email: u.name.replace(' ', '') + '@mail.ru' } })
        testUsers = testUsers.map((u) => { return { ...u, password: u.email.replace('.', '') } })
        testUsers.map( async(u) => {
            await register(u.name, u.password, u.email)
            await addStatusTable({ ...u.statuses, email: u.email })
            setUploaded(true)
        })
    }

    return (
        <div className='admin-page'>
            <div className="ctn">
                <div className="user-buttons">
                    <Button handleClick={() => userLinkRef.current.click()} className='cabinet-btn'>Личный кабинет</Button>
                    <Button handleClick={() => addTestUsers()} className='cabinet-btn'>Тест</Button>
                    <Button handleClick={() => console.log('')} className='cabinet-btn'>Статистика</Button>
                    <Link ref={userLinkRef} to='/' hidden></Link>
                </div>
                {users.map((u) => <User key={u.id} user={u} />)}
            </div>
        </div>
    )
}

export default SuperUser