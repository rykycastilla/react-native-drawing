import { getOps } from '@utils/get_ops'
import { requestFrameSpeed } from '@utils/request_frame_speed'

/**
 * @param { number } framesTest
 * @returns { Promise<number> }
*/
export async function calcIdealArea( framesTest ) {
  const frameLapse = await requestFrameSpeed( framesTest )
  const operationsPerFrame = getOps( frameLapse )
  const idealArea = Math.round( operationsPerFrame )
  return idealArea
}
