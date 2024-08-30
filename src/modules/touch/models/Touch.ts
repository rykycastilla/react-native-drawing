export class Touch {

  public readonly id = Symbol()
  #x: number
  #y: number

  constructor( x:number, y:number ) {
    this.#x = x
    this.#y = y
  }

  public setPosition( x:number, y:number ) {
    this.x = x
    this.y = y
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

}
