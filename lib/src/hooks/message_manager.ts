import { MessageManager } from '../services/MessageManager'
import { useMemo } from 'react'

export function useMessageManager(): MessageManager {
  return useMemo( () => new MessageManager(), [] )
}
