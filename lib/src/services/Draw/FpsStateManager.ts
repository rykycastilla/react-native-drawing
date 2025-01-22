export class FpsStateManager {

  private readonly fpsSetterList: FpsSetter[] = []

  /**
   * Suscribe new fps setter
  */
  public addSetter( setter:FpsSetter ) {
    this.fpsSetterList.push( setter )
  }

  /**
   * Unsuscribe fps setter
  */
  public removeSetter( setter:FpsSetter ) {
    const index: number = this.fpsSetterList.indexOf( setter )
    if( index === -1 ) { return }
    this.fpsSetterList.splice( index, 1 )
  }

  /**
   * Executing setters, updating all its states
  */
  public setFps( fps:number ) {
    for( const setFps of this.fpsSetterList ) {
      setFps( fps )
    }
  }

}

interface FpsSetter {
  ( fps:number ): void
}
