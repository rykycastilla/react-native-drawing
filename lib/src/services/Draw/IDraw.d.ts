import { DrawHistory } from './DrawHistory'
import { IWebDraw } from '../../shared/utils/types/IWebDraw'
import { Tool } from '../../shared/modules/tools/models'

export interface IDraw extends IWebDraw, DrawHistory {
  antialiasing: boolean
  width: number
  height: number
  tool: Tool
  toolColor: string
}
