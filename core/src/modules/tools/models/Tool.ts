import { Display } from '@draw/models'
import { Matrix } from '@draw/models'

export interface Tool {
  use( column:number, row:number, matrix:Matrix, display:Display ): void
  clone(): Tool
}
