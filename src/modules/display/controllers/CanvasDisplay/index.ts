import Expo2DContext from 'expo-2d-context'
import { Display } from '../../models'
import { Logger } from './Logger'

export class CanvasDisplay extends Logger implements Display {

  private context: Expo2DContext | null = null

  private initialyze() {
    if( this.context === null ) { return this.logContextWarning() }
    this.context.setTransform( 1, 0, 0, 1, 0, 0 )
    const scale: number = this.context.width / 512
    this.context.scale( scale, scale )
    this.scene()
  }

  public setContext( context:Expo2DContext ) {
    this.context = context
    this.initialyze()
  }

  private scene() {
    if( this.context === null ) { return this.logContextWarning() }
    this.context.flush()
    requestAnimationFrame( () => this.scene() )
  }

  public print( x:number, y:number, width:number, height:number, color:string ) {
    if( this.context === null ) { return this.logContextWarning() }
    this.context.beginPath()
    this.context.fillStyle = color
    this.context.rect( x, y, width, height )
    this.context.fill()
  }

  public clear( x:number, y:number, size:number ) {
    if( this.context === null ) { return this.logContextWarning() }
    this.context.clearRect( x, y, size, size )
  }

}
