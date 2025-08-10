import { DrawingService } from '../services'
import { IDrawCore } from '@shared/utils/types/IDrawCore'
import { ITool } from '@tools/models'
import { SymbolParser } from '@shared/utils/SymbolParser'

// @ts-expect-error - JSDoc Type
import { HistoryOutOfBoundsError } from '@shared/modules/history/errors'  // eslint-disable-line

export class CoreController implements IDrawCore {

  private readonly symbolParser = new SymbolParser()
  private tool: ITool | null = null
  public onhistorymove: ( ( canUndo:boolean, canRedo:boolean ) => void ) | null = null
  public onfilling: ( ( isStarting:boolean, x:number, y:number, color:string ) => Promise<void> | void ) | null = null
  public onframereport: ( ( fps:number ) => void ) | null = null

  constructor(
    private readonly drawingServiceRef: DrawingServiceRef,
  ) {
    this.setHistoryMoveListener()
    this.setFillerListener()
    this.setFrameReportListener()
  }

  public async clear( color?:string ) {
    await this.drawingService.clear( color )
  }

  public async getImage(): Promise<string> {
    return this.drawingService.image
  }

  public async setImage( image:string ) {
    await this.drawingService.setImage( image )
  }

  private setHistoryMoveListener() {
    DrawingService.onhistorymove = ( target:DrawingService, canUndo:boolean, canRedo:boolean ) => {
      if( target !== this.drawingService ) { return }
      if( this.onhistorymove === null ) { return }
      this.onhistorymove( canUndo, canRedo )
    }
  }

  private setFillerListener() {
    DrawingService.onfilling = async( target:DrawingService, isStarting:boolean, x:number, y:number, color:string ) => {
      if( target !== this.drawingService ) { return }
      if( this.onfilling === null ) { return }
      await this.onfilling( isStarting, x, y, color )
    }
  }

  private setFrameReportListener() {
    DrawingService.onframereport = ( target:DrawingService, fps:number ) => {
      if( target !== this.drawingService ) { return }
      if( this.onframereport === null ) { return }
      this.onframereport( fps )
    }
  }

  /**
   * @throws { HistoryOutOfBoundsError }
  */
  public async undo() {
    await this.drawingService.undo()
  }

  /**
   * @throws { HistoryOutOfBoundsError }
  */
  public async redo() {
    await this.drawingService.redo()
  }

  public touch( type:TouchType, x:number, y:number, parsedId:number ) {
    if( this.tool === null ) { return }
    const id: symbol = this.symbolParser.toSymbol( parsedId )
    if( ( type === 'start' ) || ( type === 'move' ) ) {
      this.drawingService.use( x, y, id, this.tool )
    }
    else if( type === 'end' ) {
      this.drawingService.stopStroke( x, y, id, this.tool )
    }
  }

  private get drawingService(): DrawingService {
    return this.drawingServiceRef.current
  }

  public setTool( tool:ITool ) {
    this.tool = tool
  }

  public async resetHistory() {
    await this.drawingService.resetHistory()
  }

}

interface DrawingServiceRef {
  current: DrawingService
}

type TouchType = 'start' | 'move' | 'end'
