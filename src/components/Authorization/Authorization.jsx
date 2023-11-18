import Input from '../Input/Input.jsx'
import Button from '../Button/Button.jsx'
import { yandexAuth } from '../../../yandexActions.js'
import { register, login, getUser, refreshToken } from '../../../actions.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNSetUser, getStatuses } from '../../../actionsAdvanced.js'

function Authorization({ setUser, ...props }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)

    const buttonSubmit = async () => {
        if (email === '' || password === '') {
            setError('Все поля должны быть заполнены')
        }
        else {
            const loginResponse = await loginUser(password, email)
            if (loginResponse === 'success') {
                const getResponse = await getUser(localStorage.getItem('access'))
                setUser({
                    name: getResponse.data.full_name,
                    email: getResponse.data.email,
                    admin: getResponse.data.superuser,
                    status: getStatuses(getResponse.data.status),
                    photo: getResponse.data.photo
                })
                setEmail('')
                setPassword('')
            }
            else {
                setError(loginResponse.data.detail)
            }
        }
    }

    useEffect(() => {
        const onMountFun = async () => {
            const newUser = await getNSetUser()
            if (newUser.name) {
                setUser(newUser)
            }
        }
        onMountFun();
    }, [])

    useEffect(() => {
        setError('')
    }, [email, password])

    const loginUser = async (password, email = '', yandex = '') => {
        const response = await login(password, email, yandex)
        if (response.status === 200) {
            localStorage.setItem('access', response.data.access_token)
            localStorage.setItem('refresh', response.data.refresh_token)
            return 'success'
        }
        else return response
    }

    const YandexRegister = async (userData) => {
        const yandexResponse = await yandexAuth(userData.access_token);
        const name = (yandexResponse.data.first_name + ' ' + yandexResponse.data.last_name)
        const password = yandexResponse.data.psuid
        const email = yandexResponse.data.default_email
        const yandex = yandexResponse.data.id
        const fd = new FormData();
        fd.append('photo', '')
        const response = await register(name, password, email, yandex, fd)
        if (response.status === 200 || response.data.detail === 'Такой пользователь уже существует.') {
            const loginResponse = await loginUser(password, email, yandex)
            if (loginResponse === 'success') {
                console.log(loginResponse);
            }
        }
    }

    return (
        <div className='registration-wrapper'>
            <div className="registration-block">
                <div className="registration-form">
                    <h1 className="registration-title">
                        Вход
                    </h1>
                    <Input placeholder="Почта" inputValue={email} changeValueFun={(e) => setEmail(e.target.value)} />
                    <Input type={passwordVisible ? 'text' : 'password'} placeholder="Пароль" inputValue={password} changeValueFun={(e) => setPassword(e.target.value)} />
                    <div className="registration-alternate-description-link password-visible-button" onClick={() => setPasswordVisible(!passwordVisible)}>{passwordVisible ? 'Скрыть пароль' : 'Показать пароль'}</div>
                    <Button handleClick={buttonSubmit} className='registration-button'>Войти</Button>
                    <p className={["registration-alternate-description error-massage", error ? '' : 'error-massage-hidden'].join(' ')}>{error}</p>
                    <p className="registration-alternate-description">
                        Еще не зарегистрировались?  <Link to={'/registration'} className="registration-alternate-description-link">Регистрация</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Authorization