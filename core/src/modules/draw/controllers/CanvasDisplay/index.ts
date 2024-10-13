import { Display } from '../../models'
import { Logger } from './Logger'
import { Verbose } from '@utils/Logger'

export class CanvasDisplay extends Logger implements Display {

  private context: CanvasRenderingContext2D | null = null

  constructor( verbose:Verbose ) {
    super( verbose )
  }

  public setContext( context:CanvasRenderingContext2D ) {
    this.context = context
    this.scene()
  }

  private scene() {
    if( this.context === null ) { return this.logContextWarning() }
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
