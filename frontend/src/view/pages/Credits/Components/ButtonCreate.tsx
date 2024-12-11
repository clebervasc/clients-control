import { useCredit } from './CreditContext/useCredit'

export const ButtonCreate = () => {
  const { openNewCreditModal } = useCredit()
  return (
    <button
      type="button"
      onClick={openNewCreditModal}
      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
    >
      + Novo crédito
    </button>
  )
}
