import { Layout, Point } from '../models'

export class CoordinatesService {

  public static NULL_POINT: Point = {
    x: NaN,
    y: NaN,
  }

  private layout: Layout | null = null
  #resolutionWidth: number
  #resolutionHeight: number

  constructor( resolutionWidth:number, resolutionHeight:number ) {
    this.#resolutionWidth = resolutionWidth
    this.#resolutionHeight = resolutionHeight
  }

  private fixAxis( resolution:number, axis:number, size:number, position:number ): number {
    const scale: number = resolution / size,
      result = ( axis - position ) * scale
    return Math.round( result )
  }

  public toInternal( externalX:number, externalY:number ): Point {
    if( this.layout === null ) { return CoordinatesService.NULL_POINT }
    const { width, height, top, left } = this.layout
    const x: number = this.fixAxis( this.resolutionWidth, externalX, width, left ),
      y = this.fixAxis( this.resolutionHeight, externalY, height, top )
    return { x, y }
  }

  get resolutionWidth(): number {
    return this.#resolutionWidth
  }

  public setResolutionWidth( resolutionWidth:number ) {
    this.#resolutionWidth = resolutionWidth
  }

  get resolutionHeight(): number {
    return this.#resolutionHeight
  }

  public setResolutionHeight( resolutionHeight:number ) {
    this.#resolutionHeight = resolutionHeight
  }

  public setLayout( layout:Layout ) {
    this.layout = layout
  }

}
