const heads = [
  'Login',
  'Senha',
  'Nome',
  'Id',
  'Servidor',
  'WhatsApp',
  'Ativação',
  'Último Pag.',
  'Plano',
  'Valor',
  'Vencimento',
  'Validade',
]

export const TableHead = () => (
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
)
