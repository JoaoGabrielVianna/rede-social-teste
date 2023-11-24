import { useEffect, useRef, useState } from 'react';
import { CustomButtonEmail, CustomButtonPink } from '../../components/Custom-Button/CustomButton';
import CustomInput from '../../components/Custom-Input/CustomInput';
import GoBackButton from '../../components/GoBack-Button/GoBackButton';
import { useUserAuth } from '../../context/userAuthContext';
import './Register.css';
import CustomAlert from '../../components/Custom-Alert/CustomAlert';
import { useNavigate } from 'react-router-dom';
import perfil_anonimo from '../../assets/svgs/perfil-anonimo.svg'

export default function RegisterPage() {
    // Estados para controlar a camada (layer), opacidade do botão, mensagem de erro, e informações do usuário, e-mail e senha
    const [layer, setLayer] = useState(5);
    const [buttonOpacity, setButtonOpacity] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState()
    const fileInputRef = useRef(null);

    // Hook para navegação no React Router
    const navigate = useNavigate();
    // Hook para acessar as funções de autenticação do contexto
    const { signUp, signed } = useUserAuth();

    // Efeito para ajustar a opacidade do botão quando a camada (layer) muda
    useEffect(() => {
        if (layer >= 2 && layer <= 4) {
            setButtonOpacity(true);
        }
    }, [layer]);

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
                navigate('/home');
            } catch (err) {
                setError(err.message);
            }
        }
    }

    // Função para avançar para a próxima camada (layer)
    const continueButton = () => {
        // Verifica se o botão está ativado antes de prosseguir
        if (!buttonOpacity) {
            // Condições específicas para cada camada (layer)
            if (layer === 3 && password.length < 6) {
                setError("A senha deve conter pelo menos 6 caracteres.");
            } else if (layer === 2 && !user) {
                setError("Escolha um nome de usuário.");
            } else {
                setLayer(layer + 1);
            }
        }
    }

    // Função para retornar para a camada anterior (layer)
    const returnButton = () => {
        // Reseta o erro e diminui a camada (layer)
        setError('');
        setLayer(layer - 1);
    };

    // Funções para lidar com as mudanças nos campos de input
    const InputUser = (e) => {
        const inputValue = e.target.value;
        setUser(inputValue);
        // Lógica para verificar as condições e ajustar a opacidade
        setButtonOpacity(!inputValue);
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

    const InputChangePhoto = (e) => {
        const selectedFile = e.target.files[0];

        // Atualiza o estado setPhoto com o arquivo selecionado
        setPhoto(selectedFile);

        // Se desejar, você também pode armazenar ou exibir informações sobre o arquivo
        console.log('Nome do arquivo:', selectedFile ? selectedFile.name : 'Nenhum arquivo selecionado');
        console.log('Tipo do arquivo:', selectedFile ? selectedFile.type : 'Nenhum arquivo selecionado');
        console.log('Tamanho do arquivo:', selectedFile ? selectedFile.size : 'Nenhum arquivo selecionado');
    };

    const InputClickPhoto = () => {
        fileInputRef.current.click();
    };



    // Renderização condicional com base na autenticação
    if (!signed) {
        return (
            <>
                <main id="main-register">
                    {error && <CustomAlert text={error} />}
                    {/* Renderização condicional com base na camada (layer) */}
                    {layer === 1 ?
                        <span className='span-layer-1'>
                            <GoBackButton local={'/'} />
                            <h1>Como você deseja se registrar?</h1>
                            <span>
                                <CustomButtonEmail onClick={() => setLayer(layer + 1)} />
                            </span>
                        </ span> : ''}

                    {layer === 2 ?
                        <span className='span-layer-2'>
                            <GoBackButton onClick={returnButton} />
                            <span>
                                <CustomInput placehover='Nome de usuário' onChange={InputUser} />
                            </span>
                            <span>
                                <CustomButtonPink text={'Avançar'} ativo desativado={buttonOpacity} onClick={continueButton} />
                            </span>
                        </ span> : ''}
                    {layer === 3 ?
                        <span className='span-layer-3'>
                            <GoBackButton onClick={returnButton} />
                            <span>
                                <CustomInput placehover='Senha' onChange={InputPassword} />
                            </span>
                            <span>
                                <CustomButtonPink text={'Avançar'} onClick={continueButton} ativo desativado={buttonOpacity} />
                            </span>
                        </ span> : ''}
                    {layer === 4 ?
                        <span className='span-layer-4'>
                            <GoBackButton onClick={returnButton} />
                            <span>
                                <CustomInput placehover='Email' onChange={InputEmail} />
                            </span>
                            <span>
                                <CustomButtonPink text={'Avançar'} onClick={continueButton} ativo desativado={buttonOpacity} />
                            </span>
                        </ span> : ''}

                    {layer === 5 ?
                        <span className='span-layer-5'>
                            <span>
                                <h1>Escolha um foto de perfil:{user}</h1>
                                <div className="photo-perfil">
                                    <img className="icon" src={photo ? URL.createObjectURL(photo) : perfil_anonimo} />
                                    <div className="input" onClick={InputClickPhoto} ><input type="file" id="fileInput" ref={fileInputRef} onChange={InputChangePhoto} accept="image/*" /></div>
                                </div>

                            </span>
                            <span>
                                <CustomButtonPink text={'Avançar'} onClick={continueButton} ativo />
                            </span>
                        </ span> : ''}

                    {layer === 6 ?
                        <span className='span-layer-6'>
                            <span>
                                <div className="icon"></div>
                                <h1>Bem-vindo ao APP, {user}</h1>
                            </span>
                            <span>
                                <CustomButtonPink text={'Concluir o cadastro'} onClick={registerButton} ativo />
                            </span>
                        </ span> : ''}
                </main>
            </>
        )
    } else {
        navigate('/home')
    }
}
