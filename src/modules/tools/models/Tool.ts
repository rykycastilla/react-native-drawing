import { Matrix } from '../../draw/models'

export interface Tool<T extends string> {
  use( column:number, row:number, matrix:Matrix<T> ): void
  clone(): Tool<T>
}
