import { ColorableTool, DotPen, Eraser, EyeDropper, Filler, ITool, Pencil } from '../models'
import { exposeColorToRN, fadeColor, filterColorAlpha } from '../controllers'
import { FillerQueue, Viewport } from '../services'
import { ResizableTool, Spry, SquareDotPen, Tape, Zoom } from '../models'
import { SpryParticlesProps } from '@shared/utils/types/SpryParticlesProps'
import { Tool } from '@shared/modules/tools/models'
import { useEffect, useMemo } from 'react'
import { useFreeze } from '@hooks'

function useColorStateSetter( tool:ColorableTool, color:string ) {
  useEffect( () => {
    tool.setColor( color )
  }, [  tool, color ] )
}

function useSizeStateSetter( tool:ResizableTool, size:number ) {
  useEffect( () => {
    tool.setSize( size )
  }, [  tool, size ] )
}

type ViewportControlAllowedSetter = ( viewportControlAllowed:boolean ) => void

function useZoom( setViewportControlAllowed:ViewportControlAllowedSetter ) {
  return useMemo( () => {
    const viewport = new Viewport( setViewportControlAllowed )
    return new Zoom( viewport )
  }, [ setViewportControlAllowed ] )
}

function useEyeDropper(): EyeDropper {
  return useMemo( () => {
    return new EyeDropper( exposeColorToRN )
  }, [] )
}

function useSpry( color:string, size:number, particlesAmount:number, particlesScale:number ): Spry {

  const initColor: string = useFreeze( color )
  const initSize: number = useFreeze( size )
  const initParticlesAmount: number = useFreeze( particlesAmount )
  const initParticlesScale: number = useFreeze( particlesScale )

  const spry = useMemo( () => {
    return new Spry( initColor, initSize, initParticlesAmount, initParticlesScale )
  }, [ initColor, initSize, initParticlesAmount, initParticlesScale ] )

  useEffect( () => {
    spry.setParticlesAmount( particlesAmount )
    spry.setParticlesScale( particlesScale )
  }, [ spry, particlesAmount, particlesScale ] )

  useColorStateSetter( spry, color )
  useSizeStateSetter( spry, size )
  return spry

}

function useSquareDotPen( color:string, size:number ): SquareDotPen {

  const initColor: string = useFreeze( color )
  const initSize: number = useFreeze( size )

  const squareDotPen = useMemo( () => {
    return new SquareDotPen( initColor, initSize )
  }, [ initColor, initSize ] )

  useColorStateSetter( squareDotPen, color )
  useSizeStateSetter( squareDotPen, size )
  return squareDotPen

}

function useDotPen( color:string, size:number ): DotPen {

  const initColor: string = useFreeze( color )
  const initSize: number = useFreeze( size )

  const dotPen = useMemo( () => {
    return new DotPen( initColor, initSize )
  }, [ initColor, initSize ] )

  useColorStateSetter( dotPen, color )
  useSizeStateSetter( dotPen, size )
  return dotPen

}

function useTape( color:string, size:number ): Tape {

  const initColor: string = useFreeze( color )
  const initSize: number = useFreeze( size )

  const tape = useMemo( () => {
    return new Tape( initColor, initSize, fadeColor )
  }, [ initColor, initSize ] )

  useColorStateSetter( tape, color )
  useSizeStateSetter( tape, size )
  return tape

}

function usePencil( color:string, size:number ): Pencil {

  const initColor: string = useFreeze( color )
  const initSize: number = useFreeze( size )

  const pencil = useMemo( () => {
    return new Pencil( initColor, initSize, filterColorAlpha )
  }, [ initColor, initSize ] )

  useColorStateSetter( pencil, color )
  useSizeStateSetter( pencil, size )
  return pencil

}

function useEraser( size:number ): Eraser {
  const initSize: number = useFreeze( size )
  const eraser = useMemo( () => {
    return new Eraser( initSize )
  }, [ initSize ] )
  useSizeStateSetter( eraser, size )
  return eraser
}

function useFiller( color:string ): Filler {

  const initColor: string = useFreeze( color )

  const filler = useMemo( () => {
    const fillerQueue = new FillerQueue()
    return new Filler( initColor, fillerQueue, filterColorAlpha )
  }, [ initColor ] )

  useColorStateSetter( filler, color )
  return filler

}

interface UseToolIndexArgs {
  color: string
  size: number
  spryParticles: SpryParticlesProps
  setViewportControlAllowed( viewportControlAllowed:boolean ): void
}

export function useToolIndex( args:UseToolIndexArgs ): Record<number,ITool> {

  const { color, size, spryParticles, setViewportControlAllowed } = args
  const { amount:spryParticlesAmount, scale:spryParticlesScale } = spryParticles

  const toolIndex: Record<number,ITool> = useMemo( () => {
    return {}
  }, [] )

  toolIndex[ Tool.ZOOM ] = useZoom( setViewportControlAllowed )
  toolIndex[ Tool.EYE_DROPPER ] = useEyeDropper()
  toolIndex[ Tool.SPRY ] = useSpry( color, size, spryParticlesAmount, spryParticlesScale )
  toolIndex[ Tool.SQUARE_DOT_PEN ] = useSquareDotPen( color, size )
  toolIndex[ Tool.DOT_PEN ] = useDotPen( color, size )
  toolIndex[ Tool.TAPE ] = useTape( color, size )
  toolIndex[ Tool.PENCIL ] = usePencil( color, size )
  toolIndex[ Tool.ERASER ] = useEraser( size )
  toolIndex[ Tool.FILLER ] = useFiller( color )
  return toolIndex

}
