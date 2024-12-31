import { BinImage, ClearPathProps, DrawingBoard, StrokeProps } from '../../models'
import { ClearPath } from './ClearPath'
import { DotsCreator } from './DotsCreator'
import { DrawingStroke } from './DrawingStroke'
import { EmptyDisplay } from './EmptyDisplay'
import { Shape } from './shapes'
import { StrokeManager } from './StrokeManager'

export class CanvasDisplay extends DotsCreator implements DrawingBoard {

  private readonly strokeManager = new StrokeManager<DrawingStroke>( DrawingStroke )
  private readonly clearPathManager = new StrokeManager<ClearPath>( ClearPath )
  override shapeList: Shape[] = []
  private binImage: BinImage | null = null

  constructor(
    private readonly canvas: HTMLCanvasElement,
  ) {
    const context: CanvasRenderingContext2D = canvas.getContext( '2d' )!
    super( context )
    this.scene()
  }

  private cleanStrokes() {
    for( const strokeKey of this.strokeManager.keyList ) {
      const stroke: DrawingStroke = this.strokeManager.getStroke( strokeKey )!
      stroke.stop()
    }
    for( const clearPathKey of this.clearPathManager.keyList ) {
      const path: ClearPath = this.clearPathManager.getStroke( clearPathKey )!
      path.stop()
    }
  }

  private renderImage( image:BinImage ) {
    this.cleanStrokes()
    const { width, height, pixelList } = image
    const imageData = new ImageData( pixelList, width, height )
    this.context.putImageData( imageData, 0, 0 )
  }

  private render() {
    for( const strokeKey of this.strokeManager.keyList ) {
      const stroke: DrawingStroke = this.strokeManager.getStroke( strokeKey )!
      stroke.render()
    }
    for( const clearPathKey of this.clearPathManager.keyList ) {
      const path: ClearPath = this.clearPathManager.getStroke( clearPathKey )!
      path.render()
    }
    for( const shape of this.shapeList ) {
      shape.render( this.context )
    }
    this.shapeList = []
  }

  private scene() {
    if( this.binImage !== null ) {
      this.renderImage( this.binImage )
      this.binImage = null
    }
    else {
      this.render()
    }
    requestAnimationFrame( () => this.scene() )
  }

  public createStroke( x:number, y:number, props:StrokeProps ): DrawingStroke {
    const stroke: DrawingStroke = this.strokeManager.genStroke( x, y, props, this.context )
    return stroke
  }

  public createClearPath( x:number, y:number, props:ClearPathProps ): ClearPath {
    const path: ClearPath = this.clearPathManager.genStroke( x, y, props, this.context )
    return path
  }

  public getBinaryData(): BinImage {
    const { width, height } = this.canvas
    const { data:pixelList } = this.context.getImageData( 0, 0, width, height )
    return { width, height, pixelList }
  }

  public setBinaryData( image:BinImage ) {
    this.binImage = image
  }

  public static createEmpty(): EmptyDisplay {
    return new EmptyDisplay()
  }

}
