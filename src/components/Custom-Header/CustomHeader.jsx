import { GoBackPage } from '../GoBack-Button/GoBackButton'
import point from '../../assets/svgs/3-points.svg'
import './CustomHeader.css'

export function ProfileHeader({ text = '',  onclick= ''}) {
    return (
        <>
            <main id="main-CustomHeader">
                <div><GoBackPage /></div>
                <div><h1>{text}</h1></div>
                <div onClick={onclick}><img src={point} alt="" /></div>
            </main>
        </>
    )
}