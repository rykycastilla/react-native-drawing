import { ITool } from './ITool'

export interface ResizableTool extends ITool {
  readonly size: number
  setSize( size:number ): void
}
