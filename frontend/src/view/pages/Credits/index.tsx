import _ from 'lodash'
import { Table } from './Components/Table'
import { useCreditsController } from './useCreditsController'
import { CreditContext, CreditProvider } from './Components/CreditContext'
import { LaunchScreen } from '../../components/LaunchScreen'

import emptyStateImage from '../../../../public/emptyState.svg'
import { NewCredit } from './New'
import { ButtonCreate } from './Components/ButtonCreate'
import { Delete } from './Components/Delete'
import { EditCredit } from './Edit'
import { ConfirmServerModal } from '@/components/ConfirmServerModal'

export function Credits() {
  const { data, servers, isFetching, isLoadingServers } = useCreditsController()

  if (isLoadingServers) {
    return <LaunchScreen isLoading />
  }

  if (!servers?.length && !isLoadingServers) {
    return (
      <ConfirmServerModal description="Para cadastrar um novo crédito, primeiro você deve cadastrar um servidor! Deseja fazer isso agora?" />
    )
  }

  return (
    <CreditProvider>
      <CreditContext.Consumer>
        {({
          creditBeingEdited,
          creditIdBeingDeleted,
          closeDeleteCredittModal,
        }) => (
          <>
            <LaunchScreen isLoading={isFetching || isLoadingServers} />

            <div className="w-full h-full">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-3xl">Créditos</h1>
                <ButtonCreate />
              </div>

              {data && _.some(data) && (
                <div className="py-4">
                  <div className="w-full p-2 bg-white shadow-lg rounded-2xl dark:bg-black">
                    <Table data={data} />
                  </div>
                </div>
              )}

              {!_.some(data) && !isFetching && (
                <div className="flex flex-col items-center justify-center mt-40">
                  <img src={emptyStateImage} alt="Empty state" />
                  <p className="dark:text-gray-200 text-gray-800 mt-4 text-center text-lg">
                    Não encontramos nenhum crédito!
                  </p>
                </div>
              )}
            </div>

            {_.some(servers) && <NewCredit servers={servers} />}

            {creditIdBeingDeleted && (
              <Delete closeDeleteCredittModal={closeDeleteCredittModal} />
            )}

            {creditBeingEdited && <EditCredit servers={servers} />}
          </>
        )}
      </CreditContext.Consumer>
    </CreditProvider>
  )
}
