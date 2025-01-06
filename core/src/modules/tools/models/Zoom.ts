import { Tool } from './Tool'

export class Zoom implements Tool {

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
