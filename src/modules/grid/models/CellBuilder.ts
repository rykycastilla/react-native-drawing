import { Display } from '../models'

export class CellBuilder {

  constructor(
    private readonly size: number,
    private readonly borderWidth: number,
    private readonly borderColor: string,
    private readonly display: Display,
  ) {}

  public build( x:number, y:number ) {
    this.display.frame( this.size, this.size, x, y, this.borderWidth, this.borderColor )
  }

}
