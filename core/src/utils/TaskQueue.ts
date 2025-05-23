import { Queue } from '@utils/Queue'

export abstract class TaskQueue<T extends object> {

  /** Executes event when finishes a task */
  public onfinish: ( ( args:T ) => void ) | null = null

  private readonly argsQueue = new Queue<T>()
  #isConsuming = false

  protected abstract runTask( args:T ): Promise<void>

  private handleFinish( args:T ) {
    if( this.onfinish === null ) { return }
    this.onfinish( args )
  }

  private async consume() {
    this.isConsuming = true
    while( !this.argsQueue.isEmpty ) {
      const args: T = this.argsQueue.pop()!
      await this.runTask( args )
      this.handleFinish( args )
    }
    this.isConsuming = false
  }

  public enqueueTask( args:T ) {
    this.argsQueue.push( args )
    if( !this.isConsuming ) { this.consume() }
  }

  public stopTasks() {
    while( !this.argsQueue.isEmpty ) {
      this.argsQueue.pop()
    }
  }

  get isConsuming(): boolean {
    return this.#isConsuming
  }

  private set isConsuming( isConsuming:boolean ) {
    this.#isConsuming = isConsuming
  }

}
