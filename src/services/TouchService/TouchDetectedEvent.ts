import { TouchEvent } from './TouchEvent'

export class TouchDetectedEvent extends TouchEvent {
  constructor(
    targetId:symbol,
    public readonly x: number,
    public readonly y: number,
  ) {
    super( targetId )
  }
}
