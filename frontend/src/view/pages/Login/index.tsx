import { GoogleLogin } from '@react-oauth/google'

import { useAuth } from '../../../app/hooks/useAuth'

export const Login = () => {
  const { loginSucess } = useAuth()

  return (
    <div className="w-full h-full flex items-center justify-center flex-col bg-login bg-cover gap-4">
      <h1 className="text-2xl font-bold text-white text-center">
        Controle de Clientes
      </h1>
      <p className="text-xl text-white text-center">
        Organize seus clientes, servidores, crẽditos e muito mais!
      </p>
      <GoogleLogin
        auto_select
        onSuccess={loginSucess}
        locale="pt-BR"
        size="large"
        theme="outline"
        width={250}
        shape="pill"
      />
    </div>
  )
}
