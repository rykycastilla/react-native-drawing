export class MessageManager {

  private callback: MessageCallback | null = null

  public receive( message:string ) {
    if( this.callback === null ) { return }
    this.callback( message )
  }

  public suscribe( callback:MessageCallback ) {
    this.callback = callback
  }

}

interface MessageCallback {
  ( message:string ): void
}
