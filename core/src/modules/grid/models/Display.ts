import { Orientation } from './Orientation'

export interface Display {
  readonly RESOLUTION: number
  makeLine( orientation:Orientation, axisPos:number, width:number, color:string ): void
  clear(): void
}
