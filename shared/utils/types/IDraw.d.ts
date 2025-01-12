export interface IDraw {
  getImage(): Promise<string>
  setImage( image:string ): Promise<void>
}
