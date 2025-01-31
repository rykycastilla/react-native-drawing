import { Point } from '../models'

export class CoordinatesService {

  #layout: number
  #resolution: number

  constructor( layout:number, resolution:number ) {
    this.#layout = layout
    this.#resolution = resolution
  }

  private fix( value:number ) {
    const result: number = value / this.layout * this.resolution
    return Math.round( result )
  }

  public toInternal( externalX:number, externalY:number ): Point {
    const x = this.fix( externalX )
    const y = this.fix( externalY )
    return { x, y }
  }

  get layout(): number {
    return this.#layout
  }

  public setLayout( layout:number ) {
    this.#layout = layout
  }

  get resolution(): number {
    return this.#resolution
  }

  public setResolution( resolution:number ) {
    this.#resolution = resolution
  }

}
