export interface GridDisplay {
  readonly RESOLUTION: number
  frame( width:number, height:number, x:number, y:number, bold:number, color:string ): void
  clear(): void
}
