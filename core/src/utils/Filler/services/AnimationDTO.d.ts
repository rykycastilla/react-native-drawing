interface FrameDTO {
  target: 'frame'
  width: number
  height: number
  pixelListBuffer: ArrayBuffer
}

interface FinishDTO {
  target: 'finish'
}

export type AnimationDTO = FrameDTO | FinishDTO
