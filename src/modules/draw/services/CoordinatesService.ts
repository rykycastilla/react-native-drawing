import { Layout, Point } from '../models'

export class CoordinatesService {

  public static NULL_POINT: Point = {
    x: NaN,
    y: NaN,
  }

  private layout: Layout | null = null

  constructor(
    private readonly resolution: number,
  ) {}

  private fixAxis( axis:number, size:number, position:number ): number {
    const scale: number = this.resolution / size,
      result = ( axis - position ) * scale
    return Math.round( result )
  }

  public toInternal( externalX:number, externalY:number ): Point {
    if( this.layout === null ) { return CoordinatesService.NULL_POINT }
    const { width, height, top, left } = this.layout
    const x: number = this.fixAxis( externalX, width, left ),
      y = this.fixAxis( externalY, height, top )
    return { x, y }
  }

  public setLayout( layout:Layout ) {
    this.layout = layout
  }

}
