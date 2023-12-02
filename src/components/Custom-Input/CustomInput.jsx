import './CustomInput.css'
import email_icon from '../../assets/svgs/icon-email.svg';
import password_icon from '../../assets/svgs/icon-password.svg';
import user_icon from '../../assets/svgs/icon-user.svg'
import help_icon from '../../assets/svgs/icon-help.svg'
import edit_icon from '../../assets/svgs/icon-edit-transparent.svg';
import { useEffect, useState } from 'react'
import { ProfileHeader } from '../Custom-Header/CustomHeader';

export default function CustomInput({ icon, type = 'text', placehover = 'Digite algo...', onChange, title = 'text', error, value, disable, icon_2, onChange_2, cursor, onClick_icon_2 }) {
    const [focus, setFocus] = useState(false)
    const [text, setText] = useState('')

    useEffect(() => {
        if (value) {
            setFocus(true);
        }
    }, [value]);
    return (
        <>

            <main id={focus ? "main-CustomInput-focus" : 'main-CustomInput'} style={{ border: `${error ? '1px solid red' : ''}`, animation: `${error ? 'shake 300ms' : 'none'}`, cursor: cursor ? 'pointer' : '' }} onClick={onClick_icon_2} >
                <input style={{ cursor: cursor ? 'pointer' : '' }} type={type} onChange={(e) => { onChange(e); setText(e.target.value); }} onFocus={() => setFocus(true)} onBlur={(e) => setFocus(!e.target.value ? false : true)} value={value} disabled={disable ? disable : ''} />
                {icon_2 && <img className='icon_2' src={edit_icon} />}
                <div>
                    <img src={icon === 'email' ? email_icon : icon === 'password' ? password_icon : icon === 'user' ? user_icon : help_icon} className='icon' />
                    <p>{focus ? title : placehover}</p>
                </div>

            </main>
        </>
    )
}


export function CustomOverlayerInput({ show = true, title, goBack }) {
    return (
        <>
            <main id="main-CustomOverlayerInput" style={{ display: show ? 'flex' : 'none' }}>
                <ProfileHeader text={title} onClick_Goback={goBack} />
            </main>
        </>
    )

}