import { cloneDeep } from 'lodash'
import { CursorStyle } from '@shared/modules/cursor/models'
import { PropertyValueTransformer } from '@utils/PropertyValueTransformer'
import '../styles.css'

export class CSSCursorStyleManager {

  private static CUSTOM_PROP_PREFIX = '--custom-'
  #style!: CursorStyle

  constructor(
    style:CursorStyle,
    protected readonly element: HTMLElement,
    private readonly pixelsParser: PropertyValueTransformer,
  ) { this.setStyle( style ) }

  private genCustomStylePropName( name:string ): string {
    return CSSCursorStyleManager.CUSTOM_PROP_PREFIX + name
  }

  private assignStyle( name:string, value:unknown ) {
    name = this.genCustomStylePropName( name )
    const textValue: string = ( typeof value === 'string' ) ? value : String( value )
    this.element.style.setProperty( name, textValue )
  }

  private clearCustomStyleProps() {
    const styleList: string[] = Array.from( this.element.style )
    for( const styleProp of styleList ) {
      if( styleProp.startsWith( CSSCursorStyleManager.CUSTOM_PROP_PREFIX ) ) {
        this.element.style.removeProperty( styleProp )
      }
    }
  }

  private assignShadowStyles( indexedStyle:Record<string,unknown> ) {
    // Extracting shadow properties
    const { shadowOffset = {}, shadowBlur = 1, shadowRadius = 0, shadowColor = 'black' } = indexedStyle
    const { x = '0px', y = '0px' } = ( ( shadowOffset instanceof Object ) ? shadowOffset : {} ) as Record<string,unknown>
    // Setting shadow blur & radius
    const blur: number = ( typeof shadowBlur === 'number' ) ? shadowBlur : Number( shadowBlur )
    const radius: number = ( typeof shadowRadius === 'number' ) ? shadowRadius : Number( shadowRadius )
    // Creating radius spread effect using many shadows with incrementally blur
    let shadowFilter = ''
    for( let i = 0; i < radius; i++ ) {
      shadowFilter += `drop-shadow( ${ x } ${ y } ${ blur + i }px ${ shadowColor } ) `
    }
    if( shadowFilter === '' ) { return }
    this.assignStyle( 'shadowFilter', shadowFilter )
  }

  private assignBorderStyles( indexedStyle:Record<string,unknown> ) {
    const { borderStyle, borderWidth, borderColor } = indexedStyle
    // Creating style
    const styleList = new Set( [ 'solid', 'dashed', 'dotted', 'none' ] )
    if( styleList.has( borderStyle as string ) ) {
      this.assignStyle( 'borderStyle', borderStyle )
    }
    else if( borderStyle !== undefined ) {
      this.assignStyle( 'borderStyle', 'none' )
    }
    // Creating width
    if( borderWidth !== undefined ) {
      this.assignStyle( 'borderWidth', borderWidth )
    }
    // Creating color
    if( borderColor !== undefined ) {
      this.assignStyle( 'borderColor', borderColor )
    }
  }

  private assignStyles( style:CursorStyle ) {
    // Cleaning previous styles
    this.clearCustomStyleProps()
    // Creating object index struct
    const indexedStyle = cloneDeep( style ) as Record<string,unknown>
    // Parsing pixels values from `number` to `${ number }px`
    this.pixelsParser.parse( indexedStyle, ( pixelValue:unknown ) => {
      return ( typeof pixelValue === 'number' )
        ? `${ pixelValue }px`
        : pixelValue
    } )
    // Assigning especial styles
    const {
      shadowOffset, shadowRadius, shadowBlur, shadowColor, borderStyle, borderWidth, borderColor,
      ...restStyle
    } = indexedStyle
    this.assignShadowStyles( { shadowOffset, shadowRadius, shadowBlur, shadowColor } )
    this.assignBorderStyles( { borderStyle, borderWidth, borderColor } )
    // Assigning standard styles
    for( const styleProp in restStyle ) {
      const value: unknown = restStyle[ styleProp ]
      this.assignStyle( styleProp, value )
    }
  }

  get style(): CursorStyle {
    return this.#style
  }

  public setStyle( style:CursorStyle ) {
    this.#style = style
    this.assignStyles( style )
  }

}
