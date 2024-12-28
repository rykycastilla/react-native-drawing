import { AnimationDTO } from '../AnimationDTO.d.ts'
import { StartDTO } from '../StartDTO.d.ts'
import { Thread } from '../Thread.d.ts'

export interface ThreadConstructor {
  new (): Thread<StartDTO,AnimationDTO>
}
