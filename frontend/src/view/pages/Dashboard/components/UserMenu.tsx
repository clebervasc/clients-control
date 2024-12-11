import { useAuth } from '../../../../app/hooks/useAuth'
import { DropdownMenu } from '../../../components/DropdownMenu'
import { googleLogout } from '@react-oauth/google'
import { LogOutIcon } from 'lucide-react'

export function UserMenu() {
  const { signout, user } = useAuth()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="avatar gap-4 flex items-center">
          <span className="text-right">
            <span className="block text-sm font-medium text-black dark:text-white">
              {user?.name}
            </span>
            <span className="block text-xs dark:text-white">{user?.email}</span>
          </span>
          <img
            className="inline-block size-[38px] rounded-full"
            src={user?.avatar}
            alt="Avatar"
          />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={() => {
            googleLogout()
            signout()
          }}
        >
          Sair
          <LogOutIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
