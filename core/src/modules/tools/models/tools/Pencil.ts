import { ColorFilter } from '../ColorFilter'
import { ColorableTool } from '../ColorableTool'
import { DrawingScene, Stroke, StrokeProps } from '@draw/models'
import { ResizableTool } from '../ResizableTool'
import { StrokeTool } from './StrokeTool'

export class Pencil extends StrokeTool<StrokeProps> implements ColorableTool, ResizableTool {

  private readonly props: StrokeProps

  constructor(
    color:string, size:number,
    private readonly filterColor: ColorFilter,
  ) {
    super()
    const filteredColor: string = this.filterColor( color )
    this.props = { color:filteredColor, width:size }
  }

  /** @protected */
  override createStroke( x:number, y:number, scene:DrawingScene ): Stroke<StrokeProps> {
    return scene.createStroke( x, y, { color:this.color, width:this.size } )
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
    const filteredColor: string = this.filterColor( color )
    this.props.color = filteredColor
  }

  get size(): number {
    return this.props.width
  }

  public setSize( size:number ) {
    this.props.width = size
  }

}
