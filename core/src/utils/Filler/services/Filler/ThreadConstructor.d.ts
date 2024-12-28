import { FrameDTO } from '../FrameDTO.js'
import { StartDTO } from '../StartDTO.js'
import { Thread } from '../Thread.js'

export interface ThreadConstructor {
  new (): Thread<StartDTO,FrameDTO>
}
