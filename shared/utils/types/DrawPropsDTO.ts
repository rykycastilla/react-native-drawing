export interface DrawPropsDTO<T> {
  resolution: number
  color: string
  grid: number | undefined
  tool: T
  toolSize: number | undefined
}
