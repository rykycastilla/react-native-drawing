import { DotsCreator } from './DotsCreator'
import { Line } from '../shapes'

export abstract class LinesCreator extends DotsCreator {
  public printLine( color:string, width:number, init:Pixel, end:Pixel ) {
    const [ initX, initY ] = init
    const line = new Line( color, width, initX, initY )
    const [ endX, endY ] = end
    line.setEnd( endX, endY )
    this.shapeList.push( line )
  }
}

type Pixel = [ x:number, y:number ]
