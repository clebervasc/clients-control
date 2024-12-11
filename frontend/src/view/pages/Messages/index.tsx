import { LaunchScreen } from '../../components/LaunchScreen'

import _ from 'lodash'

import emptyStateImage from '../../../../public/emptyState.svg'
import { useMessagesController } from './useMessagesController'
import { MessageContext, MessageProvider } from './components/MessageContext'
import { Card } from './components/Card'
import { Delete } from './components/Delete'
import { ButtonCreate } from './components/ButtonCreate'
import { NewMessage } from './New'
import { EditMessage } from './Edit'

export function Messages() {
  const { data, isFetching } = useMessagesController()

  return (
    <MessageProvider>
      <MessageContext.Consumer>
        {({
          messageBeingEdited,
          messageIdBeingDeleted,
          closeDeleteMessagetModal,
        }) => (
          <>
            <LaunchScreen isLoading={isFetching} />

            <div className="w-full h-full">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-3xl">Mensagens</h1>
                <ButtonCreate />
              </div>

              {data && _.some(data) && (
                <div className="py-4">
                  <div className="w-full p-2 rounded-2xl dark:bg-gray-900 flex items-center gap-8">
                    {data.map((message) => (
                      <div
                        className="w-1/3 flex flex-col justify-between"
                        key={message.id}
                      >
                        <Card message={message} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!_.some(data) && !isFetching && (
                <div className="flex flex-col items-center justify-center mt-40">
                  <img src={emptyStateImage} alt="Empty state" />
                  <p className="dark:text-gray-200 text-gray-800 mt-4 text-center text-lg">
                    Não encontramos nenhuma mensagem!
                  </p>
                </div>
              )}
            </div>

            <NewMessage />

            {messageBeingEdited && <EditMessage />}

            {messageIdBeingDeleted && (
              <Delete closeDeleteMessagetModal={closeDeleteMessagetModal} />
            )}
          </>
        )}
      </MessageContext.Consumer>
    </MessageProvider>
  )
}
