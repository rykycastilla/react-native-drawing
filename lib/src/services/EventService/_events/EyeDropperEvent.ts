import { Draw } from '../Draw'

export class EyeDropperEvent {
  constructor(
    public readonly target: Draw,
    public readonly color: string,
  ) {}
}
