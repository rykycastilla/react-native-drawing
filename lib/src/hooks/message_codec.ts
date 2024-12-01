import { Codec } from '../shared/utils/Codec'
import { MessageData } from '../shared/utils/MessageSystem'
import { useMemo } from 'react'

export function useMessageCodec(): Codec<MessageData> {
  return useMemo( () => {
    return new Codec<MessageData>()
  }, [] )
}
