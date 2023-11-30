/*
  Este é o componente principal de uma aplicação React que configura as rotas e fornece contexto de autenticação do usuário.
*/
import './App.css'
import { UserAuthContextProvider } from '../../context/userAuthContext';

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
import HomePage from '../Home-screen/Home'
import LoginPage from '../Login-screen/Login'
import RegisterPage from '../Register-screen/Register'
import WelcomePage from '../Welcome-screen/Welcome'
import { Route, Routes } from 'react-router-dom'
import PerfilEditor from '../PerfilEditor/PerfilEditor';


export default function App() {
  return (

    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/home' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path='/editar-perfil' element={
            <ProtectedRoute>
              <PerfilEditor />
            </ProtectedRoute>
          } />
        </Routes>
      </UserAuthContextProvider>
    </>
  )
}


