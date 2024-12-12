import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthGuard } from './AuthGuard'

import { Login } from '../view/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { Control } from '@/pages/Control'
import { Servers } from '@/pages/Servers'
import { Credits } from '@/pages/Credits'
import { Messages } from '@/pages/Messages'
import { ClientView } from '@/pages/Client/View'
import { ClientEdit } from '@/pages/Client/Edit'
import { ClientNew } from '@/pages/Client/New'
import { NotFoundPage } from '@/pages/NotFound'

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

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
