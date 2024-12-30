import { AnimationDTO } from '../AnimationDTO'
import { ControlDTO } from '../ControlDTO'
import { Thread } from '../Thread'

export interface TaskManager {
  create(): Task
  terminate( terminated:Promise<void> )
}

interface Task {
  thread: Thread<ControlDTO,AnimationDTO>
  terminated: Promise<void>
}
