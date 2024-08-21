import { googleLogout } from '@react-oauth/google'

import { useAuth } from '../../../app/hooks/useAuth'

export function Dashboard() {
  const { signout, user } = useAuth()

  return (
    <div>
      <h1>{user?.name}</h1>
      <button
        onClick={() => {
          googleLogout()
          signout()
        }}
      >
        {' '}
        SAIR{' '}
      </button>
    </div>
  )
}
