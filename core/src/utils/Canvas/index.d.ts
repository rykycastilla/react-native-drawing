interface CanvasConstructor {
  new ( width:number, height:number ): OffscreenCanvas | HTMLCanvasElement
}

export const Canvas: CanvasConstructor
export type CanvasContext = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D
