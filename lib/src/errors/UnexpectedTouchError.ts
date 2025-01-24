export class UnexpectedTouchError extends Error {
  constructor() {
    super( 'Invalid touch action detected. A touch object cannot be executed after "up"' )
  }
}
