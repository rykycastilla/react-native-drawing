import { Eraser, Pencil, Tool as ITool } from '../models'
import { Tool } from './Tool'

export class ToolIndex {

  private readonly index = new Map<Tool,ITool>()

  constructor(
    public readonly PENCIL: Pencil,
    public readonly ERASER: Eraser,
  ) {
    const toolKeyList: Tool[] = [ Tool.PENCIL, Tool.ERASER ]
    const toolList: ITool[] = [ PENCIL, ERASER ]
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
