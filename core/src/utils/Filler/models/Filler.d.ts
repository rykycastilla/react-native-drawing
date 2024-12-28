import { BinImage } from './BinImage'

export interface Filler<T extends unknown[]> {
  fill( ...args:T ): Promise<void>
  onFrame( handle:FrameFunction ): void
}

export interface FrameFunction {
  ( image:BinImage, isLatest:boolean ): void
}
