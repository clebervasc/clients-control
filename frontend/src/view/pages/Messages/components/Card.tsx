import {
  Message,
  MessageTypeTranslation,
} from '../../../../app/entities/Message'

import { Popover } from './Popover'

interface CardProps {
  message: Message
}

export const Card = ({ message }: CardProps) => {
  return (
    <div className="h-full min-h-[200px] flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-900 dark:border-gray-800 dark:shadow-gray-800/70">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {message.title}
        </h3>
        <Popover message={message} />
      </div>

      <p className="mt-2 text-gray-500 dark:text-neutral-400">{message.text}</p>
      <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600">
        {MessageTypeTranslation[message.messageType]}
      </p>
    </div>
  )
}
