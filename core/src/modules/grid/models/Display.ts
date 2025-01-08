import { Orientation } from './Orientation'

export interface Display {
  width: number
  height: number
  makeLine( orientation:Orientation, axisPos:number, width:number, color:string ): void
  clear(): void
}
