import { Display, Orientation } from '../models'

export class GridService {

  public static readonly WIDTH = 2
  public static readonly COLOR = 'black'

  constructor(
    private readonly grid: number,
    private readonly display: Display,
  ) {}

  private hatch( axis:Orientation ) {
    const gridSize: number = Math.floor( this.display.RESOLUTION / this.grid )
    const lastLine: number = this.grid + 1
    for( let i = 0; i <= lastLine; i++ ) {
      const middleLine: number = Math.floor( GridService.WIDTH / 2 )
      let position: number = i * gridSize
      if( i === 0 ) { position += middleLine }
      if( i === lastLine ) { position -= middleLine }
      this.display.makeLine( axis, position, GridService.WIDTH, GridService.COLOR )
    }
  }

  public build() {
    this.display.clear()
    this.hatch( Orientation.HORIZONTAL )
    this.hatch( Orientation.VERTICAL )
  }

}
