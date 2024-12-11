import { Client, ClientResponse } from '../../../../../app/entities/Clients'
import { PlanDetailsMap } from '../../../../../app/entities/Plan'
import { RenewClientParams } from '../../../../../app/services/clientsService/renew'
import { checkValidityDate } from '../../../../../app/utils/checkValidityDate'
import { cn } from '../../../../../app/utils/cn'
import { formatCurrency } from '../../../../../app/utils/formatCurrency'
import { formatDate } from '../../../../../app/utils/formatDate'
import { useDashboard } from '../../../Dashboard/components/DashboardContext/useDashboard'
import { TableLoading } from './Loading'
import { Popover } from './Popover'
import { TableHead } from './TableHead'
import { MessageResponse } from '../../../../../app/entities/Message'
import { openWhatsAppMessage } from '../../../../../app/utils/openWhatsAppMessage'
import { formatPhoneNumber } from '../../../../../app/utils/formatPhoneNumber'
import { expirationDate } from '../../../../../app/utils/expirationDate'

interface TableProps {
  data?: ClientResponse
  openDeleteClientModalOpen: (clientId: string) => void
  openRenewClientModalOpen: (client: RenewClientParams) => void
  isLoading: boolean
  messages?: MessageResponse
}

const isLoginActive = (isActive: boolean) =>
  cn(
    'px-6 py-4 whitespace-nowrap text-sm',
    isActive ? 'text-green-500' : 'text-red-500',
  )

export const Table = ({
  data,
  openDeleteClientModalOpen,
  openRenewClientModalOpen,
  isLoading,
  messages,
}: TableProps) => {
  const { areValuesVisible } = useDashboard()

  const sendMessage = (client: Client) => {
    const message = messages?.find(
      (m) => m.messageType === checkValidityDate(client.expirationDate).status,
    )

    if (message) {
      openWhatsAppMessage({
        phoneNumber: client.whatsapp,
        title: message?.title,
        message: message?.text,
      })
    }
  }

  return (
    <table className="w-full divide-y divide-gray-200">
      <TableHead />
      <tbody className="divide-y divide-gray-200">
        {!isLoading && (
          <>
            {data?.clients.map((client: Client) => (
              <tr key={client.id}>
                <td className={isLoginActive(client.isActive)}>
                  {client.login}
                </td>
                <td
                  className={cn(
                    'px-6 py-4 whitespace-nowrap text-sm  dark:text-gray-100 text-gray-800',
                    !areValuesVisible && 'blur-sm',
                  )}
                >
                  {client.password}
                </td>
                <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
                  {client.name}
                </td>

                <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
                  {client.mfcId || '-'}
                </td>

                <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
                  {client?.server?.name || '-'}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm  text-green-600 cursor-pointer decoration-2">
                  <span onClick={() => sendMessage(client)}>
                    {formatPhoneNumber(client.whatsapp)}
                  </span>
                </td>

                <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
                  {formatDate(new Date(client.activeDate))}
                </td>

                <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
                  {formatDate(new Date(client.lastPayment))}
                </td>

                <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
                  {PlanDetailsMap[client.plan]?.displayName ?? '-'}
                </td>

                <td
                  className={cn(
                    'px-6 py-4 whitespace-nowrap text-sm  dark:text-gray-100 text-gray-800',
                    !areValuesVisible && 'blur-sm',
                  )}
                >
                  {formatCurrency(
                    client.connections *
                      client?.server?.[
                        PlanDetailsMap[client.plan]?.priceKey || 'monthlyPrice'
                      ] -
                      (client.discount ?? 0),
                  ) || '-'}
                </td>

                <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
                  {formatDate(new Date(client.expirationDate))}
                </td>

                <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
                  <span className={expirationDate(client.expirationDate)}>
                    {checkValidityDate(client.expirationDate).translation}
                  </span>
                </td>
                <td className="dark:text-white px-6 py-4 whitespace-nowrap text-end text-sm ">
                  <Popover
                    client={client}
                    openDeleteClientModalOpen={openDeleteClientModalOpen}
                    openRenewClientModalOpen={openRenewClientModalOpen}
                  />
                </td>
              </tr>
            ))}
          </>
        )}

        {isLoading && <TableLoading />}
      </tbody>
    </table>
  )
}
