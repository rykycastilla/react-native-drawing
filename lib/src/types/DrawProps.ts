import { DrawCanvasProps } from './DrawCanvasProps'
import { EyeDropperEvent, FillingEvent, HistoryEvent, LoadEvent, ScrollEvent } from '../services'

export interface DrawProps extends DrawCanvasProps {
  onLoad?: ( event:LoadEvent ) => void
  onEyeDropper?: ( event:EyeDropperEvent ) => Promise<void> | void
  onFilling?: ( event:FillingEvent ) => Promise<void> | void
  onHistoryMove?: ( event:HistoryEvent ) => Promise<void> | void
  onScroll?: ( event:ScrollEvent ) => Promise<void> | void
}
