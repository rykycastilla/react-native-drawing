import { Display } from './Display'

export class Pixel {

  public static readonly SIZE = 1
  #color: string | null = null

  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly display: Display,
  ) {}

  public setColor( color:string ) {
    if( this.color === color ) { return }
    this.color = color
    this.display.print( this.x, this.y, Pixel.SIZE, Pixel.SIZE, this.color )
  }

  public clear() {
    if( this.color === null ) { return }
    this.color = null
    this.display.clear( this.x, this.y, Pixel.SIZE, Pixel.SIZE )
  }

  public setStateWithoutRendering( state:string|null ) {
    this.color = state
  }

  get color(): string | null {
    return this.#color
  }

  private set color( color:string|null ) {
    this.#color = color
  }

}
