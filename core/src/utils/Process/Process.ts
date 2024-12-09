import { GenericProcess } from './GenericProcess'

export class Process<T extends object,U extends object> extends GenericProcess<T,U> {
  constructor( worker:Worker ) {
    super( worker )
  }
}
