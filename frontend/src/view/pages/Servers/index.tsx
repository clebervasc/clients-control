import { LaunchScreen } from '../../components/LaunchScreen'
import { Table } from './components/Table'
import { NewServer } from './New'
import {
  useDeleteServerController,
  useGetAllServersController,
} from './useServersController'

import _ from 'lodash'

import emptyStateImage from '../../../assets/emptyState.svg'
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal'
import { EditServer } from './Edit'
import { ServerContext, ServerProvider } from './components/ServerContext'
import { ButtonCreate } from './New/ButtonCreate'

export function Servers() {
  const { data, isFetching } = useGetAllServersController()

  const {
    isDeleteServerModalOpen,
    openDeleteServerModalOpen,
    handleCloseDeleteModal,
    handleDeleteServer,
    isLoadingDelete,
  } = useDeleteServerController()

  if (isDeleteServerModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteServer}
        onClose={handleCloseDeleteModal}
        title="Tem certeza que deseja excluir este servidor?"
      />
    )
  }

  return (
    <ServerProvider>
      <ServerContext.Consumer>
        {({ serverBeingEdited }) => (
          <>
            <LaunchScreen isLoading={isFetching} />

            <div className="w-full h-full">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-3xl">Servidores</h1>
                <ButtonCreate />
              </div>

              {data && _.some(data) && (
                <div className="py-4">
                  <div className="w-full p-2 bg-white shadow-lg rounded-2xl dark:bg-gray-900">
                    <Table
                      data={data}
                      openDeleteServerModalOpen={openDeleteServerModalOpen}
                    />
                  </div>
                </div>
              )}

              {!_.some(data) && !isFetching && (
                <div className="flex flex-col items-center justify-center mt-40">
                  <img src={emptyStateImage} alt="Empty state" />
                  <p className="dark:text-gray-200 text-gray-800 mt-4 text-center text-lg">
                    Não encontramos nenhum servidor!
                  </p>
                </div>
              )}
            </div>

            <NewServer />

            {serverBeingEdited && <EditServer />}
          </>
        )}
      </ServerContext.Consumer>
    </ServerProvider>
  )
}
