import { Point } from './Point'
import { Tool } from '../tools'

export interface StrokePoint<T extends string> extends Point {
  tool: Tool<T>
}
