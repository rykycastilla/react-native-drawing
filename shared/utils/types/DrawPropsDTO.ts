export interface DrawPropsDTO<T> {
  resolution: number
  color: string
  grid: number | undefined
  antialiasing: boolean | undefined
  tool: T
  toolSize: number | undefined
}
