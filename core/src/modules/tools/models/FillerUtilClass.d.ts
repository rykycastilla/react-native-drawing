import { BinImage } from '@draw/models'

export interface FillerUtilClass {
  new ( width:number, height:number ): FillerUtil
}

interface FrameFunction {
  ( image:BinImage ): void
}

interface FillerUtil {
  fill( x:number, y:number, color:string, pixelList:Uint8ClampedArray ): Promise<void>
  onFrame( handle:Framefunction ): void
}

