import { DrawingBoard } from '@draw/models'
import { ColorableTool } from '../ColorableTool'
import { ResizableTool } from '../ResizableTool'
import { Tool } from './Tool'

export class Tape extends Tool implements ColorableTool, ResizableTool {

  public static readonly COLOR_FADING_PERCENTAGE = 10
  private readonly latestPixelIndex: Record<symbol,Pixel> = {}
  #color!: string
  #size: number

  constructor(
    color:string, size:number,
    private readonly fadeColor: FadeColorFunction,
  ) {
    super()
    this.color = color
    this.#size = size
  }

  override addStrokePoint( x:number, y:number, strokeId:symbol, board:DrawingBoard ) {
    const latestPixel: Pixel | undefined = this.latestPixelIndex[ strokeId ]
    const newPixel: Pixel = [ x, y ]
    this.latestPixelIndex[ strokeId ] = newPixel
    if( latestPixel === undefined ) { return }
    board.printLine( this.color, this.size, latestPixel, newPixel )
  }

  override endShapeStroke( x:number, y:number, strokeId:symbol, board:DrawingBoard ) {
    const [ latestX, latestY ] = this.latestPixelIndex[ strokeId ] ?? []
    if( ( latestX === undefined ) || ( latestY === undefined ) ) { return }
    if( ( latestX !== x ) || ( latestY !== y ) ) {
      board.printLine( this.color, this.size, [ latestX, latestY ], [ x, y ] )
    }
    delete this.latestPixelIndex[ strokeId ]
  }

  get color(): string {
    return this.#color
  }

  private set color( color:string ) {
    const fadedColor: string = this.fadeColor( color, Tape.COLOR_FADING_PERCENTAGE )
    this.#color = fadedColor
  }

  public setColor( color:string ) {
    this.color = color
  }

  get size(): number {
    return this.#size
  }

  public setSize( size:number ) {
    this.#size = size
  }

}

type Pixel = [ x:number, y:number ]

interface FadeColorFunction {
  ( color:string, fadePercentage:number ): string
}
