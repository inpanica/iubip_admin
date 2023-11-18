import './YandexButton.css'
import Button from '../Button/Button.jsx'
import { YandexLogin, YandexLogout } from 'react-yandex-login'
import config from '../../../config.js'
import { useRef } from 'react'


function YandexButton({ children, successFunction, ...props }) {

    const yandexRef = useRef(null)

    return (
        <div className="yandex-wrapper">
            <YandexLogin clientID={config.yandexClientId} onSuccess={successFunction}>
                <button hidden ref={yandexRef}></button>
            </YandexLogin>
            <Button className='registration-button' handleClick={() => yandexRef.current.click()}>
                <span className="yandex-logo"></span>
                {children}
            </Button>
        </div>
    )
}

export default YandexButton