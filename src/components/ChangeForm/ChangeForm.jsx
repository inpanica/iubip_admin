import './ChangeForm.css'
import Button from '../Button/Button.jsx'
import Input from '../Input/Input.jsx'
import { useEffect, useRef, useState } from 'react'
import { changeUser, changePhoto, getUser } from '../../../actions.js'
import { getNSetUser } from '../../../actionsAdvanced.js'
import config from '../../../config.js'

function ChangeForm({ user, setUser, setIsChanging, ...props }) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [photo, setPhoto] = useState('')

    const photoRef = useRef(null)

    const saveChanges = async () => {
        const postFirstName = user.name.split(' ')[0]
        const postLastName = user.name.split(' ')[1]
        const newName = (firstName || postFirstName) + ' ' + ((lastName || postLastName) || '')
        const response = await changeUser(localStorage.getItem('access'), newName)
        if (photoRef.current.files[0]){
            const formdata = new FormData();
            const file_name = user.email + photoRef.current.files[0].name
            const new_file = new File([photoRef.current.files[0]], file_name, {type: photoRef.current.files[0].type});
            formdata.append('photo', new_file)
            const photoResponse = await changePhoto(formdata, localStorage.getItem('access'))
        }
        if (response.status === 200) {
            const newUser = await getNSetUser()
            setUser(newUser)
            setIsChanging(false)
        }
    }

    const fileChange = async (e) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPhoto(fileReader.result)
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }

    return (
        <div className='is-changing' onClick={() => setIsChanging(false)}>
            <div className="changing-form ctn" onClick={(e) => e.stopPropagation()}>
                <h2 className="h2-title">Изменить данные</h2>
                <input ref={photoRef} hidden type="file" accept='image/*' onChange={(e) => fileChange(e)} />
                <img onClick={() => photoRef.current.click()} className='changing-photo' src={photo || config.url + '/' + user.photo} alt="" />
                <Input placeholder='Новое имя' inputValue={firstName} changeValueFun={(e) => setFirstName(e.target.value)} />
                <Input placeholder='Новая фамилия' inputValue={lastName} changeValueFun={(e) => setLastName(e.target.value)} />
                <Button handleClick={saveChanges} className='cabinet-btn'>Сохранить</Button>
            </div>
        </div>
    )
}

export default ChangeForm