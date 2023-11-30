import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/userAuthContext';
import CustomAlert from '../../components/Custom-Alert/CustomAlert';
import { CustomButtonPink } from '../../components/Custom-Button/CustomButton';
import CustomInput from '../../components/Custom-Input/CustomInput';
import GoBackButton from '../../components/GoBack-Button/GoBackButton';
import email_icon from '../../assets/svgs/icon-email.svg';
import password_icon from '../../assets/svgs/icon-password.svg';
import './Login.css';

export default function LoginPage() {
    // Estados para controlar o botão, mensagens de erro e dados de entrada
    const [buttonOpacity, setButtonOpacity] = useState(true);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Expressão regular para validar e-mails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Navegação e funções do contexto de autenticação
    const navigate = useNavigate();
    const { logIn, signed, googleSignIn } = useUserAuth();

    // Função para lidar com o clique no botão de login
    const loginButton = async (e) => {
        // Impede o envio do formulário se o botão estiver desativado
        if (!buttonOpacity) {
            e.preventDefault();
            setError('');
            try {
                await logIn(email, password);
                navigate('/home');
            } catch (err) {
                setError(err.message);
            }
        }
    };

    // Função para lidar com o clique no botão do Google
    const GoogleButton = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    // Função para lidar com a entrada de senha
    const InputPassword = (e) => {
        const inputValue = e.target.value;
        setPassword(inputValue);
        // Lógica para verificar as condições e ajustar a opacidade
        setButtonOpacity(!(emailRegex.test(email) && inputValue.length >= 6));
    };

    // Função para lidar com a entrada de e-mail
    const InputEmail = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);
        // Lógica para verificar as condições e ajustar a opacidade
        setButtonOpacity(!(emailRegex.test(inputValue) && password.length >= 6));
    };

    useEffect(() => {
        setError('');
    }, [password, email]);

    // Renderização condicional com base no status de autenticação
    if (!signed) {
        return (
            <>
                <main id="main-login">
                    {error && <CustomAlert text={error} />}
                    <GoBackButton local={'/'} />
                    <span>
                        <CustomInput
                            title='Email'
                            placehover='Digite o seu e-mail...'
                            icon={email_icon}
                            onChange={InputEmail}
                            error={error}
                        />
                        <CustomInput
                            title='Senha'
                            placehover='Digite a sua senha...'
                            icon={password_icon}
                            onChange={InputPassword}
                            error={error}
                            type='password'
                        />
                        {/* <CustomButtonPink text={'Google'} link={'#'} ativo onClick={GoogleButton} /> */}
                    </span>
                    <span>
                        <CustomButtonPink text={'Login'} link={'#'} ativo desativado={buttonOpacity} onClick={loginButton} />
                    </span>
                </main>
            </>
        );
    } else {
        // Redirecionar para a página home se já estiver autenticado
        navigate('/home');
    }
}
