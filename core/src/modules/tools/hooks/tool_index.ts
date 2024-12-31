import { DotPen, Eraser, Filler, None, Pencil, SquareDotPen } from '../models'
import { ToolIndex } from '../services'
import { useDotPen } from './dot_pen'
import { useEraser } from './eraser'
import { useFiller } from './filler'
import { useMemo } from 'react'
import { useNone } from './none'
import { usePencil } from './pencil'
import { useSquareDotPen } from './square_dot_pen'

export function useToolIndex( defaultToolColor:string, defaultToolSize:number ): ToolIndex {
  const none: None = useNone()
  const squareDotPen: SquareDotPen = useSquareDotPen( defaultToolColor, defaultToolSize )
  const dotPen: DotPen = useDotPen( defaultToolColor, defaultToolSize )
  const pencil: Pencil = usePencil( defaultToolColor, defaultToolSize )
  const eraser: Eraser = useEraser( defaultToolSize )
  const filler: Filler = useFiller( defaultToolColor )
  return useMemo( () => {
    return new ToolIndex( none, squareDotPen, dotPen, pencil, eraser, filler )
  }, [ none, squareDotPen, dotPen, pencil, eraser, filler ] )
}
