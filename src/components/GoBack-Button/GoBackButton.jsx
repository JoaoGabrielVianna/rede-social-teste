import './GoBackButton.css'
import { Link } from "react-router-dom"
import icon_arrow_back_1 from '../../assets/svgs/icon-arrow-back-1.svg'
import icon_arrow_back_2 from '../../assets/svgs/icon-arrow-back-2.svg'
export default function GoBackButton({ local, onClick }) {
    return (
        <>
            <Link id='main-GoBackButton-1' to={local ? local : '#'} onClick={onClick}><img src={icon_arrow_back_1} alt="" /></Link>
        </>
    )
}

export function GoBackPage({ local, onClick }) {
    return (
        <>
            <Link id='main-GoBackButton-2' to={local ? local : '#'} onClick={onClick}><img src={icon_arrow_back_2} alt="" /></Link>
        </>
    )
}