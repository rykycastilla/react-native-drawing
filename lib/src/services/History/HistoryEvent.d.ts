import { IDraw } from '../WebDraw/IDraw'

export class HistoryEvent {

  public readonly target: Draw
  public readonly canUndo: boolean
  public readonly canRedo: boolean

  private constructor( target:Draw, canUndo:boolean, canRedo:boolean )

}

interface Draw extends IDraw {}
