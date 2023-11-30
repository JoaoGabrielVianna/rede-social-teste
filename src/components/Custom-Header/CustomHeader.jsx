import { GoBackPage } from '../GoBack-Button/GoBackButton'
import point from '../../assets/svgs/3-points.svg'
import './CustomHeader.css'

export function ProfileHeader({ text = '',  onClick, goBack}) {
    return (
        <>
            <main id="main-CustomHeader">
                <div><GoBackPage local={goBack} /></div>
                <div><h1>{text}</h1></div>
                <div onClick={onClick}><img src={point} alt="" /></div>
            </main>
        </>
    )
}