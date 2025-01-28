import DrawCanvas from '../DrawCanvas'
import { Component, ReactElement } from 'react'
import { DrawProps } from '../../types/DrawProps'
import { MessageSystem } from '../../shared/utils/MessageSystem'
import { WebBridgeLoader } from '../../services'
import { WebViewProps } from 'react-native-webview'

// @ts-expect-error - JSDoc Type
import { InvalidGridError } from '../../errors'  // eslint-disable-line

export abstract class Renderer extends Component<DrawProps> {

  /** Collection of information about webBridge adn loading */
  protected abstract loader: WebBridgeLoader

  /**
   * Indicates a scroll events occurs in DrawCanvas
  */
  protected abstract dispatchScrollEvent( event:NativeScrollEvent ): void

  /**
   * @throws { InvalidGridError }
   */
  override render(): ReactElement {
    return (
      <DrawCanvas
        dispatchScrollEvent={ ( event ) => this.dispatchScrollEvent( event ) }
        onWebBridge={ ( webBridge:MessageSystem ) => this.loader.loadWebBridge( webBridge ) }
        { ...this.props } />
    )
  }

}

type NativeScrollHandler = NonNullable<WebViewProps[ 'onScroll' ]>
export type NativeScrollEvent = Parameters<NativeScrollHandler>[ 0 ]
