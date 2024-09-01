export class ColorableTool implements IColorableTool {

  #color: string

  constructor( color:string ) {
    this.#color = color
  }

  public setColor( color:string ) {
    this.color = color
  }

  get color(): string {
    return this.#color
  }

  private set color( newColor:string ) {
    this.#color = newColor
  }

}

export interface IColorableTool {
  readonly color: string
  setColor( color:string ): void
}
