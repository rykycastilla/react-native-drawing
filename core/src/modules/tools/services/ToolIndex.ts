import { DotPen, Eraser, Filler, None, Pencil, SquareDotPen, Tool as ITool } from '../models'
import { Tool } from './Tool'

export class ToolIndex {

  private readonly index = new Map<Tool,ITool>()

  constructor(
    public readonly NONE: None,
    public readonly SQUARE_DOT_PEN: SquareDotPen,
    public readonly DOT_PEN: DotPen,
    public readonly PENCIL: Pencil,
    public readonly ERASER: Eraser,
    public readonly FILLER: Filler,
  ) {
    const toolKeyList: Tool[] = [ Tool.NONE, Tool.SQUARE_DOT_PEN, Tool.DOT_PEN, Tool.PENCIL, Tool.ERASER, Tool.FILLER ]
    const toolList: ITool[] = [ NONE, SQUARE_DOT_PEN, DOT_PEN, PENCIL, ERASER, FILLER ]
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
