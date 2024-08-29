import { Interpolator } from './Interpolator'
import { Matrix } from '../Matrix'
import { Point } from './Point'
import { StrokePoint } from './StrokePoint'
import { Tool } from '../tools'

export class Stroke<T extends string> extends Interpolator {

  public static readonly MAX_POINTS = 2
  private readonly content: StrokePoint<T>[] = []
  #currentTool: Tool<T> | null = null

  constructor(
    private readonly matrix: Matrix<T>,
  ) {
    super( ( point:Point ) => this.paint( point ) )
  }

  private design() {
    const [ a, b = a ] = this.content
    if( ( a === undefined ) || ( b === undefined ) ) { return }
    this.currentTool = a.tool.clone()
    this.interpolate( a, b )
  }

  private paint( point:Point ) {
    const { x, y } = point
    this.currentTool!.use( x, y, this.matrix )
  }

  public addPoint( item:StrokePoint<T> ) {
    this.content.push( item )
    const length: number = this.content.length
    if( length > Stroke.MAX_POINTS ) { this.content.shift() }
    this.design()
  }

  private get currentTool(): Tool<T> | null {
    return this.#currentTool
  }

  private set currentTool( newCurrentTool:Tool<T> ) {
    this.#currentTool = newCurrentTool
  }

}
