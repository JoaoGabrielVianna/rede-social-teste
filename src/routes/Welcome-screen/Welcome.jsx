import { CustomButtonPink, CustomButtonWhite } from '../../components/Custom-Button/CustomButton'
import { useUserAuth } from '../../context/userAuthContext'
import './Welcome.css'



export default function WelcomePage() {
    const { signed } = useUserAuth()
    if (!signed) {
        return (
            <>
                <main id="main-welcome">
                    <h1>Seja bem-vindo ao <br />NOME DO APP</h1>
                    <p>Lorem ipsum dolor sit amet. Ad minima voluptatum aut volupt explicabo exercitationem ia. Ut incidu peros as</p>
                    <span>
                        <CustomButtonPink text={'Login'} link={'/login'} ativo />
                        <CustomButtonWhite text={'Registrar'} link={'/register'} />
                    </span>
                </main>
            </>)
    } else {
        navigate('/home')
    }
}