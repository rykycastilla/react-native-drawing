import { IDraw } from '../DrawCore'
import { View } from './View'

export class ScrollEvent {

  public readonly target: Draw
  public readonly x: number
  public readonly y: number
  public readonly scale: number
  public readonly view: View

  private constructor( target:Draw, x:number, y:number, scale:number )

}

interface Draw extends IDraw {}
