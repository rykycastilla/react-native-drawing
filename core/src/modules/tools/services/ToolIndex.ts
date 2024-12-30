import { Eraser, Filler, None, Pencil, Tool as ITool } from '../models'
import { Tool } from './Tool'

export class ToolIndex {

  private readonly index = new Map<Tool,ITool>()

  constructor(
    public readonly NONE: None,
    public readonly PENCIL: Pencil,
    public readonly ERASER: Eraser,
    public readonly FILLER: Filler,
  ) {
    const toolKeyList: Tool[] = [ Tool.NONE, Tool.PENCIL, Tool.ERASER, Tool.FILLER ]
    const toolList: ITool[] = [ NONE, PENCIL, ERASER, FILLER ]
    this.buildIndex( toolKeyList, toolList )
  }

  private buildIndex( toolKeyList:Tool[], toolList:ITool[] ) {
    for( let i = 0; i < toolList.length; i++ ) {
      const toolKey: Tool = toolKeyList[ i ]!
      const tool: ITool = toolList[ i ]!
      this.index.set( toolKey, tool )
    }
  }

  public get( toolKey:Tool ): ITool {
    return this.index.get( toolKey )!
  }

}
