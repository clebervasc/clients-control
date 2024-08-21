import { CredentialResponse } from '@react-oauth/google'
import { useMutation, useQuery } from '@tanstack/react-query'

import { createContext, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { localStorageKeys } from '../config/localStorageKeys'
import { User } from '../entities/User'
import { login } from '../services/authService/login'
import { usersService } from '../services/usersService'

interface AuthContextValue {
  signedIn: boolean
  signin(accessToken: string): void
  signout(): void
  loginSucess(response: CredentialResponse): void
  user?: User
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    )

    return !!storedAccessToken
  })

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken)

    setSignedIn(true)
  }, [])

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)

    setSignedIn(false)
  }, [])

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (tokenId: string) => {
      return login(tokenId)
    },
  })

  const loginSucess = async (response: CredentialResponse) => {
    if (response.credential) {
      try {
        const { access_token: accessToken } = await mutateAsync(
          response.credential,
        )
        signin(accessToken)
      } catch (error) {
        console.error('Login Failed:', error)
      }
    }
  }

  const {
    isError: isMeError,
    isFetching,
    isSuccess,
    data,
  } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (isError || isMeError) {
      toast.error('Sua sessão expirou!')
      signout()
    }
  }, [isError, isMeError, signout])

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signin,
        signout,
        loginSucess,
        user: data,
      }}
    >
      {isFetching && 'CARREGANDO'}
      {!isFetching && children}
    </AuthContext.Provider>
  )
}
