import { useEffect, useState } from 'react'
import './App.css'
import Registration from './components/Registration/Registration.jsx'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Authorization from './components/Authorization/Authorization.jsx'
import AdminPage from './components/AdminPage/AdminPage.jsx'
import SuperUser from './components/SuperUser/SuperUser.jsx'

function App() {

    const [user, setUser] = useState({ name: '', email: '', admin: false, priority: '', category: '' })

    return (
        <BrowserRouter>
            {user.name ?
                <Routes>
                    {user.admin && <Route path='/admin' element={<SuperUser user={user} setUser={setUser}/>} />}
                    <Route path='/' element={<AdminPage user={user} setUser={setUser} />} />
                    <Route path='/*' element={<Navigate to='/' />} />
                </Routes> :
                <Routes>
                    <Route path='/registration' element={<Registration setUser={setUser} />} />
                    <Route path='/authorization' element={<Authorization setUser={setUser} />} />
                    <Route path='/*' element={<Navigate to='/authorization' />} />
                </Routes>}
        </BrowserRouter>
    )
}

export default App
