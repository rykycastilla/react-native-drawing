import { Draw } from '../Draw'

export class FillingEvent {

  public readonly target: Draw
  public readonly isStarting: boolean
  public readonly isEnding: boolean
  public readonly x: number
  public readonly y: number
  public readonly color: string

  private constructor( target:Draw, isStarting:boolean, x:number, y:number, color:string )

}
