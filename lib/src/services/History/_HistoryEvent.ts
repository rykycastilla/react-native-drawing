import { Draw } from '../../types/Draw'

export class HistoryEvent {
  constructor(
    public readonly target: Draw,
    public readonly canUndo: boolean,
    public readonly canRedo: boolean,
  ) {}
}
