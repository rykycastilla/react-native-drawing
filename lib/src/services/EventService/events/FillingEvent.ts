import { Draw } from '../Draw'

export class FillingEvent {

  public readonly isEnding: boolean

  constructor(
    public readonly target: Draw,
    public readonly isStarting: boolean,
    public readonly x: number,
    public readonly y: number,
    public readonly color: string,
  ) { this.isEnding = !isStarting }

}
