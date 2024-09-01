import { ExpoWebGLRenderingContext, GLView } from 'expo-gl'
import { ReactElement, useEffect } from 'react'

interface GLDisplayProps {
  style: object[] | object
  onLoad( loaded:boolean ): void
  onContextCreate( gl:ExpoWebGLRenderingContext ): void
}

const GLDisplay = ( props:GLDisplayProps ): ReactElement => {

  const { style, onLoad, onContextCreate } = props

  useEffect( () => {
    onLoad( false )
  }, [ onLoad ] )

  const _onContextCreate = ( gl:ExpoWebGLRenderingContext ) => {
    onContextCreate( gl )
    onLoad( true )
  }

  return <GLView style={ style } onContextCreate={ _onContextCreate } />

}

export default GLDisplay
