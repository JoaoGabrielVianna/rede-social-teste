import { useEffect, useRef, useState } from 'react';
import { CustomButtonEmail, CustomButtonPink } from '../../components/Custom-Button/CustomButton';
import CustomInput from '../../components/Custom-Input/CustomInput';
import GoBackButton from '../../components/GoBack-Button/GoBackButton';
import { useUserAuth } from '../../context/userAuthContext';
import './Register.css';
import CustomAlert from '../../components/Custom-Alert/CustomAlert';
import { useNavigate } from 'react-router-dom';
import perfil_anonimo from '../../assets/svgs/perfil-anonimo.svg'

import email_icon from '../../assets/svgs/icon-email.svg';
import { db } from '../../services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import EditButton from '../../components/Edit-Button/EditButton';

export default function RegisterPage() {
    // Estados para controlar a camada (layer), opacidade do botão, mensagem de erro, e informações do usuário, e-mail e senha.
    // Layer 1: Pede ao usuário para escolher o método de registro.
    // Layer 2: Pede ao usuário seu nome de usuário.
    // Layer 3: Pede ao usuário sua senha.
    // Layer 4: Pede ao usuário seu e-mail.
    // Layer 5: Pede ao usuário uma foto para seu perfil.
    // Layer 6: *TODO, fazer ajuste da foto*
    // Layer 7: Pede ao usuário para concluir o cadastro.

    const [layer, setLayer] = useState(2);
    const [buttonOpacity, setButtonOpacity] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState();

    // Hook para navegação no React Router
    const navigate = useNavigate();
    // Hook para acessar as funções de autenticação do contexto
    const { signUp, signed } = useUserAuth();

    // Efeito para ajustar a opacidade do botão quando a camada (layer) muda
    useEffect(() => {
        if (layer >= 2 && layer <= 4) {
            setButtonOpacity(true);
            // console.clear();
        }
    }, [layer]);

    useEffect(() => {
        console.clear();
        setError('');
        setButtonOpacity(true);
        if (layer === 2) {
            const checkUserExistence = async () => {
                try {
                    const usersCollection = collection(db, 'users');
                    const snapshot = await getDocs(usersCollection);

                    snapshot.forEach((doc) => {
                        const nameData = doc.data().name;

                        if (nameData === undefined) {
                            console.warn('Campo "name" não definido no documento:', doc.id);
                            return; // Pule a iteração se o campo 'name' não estiver definido
                        }

                        // Converta para minúsculas antes de processar
                        const lowerCaseName = nameData.toLowerCase();

                        console.log('name:', lowerCaseName);
                    });

                    const querySnapshot = await getDocs(query(usersCollection, where('name', '==', user.toLowerCase())));
                    const userExists = querySnapshot.docs.length > 0;

                    setError(userExists ? 'Usuário existe!' : '');
                    setButtonOpacity(!user || userExists);
                } catch (error) {
                    console.error('Erro ao verificar a existência do usuário:', error);
                }
            };

            const timerId = setTimeout(checkUserExistence, 500);

            return () => {
                clearTimeout(timerId);
            };
        }
    }, [user]);

    // Efeito para verificar a senha criada
    useEffect(() => {
        setError('');
        const timerId = setTimeout(() => {
            if (layer === 3) {
                const minLength = 6;
                const remainingChars = minLength - password.length;

                if (password.length < 6) {
                    setError(`Digite mais ${remainingChars} caracteres`);
                } else {
                    setError('');
                }
            }
        }, 1000); // Aguarda 1 segundo antes de verificar se há erro

        return () => clearTimeout(timerId); // Limpa o timer ao desmontar o componente ou redefinir o efeito
    }, [password]);

    // Função para lidar com o clique no botão de registro
    const registerButton = async (e) => {
        // Impede o envio do formulário se o botão estiver desativado
        if (!buttonOpacity) {
            e.preventDefault();
            setError('');
            try {
                // Chama a função de registro do contexto
                await signUp(email, password, user, photo);
                // Navega para a página home após o registro
                if (signed) {
                    navigate('/home');
                }
            } catch (err) {
                setError(err.message);
            }
        }
    };

    // Função para avançar para a próxima camada (layer)
    const continueButton = () => {
        // Verifica se o botão está ativado antes de prosseguir
        if (!buttonOpacity) {
            setLayer(layer + 1);
        }
    };

    // Função para retornar para a camada anterior (layer)
    const returnButton = () => {
        // Reseta o erro e diminui a camada (layer)
        setError('');
        setLayer(layer - 1);
    };

    // Funções para lidar com as mudanças nos campos de input
    const InputUser = (e) => {
        const inputValue = e.target.value;
        setUser(inputValue.toLowerCase());
        // Lógica para verificar as condições e ajustar a opacidade
        setButtonOpacity(user_Exists);
    };

    const InputPassword = (e) => {
        const inputValue = e.target.value;
        setPassword(inputValue);
        // Lógica para verificar as condições e ajustar a opacidade
        setButtonOpacity(inputValue.length < 6);
    };

    const InputEmail = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);
        // Lógica para verificar as condições e ajustar a opacidade
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setButtonOpacity(!emailRegex.test(inputValue));
    };

    if (layer == 6) {
        console.clear();
        console.log('Usuario:', user);
        console.log('Email:', email);
        console.log('Senha:', password);
        console.log('Foto:', photo.name);
    }

    // Renderização condicional com base na autenticação
    if (!signed) {
        return (
            <>
                <main id="main-register">
                    {error && <CustomAlert text={error} />}
                    {/* Renderização condicional com base na camada (layer) */}
                    {layer === 1 ? (
                        <span className='span-layer-1'>
                            <GoBackButton local={'/'} />
                            <h1>Como você deseja se registrar?</h1>
                            <span>
                                <CustomButtonEmail onClick={() => setLayer(layer + 1)} />
                            </span>
                        </span>
                    ) : (
                        ''
                    )}

                    {layer === 2 ? (
                        <span className='span-layer-2'>
                            <GoBackButton onClick={returnButton} />
                            <span>
                                <CustomInput title='usuário' placehover='Nome de usuário' onChange={InputUser} error={error} />
                            </span>
                            <span>
                                <CustomButtonPink text={'Avançar'} ativo desativado={buttonOpacity} onClick={continueButton} />
                            </span>
                        </span>
                    ) : (
                        ''
                    )}
                    {layer === 3 ? (
                        <span className='span-layer-3'>
                            <GoBackButton onClick={returnButton} />
                            <span>
                                <CustomInput title='senha' placehover='Digite sua senha' onChange={InputPassword} type='password' error={error} />
                            </span>
                            <span>
                                <CustomButtonPink text={'Avançar'} onClick={continueButton} ativo desativado={buttonOpacity} />
                            </span>
                        </span>
                    ) : (
                        ''
                    )}
                    {layer === 4 ? (
                        <span className='span-layer-4'>
                            <GoBackButton onClick={returnButton} />
                            <span>
                                <CustomInput icon={email_icon} title='e-mail' placehover='Digite seu e-mail' onChange={InputEmail} type='email' />
                            </span>
                            <span>
                                <CustomButtonPink text={'Avançar'} onClick={continueButton} ativo desativado={buttonOpacity} />
                            </span>
                        </span>
                    ) : (
                        ''
                    )}

                    {layer === 5 ? (
                        <span className='span-layer-5'>
                            <span>
                                <h1>Escolha um foto de perfil:{user}</h1>
                                <div className="photo-perfil">
                                    <img className="icon" src={photo ? URL.createObjectURL(photo) : perfil_anonimo} />
                                    <EditButton width='46px' height='46px' position='absolute' right='0' bottom='0' input photo={photo} setPhoto={setPhoto} />
                                </div>
                            </span>
                            <span>
                                <CustomButtonPink text={'Avançar'} onClick={continueButton} ativo />
                            </span>
                        </span>
                    ) : (
                        ''
                    )}

                    {layer === 6 ? (
                        <span className='span-layer-6'>
                            <span>
                                <img className="icon" src={photo ? URL.createObjectURL(photo) : perfil_anonimo}></img>
                                <h1>Bem-vindo ao APP,<br /> {user}</h1>
                            </span>
                            <span>
                                <CustomButtonPink text={'Concluir o cadastro'} onClick={registerButton} ativo />
                            </span>
                        </span>
                    ) : (
                        ''
                    )}

                    {layer === 7 ? (
                        <span className='span-layer-7'>
                            <span>
                                <img className="icon" src={photo ? URL.createObjectURL(photo) : perfil_anonimo}></img>
                                <h1>Bem-vindo ao APP,<br /> {user}</h1>
                            </span>
                            <span>
                                <CustomButtonPink text={'Concluir o cadastro'} onClick={registerButton} ativo />
                            </span>
                        </span>
                    ) : (
                        ''
                    )}
                </main>
            </>
        );
    } else {
        navigate('/home');
    }
}
