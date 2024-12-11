import {
  DashboardContext,
  DashboardProvider,
} from './components/DashboardContext'

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

import { Outlet } from 'react-router-dom'
import { localStorageTheme } from '../../../app/config/localStorageTheme'
import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProvider } from '@/components/theme-provider'

export function Dashboard() {
  return (
    <ThemeProvider defaultTheme="light" storageKey={localStorageTheme.THEME}>
      <DashboardProvider>
        <DashboardContext.Consumer>
          {() => (
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                  <div className="w-full flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <ModeToggle />
                  </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 bg-gray-100 dark:bg-neutral-950">
                  <Outlet />
                </div>
              </SidebarInset>
            </SidebarProvider>
          )}
        </DashboardContext.Consumer>
      </DashboardProvider>
    </ThemeProvider>
  )
}
