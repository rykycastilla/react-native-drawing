/**
 * Usefull tool to incorporate tasks related to the 'snapshot'
*/
export interface SnapShotUtil {

  colorChanels: number
  imageWidth: number
  imageHeight: number

  /**
   * Gets the reference size of an image with this properties (MB)
  */
  referenceSize: number

  /**
   * Compacts a base64 image to an Object URL to increase memory eficiency
   * @returns - reference url of the base
  */
  compactURL( base64:string ): Promise<string>

}
