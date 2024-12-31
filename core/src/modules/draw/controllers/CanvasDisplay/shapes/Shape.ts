export abstract class Shape {

  private wasDrawed  = false

  constructor(
    public readonly color: string,
    private readonly path = new Path2D(),
  ) {}

  protected abstract draw( path:Path2D ): void

  public render( context:CanvasRenderingContext2D ) {
    if( !this.wasDrawed ) {
      this.draw( this.path )
      this.wasDrawed = true
    }
    context.fillStyle = this.color
    context.fill( this.path )
  }

}
