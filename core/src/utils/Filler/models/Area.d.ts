export interface Area {
  extend( extraArea:number ): void
  isInside( point:Point ): boolean
}

export interface Point {
  x: number
  y: number
}
