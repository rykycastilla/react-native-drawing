import { IDraw as Draw } from './IDraw'

export class HistoryEvent {
  constructor(
    public readonly target: Draw,
    public readonly canUndo: boolean,
    public readonly canRedo: boolean,
  ) {}
}
