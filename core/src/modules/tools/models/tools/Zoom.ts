import { ITool } from '../ITool'

export class Zoom implements ITool {

  constructor(
    private readonly view: TouchableView,
  ) {}

  public prepareToUse() {
    this.view.enableControl()
  }

  public addStrokePoint() {}

  public endShapeStroke() {}

  public stopUsing() {
    this.view.unableControl()
  }

}

export interface TouchableView {
  enableControl(): void
  unableControl(): void
}
