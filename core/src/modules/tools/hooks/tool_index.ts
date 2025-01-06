import { ColorableTool, DotPen, Eraser, EyeDropper, Filler, ITool, None } from '../models'
import { exposeColorToRN } from '../controllers'
import { Filler as FillerUtil } from '@utils/Filler'
import { filterColorAlpha } from '../controllers'
import { Pencil, ResizableTool, SquareDotPen, Zoom } from '../models'
import { Tool } from '@shared/modules/tools/models'
import { useEffect, useMemo } from 'react'
import { useFreeze } from '@hooks'
import { Viewport } from '../services'

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

function useNone(): None {
  return useMemo( () => {
    return new None()
  }, [] )
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
    return new Filler( initColor, FillerUtil, filterColorAlpha )
  }, [ initColor ] )

  useColorStateSetter( filler, color )
  return filler

}

interface UseToolIndexArgs {
  color: string
  size: number
  setViewportControlAllowed( viewportControlAllowed:boolean ): void
}

export function useToolIndex( args:UseToolIndexArgs ): Record<number,ITool> {

  const { color, size, setViewportControlAllowed } = args

  const toolIndex: Record<number,ITool> = useMemo( () => {
    return {}
  }, [] )

  toolIndex[ Tool.NONE] = useNone()
  toolIndex[ Tool.ZOOM ] = useZoom( setViewportControlAllowed )
  toolIndex[ Tool.EYE_DROPPER ] = useEyeDropper()
  toolIndex[ Tool.SQUARE_DOT_PEN ] = useSquareDotPen( color, size )
  toolIndex[ Tool.DOT_PEN ] = useDotPen( color, size )
  toolIndex[ Tool.PENCIL ] = usePencil( color, size )
  toolIndex[ Tool.ERASER ] = useEraser( size )
  toolIndex[ Tool.FILLER ] = useFiller( color )
  return toolIndex

}
