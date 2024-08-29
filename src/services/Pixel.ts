import { Display } from './Display'

export class Pixel {

  constructor(
    public readonly x: number,
    public readonly y: number,
    private readonly size: number,
    private readonly display: Display,
  ) {}

  public print( color:string ) {
    this.display.printPixel( this.x, this.y, this.size, color )
  }

}
