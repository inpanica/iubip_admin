import './Registration.css'
import Input from '../Input/Input.jsx'
import Button from '../Button/Button.jsx'
import { yandexAuth } from '../../../yandexActions.js'
import { register, login, getUser, addStatusTable } from '../../../actions.js'
import { getStatuses, getNSetUser } from '../../../actionsAdvanced.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Registration({ setUser, ...props }) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [secondPassword, setSecondPassword] = useState('')
    const [error, setError] = useState('')

    const buttonSubmit = async () => {
        if (password !== secondPassword) {
            setError('Пароли не совпадают.')
        }
        else if (email === '' || password === '' || firstName === '' || lastName === '') {
            setError('Все поля должны быть заполнены')
        }
        else {
            const response = await register(firstName + ' ' + lastName, password, email)
            if (response.status === 400) {
                setError(response.data.detail)
            }
            else if (response.status === 201) {
                const statusResponse = await addStatusTable({...getStatuses([]), 'email': email})
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
                    setFirstName('')
                    setLastName('')
                    setPassword('')
                    setSecondPassword('')
                }
                else {
                    setError('Произошла ошибка при входе, попробуйте войти вручную.')
                }
            }
        }
    }

    useEffect(() => {
        const onMountFun = async () => {
            const newUser = await getNSetUser()
            if (newUser) {
                setUser(newUser)
            }
        }
        onMountFun();
    }, [])
    
    useEffect(() => {
        setError('')
    }, [firstName, lastName, email, password, secondPassword])

    const loginUser = async (password, email = '', yandex = '') => {
        const response = await login(password, email, yandex)
        if (response.status === 200) {
            localStorage.setItem('access', response.data.access_token)
            localStorage.setItem('refresh', response.data.refresh_token)
            return 'success'
        }
        else return response
    }

    return (
        <div className='registration-wrapper'>
            <div className="registration-block">
                <div className="registration-form">
                    <h1 className="registration-title">
                        Регистрация
                    </h1>
                    <Input placeholder="Имя" inputValue={firstName} changeValueFun={(e) => setFirstName(e.target.value)} />
                    <Input placeholder="Фамилия" inputValue={lastName} changeValueFun={(e) => setLastName(e.target.value)} />
                    <Input placeholder="Почта" inputValue={email} changeValueFun={(e) => setEmail(e.target.value)} />
                    <Input placeholder="Пароль" type={passwordVisible ? 'text' : 'password'} inputValue={password} changeValueFun={(e) => setPassword(e.target.value)} />
                    <Input placeholder="Пароль повторно" type={passwordVisible ? 'text' : 'password'} inputValue={secondPassword} changeValueFun={(e) => setSecondPassword(e.target.value)} />
                    <div className="registration-alternate-description-link password-visible-button" onClick={() => setPasswordVisible(!passwordVisible)}>{passwordVisible ? 'Скрыть пароль' : 'Показать пароль'}</div>
                    <Button handleClick={buttonSubmit} className='registration-button'>Зарегистрироваться</Button>
                    <p className={["registration-alternate-description error-massage", error ? '' : 'error-massage-hidden'].join(' ')}>{error}</p>
                    <p className="registration-alternate-description">
                        Уже есть аккаунт? <Link to={'/authorization'} className="registration-alternate-description-link">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Registration