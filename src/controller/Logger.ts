export abstract class Logger {
  constructor(
    protected readonly verbose: Verbose,
  ) {}
}

export interface Verbose {
  log( message:string ): void
}
