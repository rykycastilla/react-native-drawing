export interface Display {
  printPixel( x:number, y:number, size:number, color:string ): void
  clearPixel( x:number, y:number, size:number ): void
}
