import { ColorableTool, IColorableTool } from './ColorableTool'
import { Matrix, Pixel } from '@draw/models'
import { Queue } from '@utils/Queue'
import { Tool } from './Tool'

export class Filler implements Tool, IColorableTool {

  private static readonly COLUMN_DIRECTIONS: number[] = [ 0, 1, 0, -1 ]
  private static readonly ROW_DIRECTIONS: number[] = [ -1, 0, 1, 0 ]
  private readonly colorBoard: ColorableTool

  constructor( color:string ) {
    this.colorBoard = new ColorableTool( color )
  }

  public use( column:number, row:number, matrix:Matrix ) {
    const pixel: Pixel | undefined = matrix.find( column, row )
    if( pixel === undefined ) { return }
    if( pixel.color === this.color ) { return }
    const previousColor: string | null = pixel.color
    const pixelCells = new Queue<Cell>()
    const cellChecker = new CellChecker()
    pixelCells.push( { column, row } )
    while( !pixelCells.isEmpty() ) {
      const { column:currentColumn, row:currentRow } = pixelCells.pop()!
      const currentPixel: Pixel | undefined = matrix.find( currentColumn, currentRow )
      if( currentPixel === undefined ) { continue }
      if( currentPixel.color !== previousColor ) { continue }
      currentPixel.setColor( this.color )
      Filler.moveAround( currentColumn, currentRow, cellChecker, pixelCells )
    }
  }

  public clone(): Filler {
    return new Filler( this.color )
  }

  public setColor( color:string ) {
    this.colorBoard.setColor( color )
  }

  get color(): string {
    return this.colorBoard.color
  }

  private static moveAround( currentColumn:number, currentRow:number, cellChecker:CellChecker, pixelCells:Queue<Cell> ) {
    for( let i = 0; i < 4; i++ ) {
      const column: number = currentColumn + Filler.COLUMN_DIRECTIONS[ i ]!,
        row = currentRow + Filler.ROW_DIRECTIONS[ i ]!
      // if( ( 0 >= column ) || ( column > limit  ) ) { continue }
      // if( ( 0 >= row ) || ( row > limit  ) ) { continue }
      if( cellChecker.hasVisited( column, row ) ) { continue }
      cellChecker.visit( column, row )
      pixelCells.push( { column, row } )
    }
  }

}

export class CellChecker {

  private readonly pixelVisited: boolean[][] = []

  public visit( column:number, row:number ) {
    if( this.pixelVisited[ column ] === undefined ) { this.pixelVisited[ column ] = [] }
    this.pixelVisited[ column ]![ row ] = true
  }

  public hasVisited( column:number, row:number ): boolean {
    const visitedList: boolean[] | undefined = this.pixelVisited[ column ]
    if( visitedList === undefined ) { return false }
    return visitedList[ row ] ?? false
  }

}
interface Cell {
  column: number
  row: number
}
