import { Server, ServerResponse } from '../../../../app/entities/Server'
import { formatCurrency } from '../../../../app/utils/formatCurrency'
import { Popover } from './Popover'

const heads = [
  'Servidor',
  'Mensal',
  'Bismestral',
  'Trimestral',
  'Semestral',
  'Anual',
]

interface TableProps {
  data: ServerResponse
  openDeleteServerModalOpen: (serverId: string) => void
}

export const Table = ({ data, openDeleteServerModalOpen }: TableProps) => {
  return (
    <table className="w-full divide-y divide-gray-200">
      <thead>
        <tr>
          {heads.map((head) => (
            <th
              key={head}
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium dark:text-gray-400 text-gray-500 uppercase"
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((server: Server) => (
          <tr key={server.id}>
            <td className="dark:text-white px-6 py-4 whitespace-nowrap">
              <span
                style={{
                  color: server.color,
                  border: `1px solid ${server.color}`,
                }}
                className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium"
              >
                {server.name}
              </span>
            </td>
            <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
              {formatCurrency(server.monthlyPrice)}
            </td>
            <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
              {formatCurrency(server.bimonthlyPrice)}
            </td>
            <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
              {formatCurrency(server.quarterlyPrice)}
            </td>
            <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
              {formatCurrency(server.halfYearlyPrice)}
            </td>
            <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
              {formatCurrency(server.annualPrice)}
            </td>
            <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
              <Popover
                server={server}
                openDeleteServerModalOpen={openDeleteServerModalOpen}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
