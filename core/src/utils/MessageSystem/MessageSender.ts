export abstract class MessageSender {

  constructor(
    private readonly sendMessage: MessageEmitter,
  ) {}

  public postMessage( target:string, data:unknown ) {
    this.sendMessage( target, data )
  }

}

export interface MessageEmitter {
  ( target:string, data:unknown ): void
}
