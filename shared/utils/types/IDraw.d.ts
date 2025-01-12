export interface IDraw {
  clear( color?:string ): Promise<void>
  getImage(): Promise<string>
  setImage( image:string ): Promise<void>
}
