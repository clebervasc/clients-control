import { GoogleLogin } from '@react-oauth/google'

import { useAuth } from '../../../app/hooks/useAuth'

export const Login = () => {
  const { loginSucess } = useAuth()

  return (
    <GoogleLogin
      onSuccess={loginSucess}
      locale="pt-BR"
      size="large"
      theme="outline"
      width={250}
      shape="pill"
    />
  )
}
