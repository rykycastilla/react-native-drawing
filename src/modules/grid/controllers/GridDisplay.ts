import Expo2DContext from 'expo-2d-context'
import { Display } from '../models'

export class GridDisplay implements Display {

  public readonly RESOLUTION = 720

  constructor(
    private readonly context: Expo2DContext,
  ) {
    this.initialyze()
  }

  private initialyze() {
    this.context.setTransform( 1, 0, 0, 1, 0, 0 )
    const scale: number = this.context.width / this.RESOLUTION
    this.context.scale( scale, scale )
  }

  public frame( width:number, height:number, x:number, y:number, bold:number, color:string ) {
    this.context.beginPath()
    this.context.strokeStyle = color
    this.context.lineWidth = bold
    this.context.rect( x, y, width, height )
    this.context.stroke()
  }

  public clear() {
    this.context.clearRect( 0, 0, this.RESOLUTION, this.RESOLUTION )
    this.context.flush()
  }

  public render() {
    this.context.flush()
  }

}
