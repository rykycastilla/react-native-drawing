import { Point } from '../Point'
import { Tool } from '../../../tools/models'

export interface StrokePoint extends Point {
  tool: Tool
}
