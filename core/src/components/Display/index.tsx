import CanvasDisplay from '@components/CanvasDisplay'
import { DrawingService } from '@draw/services'
import { ForwardedRef, forwardRef, ReactElement, useImperativeHandle } from 'react'
import { useDrawingDeps } from './hooks'
import './styles.css'

interface DisplayProps {
  resolution: number
  antialiasing: boolean
  onLoad( loaded:boolean ): void
}

const Display = forwardRef( ( props:DisplayProps, ref:ForwardedRef<DrawingService> ): ReactElement => {

  const { resolution, antialiasing, onLoad } = props
  const { loadDisplay, drawingService } = useDrawingDeps( resolution )

  useImperativeHandle( ref, () => {
    return drawingService
  }, [ drawingService ] )

  return (
    <CanvasDisplay
      className={ antialiasing ? '' : 'pixelated' }
      width={ resolution }
      height={ resolution }
      onLoad={ onLoad }
      onContextCreate={ loadDisplay } />
  )

} )

export default Display
