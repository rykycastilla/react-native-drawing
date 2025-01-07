import { BinaryDisplay } from './BinaryDisplay'
import { Shape } from './shapes'

export abstract class ShapesCreator extends BinaryDisplay {

  protected abstract shapeList: Shape[]

  protected renderShapes() {
    for( const shape of this.shapeList ) {
      shape.render( this.context )
    }
    this.shapeList = []
  }

}
