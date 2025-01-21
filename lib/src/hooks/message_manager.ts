import { MessageManager } from '../services'
import { useMemo } from 'react'

export function useMessageManager(): MessageManager {
  return useMemo( () => new MessageManager(), [] )
}
