import { GoBackPage } from '../GoBack-Button/GoBackButton'
import './CustomHeader.css'

export default function CustomHeader({text = ''}) {
    return (
        <>
            <main id="main-CustomHeader">
                <div><GoBackPage/></div>
                <div><h1>{text}</h1></div>
            </main>
        </>
    )
}