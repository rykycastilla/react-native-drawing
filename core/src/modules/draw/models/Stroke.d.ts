export interface Stroke<T extends object> {
  currentProps: T
  stop(): void
  addPoint( x:number, y:number ): void
  createSection( props:T ): void
  onStop( handle:( () => void ) ): void
}
