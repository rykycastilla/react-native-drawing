import { DotPen } from './DotPen'

export class SquareDotPen extends DotPen {
  constructor( color:string, size:number ) {
    super( color, size, true )
  }
}
