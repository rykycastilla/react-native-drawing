import { CursorController } from '../controllers'
import { MutableRefObject, useEffect, useMemo, useState } from 'react'

export function useCursor(
  isAvailable:boolean, size:number, elementRef:MutableRefObject<HTMLElement|null>,
) {

  const [ element, setElement ] = useState<HTMLElement|null>( null )

  // Extracting HTML Element
  useEffect( () => {
    const element: HTMLElement | null = elementRef.current
    if( element === null ) { return }
    setElement( element )
  }, [ elementRef ] )

  // Creating cursor controller
  const cursor = useMemo( () => {
    if( element === null ) { return null }
    return new CursorController( isAvailable, size, element )
  }, [ element ] )  // eslint-disable-line

  // Updating parameters
  useEffect( () => {
    if( cursor === null ) { return }
    cursor.setIsAvailable( isAvailable )
    cursor.setSize( size )
  }, [ cursor, isAvailable, size ] )

  // Cleaning up
  useEffect( () => {
    if( cursor === null ) { return }
    return () => cursor.destroy()
  }, [ cursor ] )

}
