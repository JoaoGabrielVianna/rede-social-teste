/* Este código está importando módulos e componentes necessários para uma aplicação React e renderizando o
componente principal (App) no elemento raiz do documento HTML. */
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App-screen/App.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
