import { Point } from '../../models'
import { Section } from './Section'

export class SectionManager<T extends object> {

  #latestPoint: Point
  #sectionList: Section<T>[]

  constructor( initPoint:Point, initProps:T ) {
    this.#latestPoint = initPoint
    const firstSection = new Section<T>( initPoint, initProps )
    this.#sectionList = [ firstSection ]
  }

  public createSection( props:T ) {
    const section = new Section<T>( this.#latestPoint, { ...props } )
    this.#sectionList.push( section )
  }

  public joinPoint( point:Point ) {
    const { currentPath } = this
    this.#latestPoint = point
    currentPath.lineTo( point.x, point.y )
  }

  public resetSections() {
    const currentSection: Section<T> = this.#sectionList[ this.#sectionList.length - 1 ]!
    this.#sectionList = []
    this.#sectionList.push( currentSection )
  }

  get currentPath(): Path2D {
    const section: Section<T> = this.#sectionList[ this.#sectionList.length - 1 ]!
    return section.path
  }

  get currentProps(): T {
    const section: Section<T> = this.#sectionList[ this.#sectionList.length - 1 ]!
    return section.props
  }

  get latestPoint(): Point {
    return this.#latestPoint
  }

  get sectionList(): readonly Section<T>[] {
    return this.#sectionList
  }

}
