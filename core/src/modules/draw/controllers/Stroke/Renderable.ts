import { SectionManager } from './SectionManager'

export abstract class Renderable<T extends object> {

  constructor(
    protected readonly sectionManager: SectionManager<T>,
    protected readonly context: CanvasRenderingContext2D,
  ) {}

  protected abstract renderSection( path:Path2D, props:T ): void
  protected abstract clearRenderCache(): void

  public render() {
    for( const section of this.sectionManager.sectionList ) {
      const { path, props } = section
      this.renderSection( path, props )
    }
    this.sectionManager.resetSections()
  }

}
