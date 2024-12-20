import { Tool } from './Tool'

export interface ColorableTool extends Tool {
  readonly color: string
  setColor( color:string ): void
}
