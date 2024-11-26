import { Codec } from '../services/Codec'
import { MessageData } from '../MessageSystem'
import { useMemo } from 'react'

export function useMessageCodec(): Codec<MessageData> {
  return useMemo( () => {
    return new Codec<MessageData>()
  }, [] )
}
