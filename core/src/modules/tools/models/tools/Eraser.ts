import { ClearPathProps, DrawingBoard, Stroke } from '@draw/models'
import { ResizableTool } from '../ResizableTool'
import { StrokeTool } from './StrokeTool'

export class Eraser extends StrokeTool<ClearPathProps> implements ResizableTool {

  private readonly props: ClearPathProps

  constructor( size:number ) {
    super()
    this.props = { width:size }
  }

  /** @protected */
  override createStroke( x:number, y:number, board:DrawingBoard ): Stroke<ClearPathProps> {
    return board.createClearPath( x, y, { width:this.size } )
  }

  /** @protected */
  override updateProps( stroke:Stroke<ClearPathProps> ) {
    const { width:strokeSize } = stroke.currentProps
    if( this.size !== strokeSize ) {
      stroke.createSection( { width:this.size } )
    }
  }

  get size(): number {
    return this.props.width
  }

  public setSize( size:number ) {
    this.props.width = size
  }

}
