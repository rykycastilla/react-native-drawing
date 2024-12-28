function runFrame(): Promise<void> {
  return new Promise<void>( ( resolve ) => {
    requestAnimationFrame( () => resolve() )
  } )
}

/**
 * @param frames - Frames amount to test (Higher values increase precision but latency too)
 * @return Average time lapse between screen frames
*/
export async function requestFrameSpeed( frames = 1 ): Promise<number> {
  let sum = 0
  for( let i = 0; i < frames; i++ ) {
    const start: number = Date.now()
    await runFrame()
    sum += Date.now() - start
  }
  const avergae: number = sum / frames
  return Math.round( avergae )
}
