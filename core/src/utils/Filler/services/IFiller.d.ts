import { FrameFunction } from '../models'

export interface IFiller {
  width: number
  height: number
  fill( x:number, y:number, color:string, pixelList:Uint8ClampedArray ): Promise<void> | void
  onFrame( handle:FrameFunction ): void
}
