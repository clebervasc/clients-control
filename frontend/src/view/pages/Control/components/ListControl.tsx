import {
  ChartNoAxesCombined,
  Handshake,
  Siren,
  TrendingUp,
  TrendingUpDown,
  UserCheck,
  UserRound,
} from 'lucide-react'
import { ControlCard } from './ControlCard'
import { ControlResponse } from '../../../../app/entities/Control'

interface ListControlProps {
  data?: ControlResponse
  isFetching?: boolean
}

export const ListControl = ({ data }: ListControlProps) => (
  <div className="flex gap-4 py-4">
    <ControlCard
      title="Em dia"
      color="bg-green-200"
      icon={<UserCheck className="w-4 h-4 text-green-900" />}
      value={data?.totalCLientsNotExpirated ?? 0}
    />

    <ControlCard
      title="Vencidos"
      color="bg-red-200"
      icon={<Siren className="w-4 h-4 text-red-900" />}
      value={data?.totalClientsExpirated ?? 0}
    />

    <ControlCard
      title="Total"
      color="bg-blue-200"
      icon={<UserRound className="w-4 h-4 text-blue-900" />}
      value={data?.totalClients ?? 0}
    />

    <ControlCard
      title="Novos"
      color="bg-purple-200"
      icon={<ChartNoAxesCombined className="w-4 h-4 text-purple-900" />}
      value={data?.totalClientsNew ?? 0}
    />

    <ControlCard
      title="Recorrentes"
      color="bg-yellow-200"
      icon={<Handshake className="w-4 h-4 text-yellow-900" />}
      value={data?.totalClientsRecurring ?? 0}
    />

    <ControlCard
      title="Ativos"
      color="bg-emerald-200"
      icon={<TrendingUp className="w-4 h-4 text-emerald-900" />}
      value={data?.totalClientsActive ?? 0}
    />

    <ControlCard
      title="Inativos"
      color="bg-gray-300"
      icon={<TrendingUpDown className="w-4 h-4 text-gray-900" />}
      value={data?.totalClientsInactive ?? 0}
    />
  </div>
)
