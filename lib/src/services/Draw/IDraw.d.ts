import { IWebDraw } from '../../shared/utils/types/IWebDraw'
import { Tool } from '../../shared/modules/tools/models'

export interface IDraw extends IWebDraw {
  antialiasing: boolean
  width: number
  height: number
  tool: Tool
  toolColor: string
}
