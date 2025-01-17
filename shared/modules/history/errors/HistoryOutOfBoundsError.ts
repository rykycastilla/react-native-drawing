export class HistoryOutOfBoundsError extends Error {
  constructor() {
    super( 'History cannot go in this direction on the timeline' )
  }
}
