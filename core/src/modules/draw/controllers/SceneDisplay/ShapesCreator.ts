import { Base64Display } from './Base64Display'
import { Shape } from '../shapes'

export abstract class ShapesCreator extends Base64Display {

  protected abstract shapeList: Shape[]

  protected renderShapes() {
    for( const shape of this.shapeList ) {
      shape.render( this.context )
    }
    this.shapeList = []
  }

}
