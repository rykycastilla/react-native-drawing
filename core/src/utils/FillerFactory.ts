import { DynamicFiller, Filler, IFiller } from '@utils/Filler'
import { HeadlessCanvasFactory } from '@utils/HeadlessCanvasFactory'

export class FillerFactory {

  private constructor() {}

  public static createInstance( width:number, height:number, animated:boolean ): IFiller {
    // Only Modern API (OffscreenCanvas) can be used with parallel processing (web workers implementation of `DynamicFiller`)
    const canBeUsedParallel = HeadlessCanvasFactory.checkModernImpl()
    if( animated && canBeUsedParallel ) { return new DynamicFiller( width, height ) }
    // Using Single thread filler
    return new Filler( width, height )
  }

}
