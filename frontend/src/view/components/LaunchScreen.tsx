import { Transition } from '@headlessui/react'

import Player from 'lottie-react'
import animationData from '../../../public/loading.json'

interface LaunchScreenProps {
  isLoading: boolean
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-gray-500 fixed top-0 left-0 w-full h-full grid place-items-center z-50">
        <div className="flex flex-col items-center gap-4">
          <Player autoplay loop animationData={animationData} />
          <span className="text-gray-200">Carregando...</span>
        </div>
      </div>
    </Transition>
  )
}
