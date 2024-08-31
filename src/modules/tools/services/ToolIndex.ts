import { Eraser, Pencil, Tool as ITool } from '../models'
import { Tool } from './Tool'

export class ToolIndex<T extends string> {

  private readonly index = new Map<Tool,ITool<T>>()

  constructor(
    public readonly PENCIL: Pencil<T>,
    public readonly ERASER: Eraser<T>,
  ) {
    const toolKeyList: Tool[] = [ Tool.PENCIL, Tool.ERASER ]
    const toolList: ITool<T>[] = [ PENCIL, ERASER ]
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
