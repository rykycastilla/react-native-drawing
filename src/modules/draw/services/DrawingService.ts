import { Matrix, Stroke } from '../models'
import { Tool } from '../../tools/models'

export class DrawingService {

  private readonly strokeIndex: Record<symbol,Stroke> = {}

  constructor(
    private readonly matrix:Matrix,
  ) {}

  public stopStroke( strokeId:symbol ) {
    delete this.strokeIndex[ strokeId ]
  }

  public use( strokeId:symbol, column:number, row:number, tool:Tool ) {
    const stroke: Stroke = this.strokeIndex[ strokeId ] ?? new Stroke( this.matrix )
    const x: number = column,
      y = row
    tool = tool.clone()
    stroke.addPoint( { x, y, tool } )
    this.strokeIndex[ strokeId ] = stroke
  }

}
