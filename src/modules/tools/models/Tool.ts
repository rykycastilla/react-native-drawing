import { Matrix } from '../../draw/models'

export interface Tool {
  use( column:number, row:number, matrix:Matrix ): void
  clone(): Tool
}
