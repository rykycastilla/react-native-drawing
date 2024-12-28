import { BinImage } from './BinImage'
import { Stroke } from './Stroke'

export interface DrawingBoard {
  createStroke( x:number, y:number, props:StrokeProps ): Stroke<StrokeProps>
  createClearPath( x:number, y:number, props:ClearPathProps ): Stroke<ClearPathProps>
  getBinaryData(): BinImage
  setBinaryData( image:BinData ): void
}

export interface StrokeProps {
  color: string
  width: number
}

export interface ClearPathProps {
  width: number
}
