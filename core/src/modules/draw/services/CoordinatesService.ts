import { Layout, Point } from '../models'

export class CoordinatesService {

  public static NULL_POINT: Point = {
    x: NaN,
    y: NaN,
  }

  private layout: Layout | null = null

  constructor(
    private readonly resolutionWidth: number,
    private readonly resolutionHeight: number,
  ) {}

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

  public setLayout( layout:Layout ) {
    this.layout = layout
  }

}
