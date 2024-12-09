import { GenericProcess } from './GenericProcess'

export class ParentProcess<T extends object,U extends object> extends GenericProcess<T,U> {
  constructor() {
    super( self )
  }
}
