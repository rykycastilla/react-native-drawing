export class Touch {

  public readonly id = Symbol()
  #x: number
  #y: number

  constructor(
    x:number, y:number,
    public readonly minProgress: number,
  ) {
    this.#x = x
    this.#y = y
  }

  private checkHasMinDistance( x:number, y:number ): boolean {
    const distance: number = Touch.calcDistance( this.x, this.y, x, y )
    return distance >= this.minProgress
  }

  public setPosition( x:number, y:number ): boolean {
    const hasMinProgress: boolean = this.checkHasMinDistance( x, y )
    if( hasMinProgress ) {
      this.x = x
      this.y = y
    }
    return hasMinProgress
  }

  get x(): number {
    return this.#x
  }

  private set x( newX:number ) {
    this.#x = newX
  }

  get y(): number {
    return this.#y
  }

  private set y( newY:number ) {
    this.#y = newY
  }

  public static calcDistance( x1:number, y1:number, x2:number, y2:number ): number {
    return Math.sqrt( ( x1 - x2 ) ** 2 + ( y1 - y2 ) ** 2 )
  }

  public static calcMinProgress( width:number, height:number ): number {
    const referenceSide: number = Math.min( width, height )
    return referenceSide * 0.01
  }

}
