import { Display, Orientation } from '../models'

export class GridService {

  public static readonly WIDTH = 2
  public static readonly COLOR = 'black'

  constructor(
    private readonly grid: number,
    private readonly display: Display,
  ) {}

  private hatch( axis:Orientation ) {
    const gridSize: number = this.display.RESOLUTION / this.grid,
      lastLine = this.grid,
      middleLine = GridService.WIDTH / 2
    for( let i = 0; i <= lastLine; i++ ) {
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
