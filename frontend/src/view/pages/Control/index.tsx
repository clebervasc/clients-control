import { LaunchScreen } from '../../components/LaunchScreen'
import { Pagination } from '../../components/Pagination'
import { ListControl } from './components/ListControl'
import { Table } from './components/Table'
import { useClientsController } from './components/ControlCard/useClientsController'
import {
  useControlController,
  useDeleteClientController,
  useRenewClientController,
} from './useControlController'

import _ from 'lodash'

import emptyStateImage from '../../../assets/emptyState.svg'
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal'
import { ConfirmRenewModal } from '../../components/ConfirmRenewModal'
import { Search } from './components/Search'

import { useDashboard } from '../Dashboard/components/DashboardContext/useDashboard'
import { UserPlus } from 'lucide-react'
import { EyeIcon } from '@/components/icons/EyeIcon'
import { Button } from '@/components/Button'
import { useNavigate } from 'react-router-dom'

export function Control() {
  const navigate = useNavigate()
  const { data, messages, isFetching } = useControlController()
  const {
    data: clients,
    isFetching: clientsLoading,
    filters,
    handleChangeFilters,
  } = useClientsController()

  const {
    isDeleteClientModalOpen,
    openDeleteClientModalOpen,
    handleCloseDeleteModal,
    handleDeleteClient,
    isLoadingDelete,
  } = useDeleteClientController()

  const {
    isRenewClientModalOpen,
    openRenewClientModalOpen,
    handleCloseRenewModal,
    handleRenewClient,
    isLoadingRenew,
  } = useRenewClientController()

  const { toggleValuesVisibility, areValuesVisible } = useDashboard()

  const handlePageChange = (page: number) => {
    handleChangeFilters('page')(page)
  }

  if (isDeleteClientModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteClient}
        onClose={handleCloseDeleteModal}
        title="Tem certeza que deseja excluir este cliente?"
      />
    )
  }

  if (isRenewClientModalOpen) {
    return (
      <ConfirmRenewModal
        isLoading={isLoadingRenew}
        onConfirm={handleRenewClient}
        onClose={handleCloseRenewModal}
        title="Tem certeza que deseja renovar este cliente?"
        description="Renovar este cliente adicionará dias de acordo com o plano à data de expiração, tornando-o um cliente recorrente e ativo. Além disso, a data do último pagamento será atualizada para o dia de hoje."
      />
    )
  }

  return (
    <>
      <LaunchScreen isLoading={isFetching} />

      <div className="w-full h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-4 dark:text-gray-200">
            <h1 className="font-bold text-3xl">Clientes</h1>
            <button
              className="w-8 h-8 flex items-center justify-center"
              onClick={toggleValuesVisibility}
            >
              <EyeIcon open={!areValuesVisible} />
            </button>
          </div>
          <Button
            className="bg-green-500 hover:bg-green-600 gap-1"
            onClick={() => navigate('/clientes/novo')}
          >
            <UserPlus className="w-5 h-4" /> Novo Cliente
          </Button>
        </div>
        <ListControl data={data} />
        <Search />
        {_.some(data) && _.some(clients?.clients) && (
          <>
            <div className="w-full p-2 bg-white shadow-lg rounded-2xl dark:bg-gray-900">
              <Table
                data={clients}
                messages={messages}
                openDeleteClientModalOpen={openDeleteClientModalOpen}
                openRenewClientModalOpen={openRenewClientModalOpen}
                isLoading={clientsLoading}
              />
              {clients && clients.pagination.totalPages > 1 && (
                <Pagination
                  currentPage={filters.page}
                  totalPages={clients?.pagination.totalPages || 1}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        )}

        {!_.some(clients?.clients) && !isFetching && !clientsLoading && (
          <div className="flex flex-col items-center justify-center mt-40">
            <img src={emptyStateImage} alt="Empty state" />
            <p className="dark:text-gray-200 text-gray-800">
              Não encontramos nenhum Cliente!
            </p>
          </div>
        )}
      </div>
    </>
  )
}
