import { BinImage } from './BinImage'
import { Stroke } from './Stroke'

/**
 * An interface representing an object that performs graphicall and drawing actions
 * in every display frame
*/
export interface DrawingScene {
  width: number
  height: number
  image: string
  setImage( image:string ): Promise<void>
  createDot( x:number, y:number, width:number, color:string, isSquare:boolean ): void
  printLine( color:string, width:number, init:Pixel, end:Pixel ): void
  createStroke( x:number, y:number, props:StrokeProps ): Stroke<StrokeProps>
  createClearPath( x:number, y:number, props:ClearPathProps ): Stroke<ClearPathProps>
  getBinaryData(): BinImage
  setBinaryData( image:BinImage ): void
  waitNextFrame(): Promise<void>
}

type Pixel = [ x:number, y:number ]

export interface StrokeProps {
  color: string
  width: number
}

export interface ClearPathProps {
  width: number
}
