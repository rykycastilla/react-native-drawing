import CanvasDisplay from '@components/CanvasDisplay'
import { DrawingService } from '@draw/services'
import { ForwardedRef, forwardRef, ReactElement, useImperativeHandle } from 'react'
import { useDrawingDeps } from './hooks'
import './styles.css'

interface DisplayProps {
  resolution: number
  aspectRatio: number
  antialiasing: boolean
  onLoad( loaded:boolean ): void
}

const Display = forwardRef( ( props:DisplayProps, ref:ForwardedRef<DrawingService> ): ReactElement => {

  const { resolution, aspectRatio, antialiasing, onLoad } = props
  const resolutionHeight: number = Math.round( resolution / aspectRatio )
  const { loadDisplay, drawingService } = useDrawingDeps( resolution, resolutionHeight )

  useImperativeHandle( ref, () => {
    return drawingService
  }, [ drawingService ] )

  return (
    <CanvasDisplay
      className={ antialiasing ? '' : 'pixelated' }
      resolution={ resolution }
      aspectRatio={ aspectRatio }
      onLoad={ onLoad }
      onCanvasCreate={ loadDisplay } />
  )

} )

export default Display
