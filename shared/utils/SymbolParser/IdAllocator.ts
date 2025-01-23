/**
 * Manages availability of odentificators
*/
export class IdAllocator {

  private maxLinealAssigned = Number.MIN_SAFE_INTEGER

  constructor(
    private readonly checkAvailability: CheckAvailabilityFn,
  ) {}

  public getFree(): number {
    let id: number | undefined
    while( id === undefined ) {
      const idCandidate: number = ++this.maxLinealAssigned
      const isAvailable: boolean = this.checkAvailability( idCandidate )
      if( isAvailable ) { id = idCandidate }
    }
    return id
  }

}

interface CheckAvailabilityFn {
  ( id:number ): boolean
}
