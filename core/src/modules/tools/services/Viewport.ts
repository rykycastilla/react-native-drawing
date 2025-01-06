import { TouchableView } from '../models'

export class Viewport implements TouchableView {

  constructor(
    private readonly setViewportControlAllowed: ViewportControlAllowedSetter,
  ) {}

  public enableControl() {
    this.setViewportControlAllowed( true )
  }

  public unableControl() {
    this.setViewportControlAllowed( false )
  }

}

interface ViewportControlAllowedSetter {
  ( viewportControlAllowed:boolean ): void
}
