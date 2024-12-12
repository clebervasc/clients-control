export interface TotalClients {
  total: number
  totalAmount: number
}

export interface TotalClientsActive {
  total: number
  totalAmount: number
}

export interface TotalClientsExpirated {
  total: number
  totalAmount: number
}

export interface TotalClientsNotExpirated {
  total: number
  totalAmount: number
}

export interface ControlResponse {
  totalClients: TotalClients
  totalClientsActive: TotalClientsActive
  totalClientsInactive: number
  totalClientsRecurring: number
  totalClientsNew: number
  totalClientsExpirated: TotalClientsExpirated
  totalClientsNotExpirated: TotalClientsNotExpirated
}
