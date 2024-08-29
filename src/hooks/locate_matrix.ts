import { MutableRefObject, useState } from 'react'
import { View } from 'react-native'

interface UsePositionResult {
  matrixX: number
  matrixY: number
  setPosition( matrixX:number, matrixY:number ): void
}

function usePosition(): UsePositionResult {

  const [ matrixX, setMatrixX ] = useState( 0 )
  const [ matrixY, setMatrixY ] = useState( 0 )

  const setPosition = ( matrixX:number, matrixY:number ) => {
    setMatrixX( matrixX )
    setMatrixY( matrixY )
  }

  return { matrixX, matrixY, setPosition }

}

interface UseLocateMatrixResult {
  matrixX: number
  matrixY: number
  onLayout(): void
}

export function useLocateMatrix( matrixRef:MutableRefObject<View|null> ): UseLocateMatrixResult {

  const { matrixX, matrixY, setPosition } = usePosition()

  const onLayout = () => {
    const matrix: View | null = matrixRef.current
    if( matrix === null ) { return }
    matrix.measure( ( x:number, y:number, width:number, height:number, pageX:number, pageY:number ) => {
      setPosition( pageX, pageY )
    } )
  }

  return { matrixX, matrixY, onLayout }

}
