import { Point } from '../Point'

export class PointChecker {

  private readonly checkList = new Set<string>()

  private toMember( point:Point ): string {
    const { x, y } = point
    return `${ x };${ y }`
  }

  public check( point:Point ) {
    const member: string = this.toMember( point )
    this.checkList.add( member )
  }

  public exists( point:Point ): boolean {
    const member: string = this.toMember( point )
    return this.checkList.has( member )
  }

}
