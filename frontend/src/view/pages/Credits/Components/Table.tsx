import { ArrowDown, ArrowUp } from 'lucide-react'
import {
  Credit,
  CreditOperationTranslation,
  CreditsResponse,
} from '../../../../app/entities/Credits'
import { cn } from '../../../../app/utils/cn'
import { formatCurrency } from '../../../../app/utils/formatCurrency'
import { formatDate } from '../../../../app/utils/formatDate'
import { Popover } from './Popover'

const heads = ['Servidor', 'Data', 'Operação', 'Quantidade', 'Valor', 'Total']

interface TableProps {
  data?: CreditsResponse
}

export const Table = ({ data }: TableProps) => {
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
        {data?.map((credit: Credit) => (
          <tr key={credit.id}>
            <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
              {credit?.server?.name || '-'}
            </td>

            <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
              {formatDate(new Date(credit.date))}
            </td>

            <td
              className={cn(
                'px-6 py-4 whitespace-nowrap text-sm',
                credit.operation === 'BUY' ? 'text-green-500' : 'text-red-500',
              )}
            >
              <span className="flex items-center">
                {CreditOperationTranslation[credit.operation]}
                {credit.operation === 'BUY' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
              </span>
            </td>

            <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
              {credit.quantity}
            </td>

            <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
              {formatCurrency(credit.amount)}
            </td>

            <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
              {formatCurrency(credit.quantity * credit.amount)}
            </td>

            <td className="dark:text-white px-6 py-4 whitespace-nowrap text-sm  text-gray-800">
              <Popover credit={credit} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
