import { ExitIcon } from '@radix-ui/react-icons'
import { useAuth } from '../../../../app/hooks/useAuth'
import { DropdownMenu } from '../../../components/DropdownMenu'
import { googleLogout } from '@react-oauth/google'

export function UserMenu() {
  const { signout, user } = useAuth()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="avatar">
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
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
