export abstract class Shape {

  private wasDrawed  = false

  constructor(
    public readonly color: string,
    private readonly path = new Path2D(),
  ) {}

  protected abstract draw( path:Path2D ): void

  private tryDraw() {
    if( !this.wasDrawed ) {
      this.draw( this.path )
      this.wasDrawed = true
    }
  }

  protected printBody( context:CanvasRenderingContext2D, path:Path2D ) {
    context.fillStyle = this.color
    context.fill( path )
  }

  public render( context:CanvasRenderingContext2D ) {
    this.tryDraw()
    this.printBody( context, this.path )
  }

}
