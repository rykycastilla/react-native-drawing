export class DrawTouchEvent {
  constructor(
    public readonly targetId: symbol,
    public readonly x: number,
    public readonly y: number,
  ) {}
}
