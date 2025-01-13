import { DrawingScene } from '@draw/models'
import { ColorableTool } from '../ColorableTool'
import { ResizableTool } from '../ResizableTool'
import { Tool } from './Tool'

export class Spry extends Tool implements ColorableTool, ResizableTool {

  #color: string
  #size: number
  #particlesAmount: number
  #particlesScale: number

  constructor( color:string, size:number, particlesAmount:number, particlesScale:number ) {
    super()
    this.#color = color
    this.#size = size
    this.#particlesAmount = particlesAmount
    this.#particlesScale = particlesScale
  }

  private calcParticleSize( width:number, height:number ): number {
    const referenceSide: number = Math.min( width, height )
    return Math.round( referenceSide / 200 * this.particlesScale )
  }

  private genNumInRange( base:number, top:number ): number {
    const range: number = top - base
    return base + Math.random() * range
  }

  private getRandomPixelAround( center:Pixel ): Pixel {
    const minX: number = center.x - this.size,
      maxX = center.x + this.size
    const minY: number = center.y - this.size,
      maxY = center.y + this.size
    const x: number = this.genNumInRange( minX, maxX ),
      y = this.genNumInRange( minY, maxY )
    return { x, y }
  }

  override addStrokePoint( x:number, y:number, strokeId:symbol, scene:DrawingScene ) {
    strokeId
    const { width, height } = scene
    const particleSize: number = this.calcParticleSize( width, height )
    const center: Pixel = { x, y }
    for( let i = 0; i < this.particlesAmount; i++ ) {
      const particle: Pixel = this.getRandomPixelAround( center )
      scene.createDot( particle.x, particle.y, particleSize, this.color, true )
    }
  }

  get color(): string {
    return this.#color
  }

  public setColor( color:string ) {
    this.#color = color
  }

  get size(): number {
    return this.#size
  }

  public setSize( size:number ) {
    this.#size = size
  }

  get particlesAmount(): number {
    return this.#particlesAmount
  }

  public setParticlesAmount( particlesAmount:number ) {
    this.#particlesAmount = particlesAmount
  }

  get particlesScale(): number {
    return this.#particlesScale
  }

  public setParticlesScale( particlesScale:number ) {
    this.#particlesScale = particlesScale
  }

}

interface Pixel {
  x: number
  y: number
}
