import { RefreshCw, SearchIcon } from 'lucide-react'
import { Button } from '../../../../components/Button'
import { Input } from '../../../../components/Input'
import { Select } from '../../../../components/Select'
import { useSearchController } from './useSearchController'

export const Search = () => {
  const {
    search,
    status,
    handleSearch,
    handleStatus,
    handleSearchSearch,
    handleStatusSearch,
    resetFilters,
  } = useSearchController()

  const handleSubmit = () => {
    handleSearchSearch()
    handleStatusSearch()
  }

  return (
    <div className="py-4">
      <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
        <div className="flex gap-4">
          <div className="w-1/4">
            <Input
              name="search"
              placeholder="Pesquisar por nome/login"
              className="border-gray-300 focus:border-gray-500"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
            />
          </div>
          <div className="w-1/4">
            <Select
              placeholder="Pesquisar por status"
              onChange={handleStatus}
              value={status}
              options={[
                {
                  value: 'Todos',
                  label: 'Todos',
                },
                {
                  value: 'Ativado',
                  label: 'Ativado',
                },
                {
                  value: 'Inativado',
                  label: 'Inativado',
                },
              ]}
              className="border-gray-300 focus:border-gray-500"
            />
          </div>
          <div className="w-1/4 gap-4 flex">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={(search && search.length < 3) || false}
            >
              <SearchIcon className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" onClick={resetFilters}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="p-2 text-xs text-gray-700 dark:text-white">
          O campo de busca deve ter pelo menos 3 caracteres.
        </p>
      </form>
    </div>
  )
}
