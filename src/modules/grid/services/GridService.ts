import { CellBuilder, Display } from '../models'

export class GridService {

  public static readonly WIDTH = 2
  public static readonly COLOR = 'black'

  constructor(
    private readonly grid: number,
    private readonly display: Display,
  ) {}

  private buildCells() {
    const cellSize: number = this.display.RESOLUTION / this.grid
    const cell = new CellBuilder( cellSize, GridService.WIDTH, GridService.COLOR, this.display )
    for( let i = 0; i < this.grid; i++ ) {
      for( let j = 0; j < this.grid; j++ ) {
        const x: number = i * cellSize,
          y = j * cellSize
        cell.build( x, y )
      }
    }
  }

  public build() {
    this.display.clear()
    this.buildCells()
  }

}
