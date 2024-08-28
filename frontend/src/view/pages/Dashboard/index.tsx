import { Outlet } from 'react-router-dom'
import { UserMenu } from './components/UserMenu'
import {
  DashboardContext,
  DashboardProvider,
} from './components/DashboardContext'

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {() => (
          <div className="bg-dashboard w-full h-full flex">
            <div className="bg-white h-full flex-1 text-center px-4">
              <div className="h-[63px] flex items-center justify-center">
                <p>Menu</p>
              </div>
            </div>

            <div className="w-full">
              <div className="bg-white px-8 w-full h-[63px] flex justify-between items-center">
                <p>Dashboard de clientes</p>
                <UserMenu />
              </div>

              <div className="p-8">
                <Outlet />
              </div>
            </div>
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  )
}
