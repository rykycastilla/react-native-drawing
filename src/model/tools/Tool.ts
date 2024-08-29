import { Matrix } from '../Matrix'

export interface Tool<T extends string> {
  use( column:number, row:number, matrix:Matrix<T> ): void
  clone(): Tool<T>
}
