import { LaunchScreen } from '@/components/LaunchScreen'
import { useGetClientController } from '../useClientController'
import { PlanDetailsMap } from '../../../../app/entities/Plan'
import { expirationDate } from '../../../../app/utils/expirationDate'
import { checkValidityDate } from '../../../../app/utils/checkValidityDate'
import { formatPhoneNumber } from '../../../../app/utils/formatPhoneNumber'
import { formatDate } from '../../../../app/utils/formatDate'
import { formatCurrency } from '../../../../app/utils/formatCurrency'
import {
  paymentTypeTranslation,
  prospectionTypeTranslation,
} from '../../../../app/entities/Clients'

export const ClientView = () => {
  const { data } = useGetClientController()
  if (!data) {
    return <LaunchScreen isLoading />
  }

  return (
    <>
      <div className="w-full h-full">
        <h1 className="font-bold text-3xl">Detalhes do Cliente</h1>

        <div className="w-full my-4 bg-white shadow-lg rounded-2xl dark:bg-gray-900">
          <div className="w-full p-4 flex justify-between">
            <h1 className="font-bold text-2xl">{data.name}</h1>
            <div className="flex gap-2">
              {data.isActive && (
                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green/10 dark:text-green">
                  ATIVO
                </span>
              )}

              {data.isRecurring && (
                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow/10 dark:text-yellow">
                  RECORRENTE
                </span>
              )}
              <span className={expirationDate(data.expirationDate)}>
                {checkValidityDate(data.expirationDate).translation}
              </span>
            </div>
          </div>
          <div className="p-4 grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
            <div className="my-2">
              <span className="text-xs text-gray-500">Login</span>
              <p className="text-md">{data?.login}</p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Senha</span>
              <p className="text-md">{data?.password}</p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Id</span>
              <p className="text-md">{data?.mfcId || '-'}</p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Servidor</span>
              <p className="text-md">{data?.server?.name || '-'}</p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">WhatsApp</span>
              <p className="text-md">{formatPhoneNumber(data.whatsapp)}</p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Ativação</span>
              <p className="text-md">{formatDate(new Date(data.activeDate))}</p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Último pagamento</span>
              <p className="text-md">
                {formatDate(new Date(data.lastPayment))}
              </p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Plano</span>
              <p className="text-md">
                {PlanDetailsMap[data.plan]?.displayName || '-'}
              </p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Conexões</span>
              <p className="text-md">{data.connections}</p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Método de pagamento</span>
              <p className="text-md">
                {paymentTypeTranslation[data.paymentMethod]}
              </p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Valor</span>
              <p className="text-md">
                {formatCurrency(
                  data.connections *
                    data?.server?.[
                      PlanDetailsMap[data.plan]?.priceKey || 'monthlyPrice'
                    ],
                ) || '-'}
              </p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Vencimento</span>
              <p className="text-md">
                {formatDate(new Date(data.expirationDate))}
              </p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Desconto</span>
              <p className="text-md">{formatCurrency(data?.discount || 0)}</p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Instagram</span>
              <p className="text-md">{data?.instagram || '-'}</p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Prospecção</span>
              <p className="text-md">
                {data?.prospection
                  ? prospectionTypeTranslation[data?.prospection]
                  : '-'}
              </p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">E-mail</span>
              <p className="text-md">{data?.email || '-'}</p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Documento</span>
              <p className="text-md">{data?.document || '-'}</p>
            </div>

            <div className="my-2">
              <span className="text-xs text-gray-500">Observações</span>
              <p className="text-md">{data?.observations || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
