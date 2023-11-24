import { CustomButton } from '../../components/Custom-Button/CustomButton'
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
                        <CustomButton text={'Login'} link={'/login'} ativo={true} />
                        <CustomButton text={'Registrar'} link={'/register'} ativo={false} />
                    </span>
                </main>
            </>)
    } else {
        navigate('/home')
    }
}