export class ColorableTool<T extends string> implements IColorableTool<T> {

  #color: T

  constructor( color:T ) {
    this.#color = color
  }

  public setColor( color:T ) {
    this.color = color
  }

  get color(): T {
    return this.#color
  }

  private set color( newColor:T ) {
    this.#color = newColor
  }

}

export interface IColorableTool<T extends string> {
  readonly color: T
  setColor( color:T ): void
}
