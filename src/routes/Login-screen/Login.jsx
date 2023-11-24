import { useState } from 'react';
import { CustomButtonPink } from '../../components/Custom-Button/CustomButton'
import CustomInput from '../../components/Custom-Input/CustomInput'
import GoBackButton from '../../components/GoBack-Button/GoBackButton'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/userAuthContext';
import CustomAlert from '../../components/Custom-Alert/CustomAlert';

export default function LoginPage() {
    const [buttonOpacity, setButtonOpacity] = useState(true);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const navigate = useNavigate()
    const { logIn, signed, googleSignIn } = useUserAuth();

    const loginButton = async (e) => {
        // Impede o envio do formulário se o botão estiver desativado
        if (!buttonOpacity) {
            e.preventDefault();
            setError('');
            try {
                await logIn(email, password);
                navigate('/home')
            } catch (err) {
                setError(err.message);
            }
        }
    }

    const GoogleButton = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn()
            navigate('/home')
        } catch (err) {
            setError(err.message);
        }
    }

    const InputPassword = (e) => {
        const inputValue = e.target.value;
        setPassword(inputValue);
        // Lógica para verificar as condições e ajustar a opacidade
        setButtonOpacity(inputValue.length < 6 || !emailRegex.test(email));
    };

    const InputEmail = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);
        // Lógica para verificar as condições e ajustar a opacidade

        setButtonOpacity(inputValue.length < 6 || !emailRegex.test(inputValue));
    };


    if (!signed) {
        return (
            <>

                <main id="main-login">
                    {error && <CustomAlert text={error} />}
                    <GoBackButton local={'/'} />
                    <span>
                        <CustomInput placehover='Digite o seu e-mail...' onChange={InputEmail} />
                        <CustomInput placehover='Digite a sua senha...' onChange={InputPassword} />
                        <CustomButtonPink text={'Google'} link={'#'} ativo onClick={GoogleButton} />
                    </span>
                    <span>
                        <CustomButtonPink text={'Login'} link={'#'} ativo desativado={buttonOpacity} onClick={loginButton} />
                    </span>
                </main>
            </>
        )
    } else {
        navigate('/home')
    }
}