import { Tool } from './Tool'

export class None implements Tool {
  public prepareToUse() {}
  addStrokePoint() {}
  endShapeStroke() {}
  stopUsing() {}
}
