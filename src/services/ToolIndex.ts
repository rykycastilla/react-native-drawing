import { Pencil, Tool as ITool } from '../model/tools'
import { Tool } from './Tool'

export class ToolIndex<T extends string> {

  private readonly index = new Map<Tool,ITool<T>>()

  constructor(
    public readonly PENCIL: Pencil<T>,
  ) {
    const toolKeyList: Tool[] = [ Tool.PENCIL ]
    const toolList: ITool<T>[] = [ PENCIL ]
    this.buildIndex( toolKeyList, toolList )
  }

  private buildIndex( toolKeyList:Tool[], toolList:ITool<T>[] ) {
    for( let i = 0; i < toolList.length; i++ ) {
      const toolKey: Tool = toolKeyList[ i ]!
      const tool: ITool<T> = toolList[ i ]!
      this.index.set( toolKey, tool )
    }
  }

  public get( toolKey:Tool ): ITool<T> {
    return this.index.get( toolKey )!
  }

}
