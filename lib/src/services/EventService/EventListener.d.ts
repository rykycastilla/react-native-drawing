import { EyeDropperListener } from './EyeDropperListener'
import { HistoryListener } from './HistoryListener'
import { LoadListener } from './LoadListener'

export type EventListener = EyeDropperListener | HistoryListener | LoadListener
