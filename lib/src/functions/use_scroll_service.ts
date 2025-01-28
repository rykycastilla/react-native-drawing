import { Draw } from '../types/Draw'
import { ScrollService } from '../services'

interface Props {
  width: number
  aspectRatio: number
}

const propsIndex = new WeakMap<ScrollService,Props>()

export function useScrollService( target:Draw, width:number, aspectRatio:number ): ScrollService
export function useScrollService( width:number, aspectRatio:number, scrollService:ScrollService ): void

export function useScrollService( ...args:unknown[] ): ScrollService | undefined {

  if( typeof args[ 0 ] === 'object' ) {
    const [ target, width, aspectRatio ] = args as [ Draw, number, number ]
    const height: number = width / aspectRatio
    const scrollService = new ScrollService( target, { width, height } )
    propsIndex.set( scrollService, { width, aspectRatio } )
    return scrollService
  }

  else {
    const [ width, aspectRatio, scrollService ] = args as [ number, number, ScrollService ]
    const props: Props | undefined = propsIndex.get( scrollService )
    if( props === undefined ) { return }
    if( ( width !== props.width ) || ( aspectRatio !== props.aspectRatio ) ) {
      propsIndex.set( scrollService, { width, aspectRatio } )
      const height: number = width / aspectRatio
      scrollService.setContainer( { width, height } )
    }
  }

}
