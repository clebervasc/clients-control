import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthGuard } from './AuthGuard'

import { Login } from '../view/pages/Login'
import { Dashboard } from '../view/pages/Dashboard'
import { Control } from '../view/pages/Control'

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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
