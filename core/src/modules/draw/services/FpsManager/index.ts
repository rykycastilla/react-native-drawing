import { FrameRateTracker } from './FrameRateTracker'

/**
 * Allow you to notify the fps's of the system periodically
 */
export class FpsManager {

  /** Milliseconds in a second */
  private static SECOND = 1000

  /** Executed when a report is ready */
  public onreport: FrameReportFunction | null = null

  private previousMoment: number
  private readonly frameRate = new FrameRateTracker()

  /**
   * @param REPORT_TOLERANCE  Tolerance of the system to wait for, before a new report creation
   * @param getMoment  Used to get the current time (in ms)
  */
  constructor(
    public readonly REPORT_TOLERANCE: number,
    private readonly getMoment: MommentGetter,
  ) { this.previousMoment = getMoment() }

  private calcRate(): number {
    const moment: number = this.getMoment()
    const rate: number = moment - this.previousMoment
    this.previousMoment = moment
    return rate
  }

  /**
   * Dispatchs a new report of fps
   * @fires ReportEvent
  */
  private dispatchReport( fps:number ) {
    // Filtering only valid values
    if( !isFinite( fps ) || isNaN( fps ) ) { return }
    // Executing
    if( this.onreport === null ) { return }
    this.onreport( fps )
  }

  /**
   * Indicates a new frame occurs.
   * Only should be used within Window#requestAnimationFrame or another environment that represents
   * a display frame rendering
  */
  public notifyFrame() {
    const rate: number = this.calcRate()
    this.frameRate.registFrame( rate )
    if( this.frameRate.lapse >= this.REPORT_TOLERANCE ) {
      // Sending avergae fps and reseting count, when the system exceeds the tolerance
      const fps: number = this.fps
      this.frameRate.reset()
      this.dispatchReport( fps )
    }
  }

  private get fps(): number {
    const { lapse, frames } = this.frameRate
    const framesPerMillisecond: number = frames / lapse
    const fps: number = framesPerMillisecond * FpsManager.SECOND
    return Math.round( fps )
  }

}

export interface FrameReportFunction {
  ( fps:number ): void
}

interface MommentGetter {
  (): number
}
