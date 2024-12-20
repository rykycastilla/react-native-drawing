import { Tool } from './Tool'

export interface ResizableTool extends Tool {
  readonly size: number
  setSize( size:number ): void
}
