declare module 'expo-2d-context' {

  import Expo2DContextDefault from '../../node_modules/expo-2d-context'
  import { ExpoWebGLRenderingContext } from 'expo-gl'

  type Expo2DContext = Expo2DContextDefault

  interface Expo2DContextConstructor {
    new ( gl:ExpoWebGLRenderingContext ): Expo2DContext
  }

  const Expo2DContext = Expo2DContextDefault as unknown as Expo2DContextConstructor

  export default Expo2DContext

}
