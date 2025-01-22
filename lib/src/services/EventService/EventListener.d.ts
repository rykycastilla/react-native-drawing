import { EyeDropperListener } from './EyeDropperListener'
import { FillingListener } from './FillingListener'
import { HistoryListener } from './HistoryListener'
import { LoadListener } from './LoadListener'

export type EventListener = EyeDropperListener | FillingListener | HistoryListener | LoadListener
