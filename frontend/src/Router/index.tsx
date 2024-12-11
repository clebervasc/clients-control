import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthGuard } from './AuthGuard'

import { Login } from '../view/pages/Login'
import { Dashboard } from '../view/pages/Dashboard'
import { Control } from '../view/pages/Control'
import { Servers } from '../view/pages/Servers'
import { Credits } from '../view/pages/Credits'
import { Messages } from '../view/pages/Messages'
import { ClientView } from '../view/pages/Client/View'
import { ClientEdit } from '../view/pages/Client/Edit'
import { ClientNew } from '../view/pages/Client/New'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<Dashboard />}>
            <Route path="/" element={<Control />} />
            <Route path="/clientes/novo" element={<ClientNew />} />
            <Route
              path="/clientes/detalhes/:clientId"
              element={<ClientView />}
            />
            <Route path="/clientes/editar/:clientId" element={<ClientEdit />} />
            <Route path="/servidores" element={<Servers />} />
            <Route path="/creditos" element={<Credits />} />
            <Route path="/mensagens" element={<Messages />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
