export abstract class TouchEvent {
  constructor(
    public readonly targetId: symbol,
  ) {}
}
