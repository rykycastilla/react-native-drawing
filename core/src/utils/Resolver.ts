export class Resolver<T> {

  public resolve!: ( data:T ) => void
  public reject!: ( err:Error ) => void
  public readonly promise: Promise<T>

  constructor() {
    this.promise = new Promise<T>( ( resolve, reject ) => {
      this.resolve = resolve
      this.reject = reject
    } )
  }

}
