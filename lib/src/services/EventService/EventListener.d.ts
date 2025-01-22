import { EyeDropperListener } from './EyeDropperListener'
import { FillingListener } from './FillingListener'
import { HistoryListener } from './HistoryListener'
import { LoadListener } from './LoadListener'
import { ScrollListener } from '../ScrollService'

export type EventListener = EyeDropperListener | FillingListener | HistoryListener | LoadListener | ScrollListener
