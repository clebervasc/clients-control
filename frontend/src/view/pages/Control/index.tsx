import { useControlController } from './useControlController'

export function Control() {
  const { control } = useControlController()

  console.log(control, 'io')

  return (
    <div className="w-full h-full">
      <h1 className="font-bold text-3xl">Dashboard</h1>
    </div>
  )
}
