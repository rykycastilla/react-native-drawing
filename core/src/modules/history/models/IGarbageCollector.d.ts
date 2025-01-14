export interface IGarbageCollector {
  collect(): void
  totalMemory: number
  maxLength: number
}
