export interface IWebDraw {
  clear( color?:string ): Promise<void>
  getImage(): Promise<string>
  setImage( image:string ): Promise<void>
}
