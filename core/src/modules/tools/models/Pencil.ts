import { ColorableTool } from './ColorableTool'
import { DrawingBoard, Stroke, StrokeProps } from '@draw/models'
import { ResizableTool } from './ResizableTool'
import { StrokeTool } from './StrokeTool'

export class Pencil extends StrokeTool<StrokeProps> implements ColorableTool, ResizableTool {

  private readonly props: StrokeProps

  constructor( color:string, size:number ) {
    super()
    this.props = { color, width:size }
  }

  /** @protected */
  override createStroke( x:number, y:number, board:DrawingBoard ): Stroke<StrokeProps> | null {
    return board.createStroke( x, y, { color:this.color, width:this.size } )
  }

  /** @protected */
  override updateProps( stroke:Stroke<StrokeProps> ) {
    const { color:strokeColor, width:strokeSize } = stroke.currentProps
    if( ( this.color !== strokeColor ) || ( this.size !== strokeSize ) ) {
      stroke.createSection( { color:this.color, width:this.size } )
    }
  }

  get color(): string {
    return this.props.color
  }

  public setColor( color:string ) {
    this.props.color = color
  }

  get size(): number {
    return this.props.width
  }

  public setSize( size:number ) {
    this.props.width = size
  }

}
