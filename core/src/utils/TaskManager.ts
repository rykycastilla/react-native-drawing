/**
 * Creates, stores and finish tasks
 * A 'task' is an object that stores a worker and a 'terminated'
 * avoid direct 'termination' in workers created by this object
*/
export class TaskManager {

  private readonly taskIndex = new Map<Promise<void>,TaskData>()

  constructor(
    private readonly Worker: WorkerConstructor,
  ) {}

  public create(): Task {
    const thread = new this.Worker()
    let terminate = () => {}
    const terminated = new Promise<void>( ( resolve ) => terminate = resolve )
    const data: TaskData = { thread, terminate }
    this.taskIndex.set( terminated, data )
    return { thread, terminated }
  }

  /**
   * Terminates tasks created by it (usin its promise)
  */
  public terminate( terminated:Promise<void> ) {
    const data: TaskData | undefined = this.taskIndex.get( terminated )
    if( data === undefined ) { return }
    this.taskIndex.delete( terminated )
    const { thread, terminate } = data
    thread.terminate()
    terminate()
  }

}

interface TaskData {
  thread: Worker
  terminate(): void
}

interface WorkerConstructor {
  new (): Worker
}

interface Task {
  thread: Worker
  terminated: Promise<void>
}
