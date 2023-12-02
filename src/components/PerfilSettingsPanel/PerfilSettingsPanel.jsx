import { useUserAuth } from '../../context/userAuthContext'
import './PerfilSettingsPanel.css'
import help_icon from '../../assets/svgs/icon-help.svg'
import { useState } from 'react'
import { CustomOverlayerButton } from '../Custom-Button/CustomButton';




export default function PerfilSettingsPanel({ show = true, Click, user_uid, user_password }) {
  const [deletButton, setDeletButton] = useState(false);
  const [exitAccount, setExitAccount] = useState(false);
  const { logOut, deleteUserAccount } = useUserAuth();

  const options = [
    {
      key: 'configuracoes',
      icon: help_icon,
      text: 'Configurações',
      onClick: () => alert('Em breve...'),
      boxAlert: false
    },
    {
      key: 'deletarConta',
      icon: help_icon,
      text: 'Deletar conta',
      onClick: () => setDeletButton(!deletButton),
      boxAlert: true,
      visible: deletButton,
      title: 'Deletar Conta',
      p: 'Você está prestes a deletar a sua conta, está certo disso?',
      option1: 'Sim',
      option2: 'Não',
      onClick_option1: () => deleteUserAccount({ uid: user_uid, password: user_password }),
      onClick_option2: () => setDeletButton(!deletButton)
    },
    {
      key: 'sairConta',
      icon: help_icon,
      text: 'Sair',
      onClick: () => setExitAccount(!exitAccount),
      boxAlert: true,
      visible: exitAccount,
      title: 'Sair da Conta',
      p: 'Você está prestes a sair da sua conta, está certo disso?',
      option1: 'Sair',
      option2: 'Voltar',
      onClick_option1: () => logOut(),
      onClick_option2: () => setExitAccount(!exitAccount)
    },
  ];

  return (
    <>
      <div className='zone-touch' style={{ display: show ? 'flex' : 'none' }} onClick={Click}></div>
      <main id="main-PerfilSettingsPanel" style={{ height: show ? '500px' : '0px', display: show ? '' : 'none' }}>
        <span>
          {options.map((opt) => (
            <div key={opt.key} onClick={opt.onClick} className='div'>
              <img src={opt.icon} alt="" />
              <h1>{opt.text}</h1>
              {opt.boxAlert && <CustomOverlayerButton
                show={opt.visible}
                title={opt.title}
                text={opt.p}
                option_1={opt.option1}
                option_2={opt.option2}
                onClick_opt2={opt.onClick_option2}
                onClick_opt1={opt.onClick_option1}
              />}
            </div>
          ))}
        </span>
      </main>
    </>
  );

}
