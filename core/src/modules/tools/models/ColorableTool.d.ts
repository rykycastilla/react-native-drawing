import { ITool } from './ITool'

export interface ColorableTool extends ITool {
  readonly color: string
  setColor( color:string ): void
}
