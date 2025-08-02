import { INIT_MESSAGE_SYSTEM } from '@shared/constants'
import { MessageSystem, MessageEventSubscriber, SendDataFunction } from '@shared/utils/MessageSystem'

export class RNBridge extends MessageSystem {

  private static instance: RNBridge | null = null
  private readonly sendRaw: SendDataFunction
  private isNativePrepared = false

  private constructor( subscriber:MessageEventSubscriber, sender:SendDataFunction ) {
    super( subscriber, sender )
    this.sendRaw = sender
  }

  /**
   * Prepares the native side by sending the initialization message.
   * This method only will be executed once.
   */
  public prepareNativeSide(): void {
    if( !this.isNativePrepared ) {
      this.sendRaw( INIT_MESSAGE_SYSTEM )
      this.isNativePrepared = true
    }
  }

  /**
   * Gets the singleton instance of RNBridge.
   *
   * @param subscriber - Message event subscriber function (only used on first call)
   * @param sender - Send data function (only used on first call)
   * @returns The singleton instance of RNBridge
   *
   * @remarks
   * This method implements the singleton pattern. The subscriber and sender parameters
   * are only used during the first call to create the instance. Subsequent calls
   * will ignore these parameters and return the existing instance.
   */
  public static getInstance( subscriber:MessageEventSubscriber, sender:SendDataFunction ): RNBridge {
    if( RNBridge.instance === null ) {
      RNBridge.instance = new RNBridge( subscriber, sender )
    }
    return RNBridge.instance
  }

}
