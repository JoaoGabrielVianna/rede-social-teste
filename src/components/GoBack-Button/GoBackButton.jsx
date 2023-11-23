import './GoBackButton.css'
import { Link } from "react-router-dom"
import icon_arrow_back from '../../assets/svgs/icon-arrow-back.svg'
export default function GoBackButton({ local, onClick }) {
    return (
        <>
            <Link id='main-GoBackButton' to={local ? local : '#'} onClick={onClick}><img src={icon_arrow_back} alt="" /></Link>
        </>
    )
}