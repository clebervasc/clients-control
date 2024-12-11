import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider/useTheme'
import { Button } from './Button'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      className="relative p-2 flex items-center justify-center border-none"
    >
      <Sun className="h-6 w-6 text-yellow-500 transition-transform duration-300 ease-in-out dark:rotate-90 dark:scale-0" />
      <Moon className="absolute h-6 w-6 text-blue-500 transition-transform duration-300 ease-in-out rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
