export interface SnapShotProvider {

  colorChanels: number
  imageWidth: number
  imageHeight: number

  /**
   * Gets the reference size of an image with this properties
  */
  referenceSize: number

  /**
   * Compacts a base64 to a OBject URL to increase storage eficiency
   * @returns - reference url of the base
   * (if the properties expected by the provider are the same of the image and it is valid)
  */
  compactURL( base64:string ): string | null
}
