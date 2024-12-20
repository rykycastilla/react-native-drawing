import { Stroke } from '../Stroke'

export class StrokeManager<T extends Stroke<object>> {

  readonly #keyList = new Set<symbol>()
  private readonly strokeIndex: Record<symbol,T> = {}

  constructor(
    private readonly Stroke: StrokeConstructor<T>,
  ) {}

  public genStroke( x:number, y:number, props:StrokeProps<T>, context:CanvasRenderingContext2D ): T {
    const stroke = new this.Stroke( x, y, props, context )
    const strokeKey = Symbol()
    this.#keyList.add( strokeKey )
    this.strokeIndex[ strokeKey ] = stroke
    stroke.onStop( () => {
      this.#keyList.delete( strokeKey )
      delete this.strokeIndex[ strokeKey ]
    } )
    return stroke
  }

  public getStroke( strokeKey:symbol ): T | null {
    const stroke: T | undefined = this.strokeIndex[ strokeKey ]
    if( stroke === undefined ) { return null }
    return stroke
  }

  get keyList(): Set<symbol> {
    return this.#keyList
  }

}

type StrokeProps<T extends Stroke<object>> = T extends Stroke<infer U> ? U : never

interface StrokeConstructor<T extends Stroke<object>> {
  new ( x:number, y:number, props:StrokeProps<T>, context:CanvasRenderingContext2D ): T
}

