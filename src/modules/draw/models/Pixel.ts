import { Display } from '../../display/models/Display'

export class Pixel<T extends string> {

  public static readonly SIZE = 1
  #color: T | null = null

  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly display: Display,
  ) {}

  public setColor( color:T ) {
    if( this.color === color ) { return }
    this.color = color
    this.display.print( this.x, this.y, Pixel.SIZE, Pixel.SIZE, this.color )
  }

  public clear() {
    if( this.color === null ) { return }
    this.color = null
    this.display.clear( this.x, this.y, Pixel.SIZE, Pixel.SIZE )
  }

  get color(): T | null {
    return this.#color
  }

  private set color( color:T|null ) {
    this.#color = color
  }

}
