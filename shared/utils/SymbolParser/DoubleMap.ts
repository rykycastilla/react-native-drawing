export class DoubleMap<A,B> {

  private readonly index = new Map<A|B,A|B>()

  public set( a:A, b:B ) {
    this.index.set( a, b )
    this.index.set( b, a )
  }

  public get( a:A ): B | undefined
  public get( b:B ): A | undefined

  public get( key:A|B ) {
    return this.index.get( key )
  }

  public delete( key:A|B ) {
    return this.index.delete( key )
  }

}
