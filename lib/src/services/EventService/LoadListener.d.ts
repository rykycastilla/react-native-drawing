export interface LoadListener {
  type: 'load'
  handle( event:object ): Promise<void> | void
}
